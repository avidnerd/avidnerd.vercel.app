#!/usr/bin/env node
/*
  Encrypts a draft post so the published site never carries its text.

  Usage:  npm run seal drafts/2026-09-16-hello.md

  The draft keeps its normal frontmatter plus a `question:` line. Title, date,
  question and any `collection:`/`session:` stay in the clear — they are what
  the blog index shows next to the lock, and what lets a sealed post keep its
  place in a series — and everything below the frontmatter is encrypted with a
  key derived from the answer. The result lands in src/posts/<name>.md.enc, which is
  the only version that ships.

  Crypto: PBKDF2-SHA256 (250k iterations, random 16-byte salt) to turn the
  answer into a key, then AES-256-GCM with a random 12-byte IV. GCM is
  authenticated, so a wrong answer fails cleanly instead of producing garbage
  that looks like it might be text. The browser half of this lives in
  src/data/unlock.js and must keep the same parameters.

  The security here rests entirely on the answer being hard to guess. "what
  instrument do i play" is a question whose answer is on your own homepage;
  someone who wants in can try a few hundred guesses offline. Pick something
  only the intended reader knows.
*/
import { webcrypto as crypto } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import path from "node:path";

const ITERATIONS = 250_000;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    const value = line
      .slice(at + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    if (key) meta[key] = value;
  }

  return { meta, body: raw.slice(match[0].length) };
}

/*
  Answers are compared after lowercasing and collapsing whitespace, so "Oboe "
  and "oboe" both work. A reader who has the right answer should not be locked
  out by capitalisation.
*/
export function normalise(answer) {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

async function deriveKey(answer, salt) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(normalise(answer)),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );
}

const b64 = (buffer) => Buffer.from(buffer).toString("base64");

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("usage: npm run seal <path to draft .md>");
    process.exit(1);
  }

  const raw = await readFile(input, "utf8");
  const { meta, body } = parseFrontmatter(raw);

  if (!meta.title || !meta.date) {
    console.error(`${input}: needs at least "title:" and "date:" in its frontmatter`);
    process.exit(1);
  }

  /*
    Two ways in. Typing at a terminal is the normal one; the environment
    variables exist so this can be scripted and tested, because readline
    silently gives up when stdin is a pipe rather than a keyboard.

    If neither is available we stop and say so. Exiting quietly would look
    exactly like success and leave a post that was never sealed.
  */
  let question = meta.question || process.env.SEAL_QUESTION;
  let answer = process.env.SEAL_ANSWER;

  if (!answer) {
    if (!process.stdin.isTTY) {
      console.error(
        "no answer to seal with, and nothing to prompt.\n" +
          "run it in a terminal, or pass one:\n" +
          "  SEAL_ANSWER='your answer' npm run seal <draft>",
      );
      process.exit(1);
    }

    const rl = createInterface({ input: process.stdin, output: process.stdout });
    if (!question) {
      question = (await rl.question("question readers will be asked: ")).trim();
    }
    answer = await rl.question("answer that unlocks it: ");
    const confirm = await rl.question("type it once more: ");
    rl.close();

    if (normalise(answer) !== normalise(confirm)) {
      console.error("the two answers do not match — nothing sealed");
      process.exit(1);
    }
  }

  if (!answer.trim()) {
    console.error("empty answer — nothing sealed");
    process.exit(1);
  }

  if (!question) {
    console.error(
      `${input}: needs a "question:" line in its frontmatter (or SEAL_QUESTION=)`,
    );
    process.exit(1);
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(answer, salt);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(body),
  );

  // The slug mirrors the rule in src/data/posts.js: drop a leading date.
  const name = path.basename(input).replace(/\.md$/, "");
  const out = path.join("src", "posts", `${name}.md.enc`);

  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(
    out,
    `${JSON.stringify(
      {
        v: 1,
        title: meta.title,
        date: meta.date,
        // Carried through so a locked post still sorts into its collection.
        // Undefined keys drop out of the JSON, so a standalone post is
        // unaffected.
        collection: meta.collection,
        session: meta.session,
        question,
        iterations: ITERATIONS,
        salt: b64(salt),
        iv: b64(iv),
        ciphertext: b64(ciphertext),
      },
      null,
      2,
    )}\n`,
  );

  console.log(`sealed  ${input}\n     -> ${out}`);
  console.log("\nthe draft itself stays out of git; only the sealed file ships.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

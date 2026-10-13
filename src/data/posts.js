import { marked } from "marked";
import { collections as registry } from "./collections";

/*
  Posts are files in src/posts, read at build time rather than fetched.

  Two kinds live there. A plain .md is an open post: Vite inlines it and the
  Markdown is rendered here. A .md.enc is a sealed post, produced by
  tools/seal.mjs — its title, date and unlock question are in the clear so the
  index can list it, and its body is ciphertext that only the reader's answer
  can open. Nothing in the bundle can turn a sealed post back into text.

  The filename carries the date for sorting on disk (2026-09-16-hello.md), and
  everything after that date becomes the URL slug.

  A post may also name a collection it belongs to (see src/data/collections.js),
  in which case it is listed on that collection's page instead of standing alone
  on the blog index.
*/
const open = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const sealed = import.meta.glob("../posts/*.md.enc", {
  query: "?raw",
  import: "default",
  eager: true,
});

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/*
  A deliberately small frontmatter reader: `key: value` pairs, one per line,
  with optional surrounding quotes. The alternative is gray-matter, which pulls
  in a YAML engine and a Buffer polyfill to parse the four fields we actually
  use. If a post ever needs lists or nesting in its header, swap this out.
*/
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

/* Words per minute, rounded, floored at one. Nobody wants a "0 min read". */
function readingTime(body) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/*
  Dates are parsed as UTC (the `Date` constructor treats a bare YYYY-MM-DD that
  way) so they must be formatted as UTC too. Formatting in the visitor's local
  zone would show the previous day to anyone west of Greenwich.
*/
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value ?? "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Strips a leading YYYY-MM-DD- if present, so files sort by date on disk while
// the URL stays clean.
function slugFor(filePath, extension) {
  const file = filePath.split("/").pop().replace(extension, "");
  return file.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

/*
  `session: 3` numbers a post within its collection. It is optional — a series
  with no natural ordering can leave it out and fall back to date order — so an
  unparseable value becomes null rather than NaN, which would poison the sort.
*/
function sessionNumber(value) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

const openPosts = Object.entries(open).map(([filePath, raw]) => {
  const { meta, body } = parseFrontmatter(raw);

  return {
    slug: slugFor(filePath, /\.md$/),
    title: meta.title || slugFor(filePath, /\.md$/),
    summary: meta.summary || "",
    date: meta.date || "",
    dateLabel: formatDate(meta.date),
    readingTime: readingTime(body),
    collection: meta.collection || null,
    session: sessionNumber(meta.session),
    locked: false,
    html: marked.parse(body),
  };
});

/*
  A sealed post carries no summary and no reading time: both would leak
  something about a post whose whole point is that it is shut. Its collection
  and session number do travel in the clear, so a locked class can still take
  its place in the series with everything but its text withheld.
*/
const sealedPosts = Object.entries(sealed).map(([filePath, raw]) => {
  const data = JSON.parse(raw);

  return {
    slug: slugFor(filePath, /\.md\.enc$/),
    title: data.title,
    summary: "",
    date: data.date || "",
    dateLabel: formatDate(data.date),
    collection: data.collection || null,
    session: sessionNumber(data.session),
    locked: true,
    question: data.question,
    iterations: data.iterations,
    salt: data.salt,
    iv: data.iv,
    ciphertext: data.ciphertext,
  };
});

export const posts = [...openPosts, ...sealedPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function findPost(slug) {
  return posts.find((post) => post.slug === slug);
}

/* ------------------------------------------------------------- collections */

/*
  Each registered collection, given the posts that named it. Series read
  forward — class 01 first — which is the opposite of the blog index, because a
  running log is something you start at the beginning of.

  Posts are ordered by session number when they have one, and by date when they
  do not; a numbered post always sorts ahead of an unnumbered one rather than
  interleaving unpredictably with it.
*/
const grouped = new Map(
  registry.map((collection) => [collection.slug, { ...collection, posts: [] }]),
);

for (const post of posts) {
  if (!post.collection) continue;

  const collection = grouped.get(post.collection);
  if (!collection) {
    // A typo in frontmatter would otherwise drop the post off the site
    // silently: it is not standalone, and it is in no collection that exists.
    if (import.meta.env.DEV) {
      console.warn(
        `post "${post.slug}" names collection "${post.collection}", which is not in src/data/collections.js`,
      );
    }
    continue;
  }

  collection.posts.push(post);
}

for (const collection of grouped.values()) {
  collection.posts.sort((a, b) => {
    if (a.session !== null && b.session !== null) return a.session - b.session;
    if (a.session !== null) return -1;
    if (b.session !== null) return 1;
    return a.date.localeCompare(b.date);
  });
}

export const collections = [...grouped.values()];

export function findCollection(slug) {
  return collections.find((collection) => collection.slug === slug);
}

/* The post before and after this one inside its collection, for its footer. */
export function neighbours(post) {
  const collection = post.collection ? findCollection(post.collection) : null;
  if (!collection) return { collection: null, previous: null, next: null };

  const at = collection.posts.findIndex((entry) => entry.slug === post.slug);
  return {
    collection,
    previous: at > 0 ? collection.posts[at - 1] : null,
    next: at > -1 && at < collection.posts.length - 1 ? collection.posts[at + 1] : null,
  };
}

/*
  What the blog index lists: standalone posts, plus each non-empty collection as
  a single row, newest first. A collection is dated by its most recent post, so
  an active series climbs back to the top each time it gains an entry.

  An empty collection is left out entirely — a link promising writing that does
  not exist yet is worse than no link.
*/
export const timeline = [
  ...posts
    .filter((post) => !post.collection)
    .map((post) => ({ kind: "post", date: post.date, post })),
  ...collections
    .filter((collection) => collection.posts.length > 0)
    .map((collection) => ({
      kind: "collection",
      date: collection.posts.reduce(
        (latest, post) => (post.date > latest ? post.date : latest),
        "",
      ),
      collection,
    })),
].sort((a, b) => b.date.localeCompare(a.date));

/*
  Collections and posts share the /blog/<name> namespace, and an explicit
  collection route wins over the post route — so a post whose slug matches a
  collection would become unreachable. Caught here rather than by wondering why
  a link goes to the wrong page.
*/
if (import.meta.env.DEV) {
  for (const collection of collections) {
    if (findPost(collection.slug)) {
      console.warn(
        `post slug "${collection.slug}" collides with a collection of the same name — the post is unreachable at /blog/${collection.slug}`,
      );
    }
  }
}

/* Shared with the unlock screen, so a decrypted post renders like any other. */
export function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

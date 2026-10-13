/*
  Browser half of tools/seal.mjs. The parameters here — PBKDF2-SHA256 at the
  iteration count stored in the file, then AES-256-GCM — must match what sealed
  the post, or nothing will ever open.

  Decryption happens in the reader's browser. The answer is never sent anywhere,
  because there is nowhere to send it: this is a static site with no server.
*/

const decode = (b64) =>
  Uint8Array.from(atob(b64), (character) => character.charCodeAt(0));

/* Must stay identical to `normalise` in tools/seal.mjs. */
function normalise(answer) {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

async function deriveKey(answer, salt, iterations) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(normalise(answer)),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

/**
 * Returns the post's Markdown, or null if the answer was wrong.
 *
 * AES-GCM is authenticated, so a wrong key throws rather than returning
 * plausible-looking nonsense — there is no need to sanity-check the result.
 */
export async function unlockPost(post, answer) {
  try {
    const key = await deriveKey(answer, decode(post.salt), post.iterations);
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: decode(post.iv) },
      key,
      decode(post.ciphertext),
    );
    return new TextDecoder().decode(plaintext);
  } catch {
    return null;
  }
}

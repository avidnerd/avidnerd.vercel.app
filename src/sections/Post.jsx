import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findPost, neighbours, renderMarkdown } from "../data/posts";
import { unlockPost } from "../data/unlock";
import { usePageTitle } from "../components/usePageTitle";

/*
  The gate on a sealed post.

  There is no "correct password" stored anywhere to compare against: the answer
  is the decryption key, so a wrong one simply fails to open the ciphertext.
  That is the whole point — the text is not hidden on the page, it is not on the
  page at all until the answer produces it.
*/
function Locked({ post, onOpen }) {
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState(false);
  const [working, setWorking] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!answer.trim() || working) return;

    // Key derivation is deliberately slow (250k PBKDF2 rounds), which is what
    // makes guessing expensive. It takes a beat on a phone, so the button says
    // so rather than appearing dead.
    setWorking(true);
    setWrong(false);

    const markdown = await unlockPost(post, answer);

    setWorking(false);
    if (markdown === null) {
      setWrong(true);
      return;
    }
    onOpen(markdown);
  }

  return (
    <div className="mt-10 border border-ink/15 bg-paper-2 p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        locked post
      </p>

      <p className="mt-5 font-display text-[clamp(1.2rem,2.6vw,1.6rem)] leading-snug text-ink">
        {post.question}
      </p>

      <form onSubmit={submit} className="mt-6">
        <label htmlFor="answer" className="sr-only">
          {post.question}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
            aria-invalid={wrong}
            aria-describedby={wrong ? "answer-error" : undefined}
            className="min-w-0 flex-1 border border-ink/20 bg-paper px-3 py-2 font-mono text-sm text-ink outline-none transition-colors placeholder:text-ink-3/70 focus:border-accent"
            placeholder="your answer"
          />
          <button
            type="submit"
            disabled={working || !answer.trim()}
            className="border border-ink/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-2 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {working ? "opening…" : "unlock"}
          </button>
        </div>

        {/* Announced to screen readers the moment it appears, not just shown. */}
        <p
          id="answer-error"
          role="status"
          aria-live="polite"
          className={`mt-3 font-mono text-[11px] ${wrong ? "text-accent" : "sr-only"}`}
        >
          {wrong ? "that isn't it. try again?" : ""}
        </p>
      </form>

      <p className="mt-6 font-mono text-[10px] leading-relaxed text-ink-3">
        this post is encrypted. the answer is the key — it never leaves your
        browser, and there is no copy of the text here to read without it.
      </p>
    </div>
  );
}

/*
  A single post.

  Body HTML goes in with dangerouslySetInnerHTML. For an open post that is safe
  because the source is a file in this repository; for a sealed one it is the
  Markdown that just came out of the reader's own decryption, which likewise
  originated here. If posts ever arrive from outside the repo, this needs a
  sanitiser in front of it.

  Measure is capped near 46rem. The rest of the site is mono at small sizes
  where long lines are survivable; a full article is not.
*/
export default function Post() {
  const { slug } = useParams();
  const post = findPost(slug);
  const [opened, setOpened] = useState(null);

  usePageTitle(post ? `${post.title} — Subhi Stephan` : "Not found — Subhi Stephan");

  if (!post) {
    return (
      <div className="grain relative min-h-[70vh] bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            404
          </p>
          <h1 className="mt-6 font-display text-[clamp(1.8rem,5vw,3rem)] leading-tight text-ink">
            No post at that address.
          </h1>
          <Link
            to="/blog"
            className="mt-8 inline-block border border-ink/25 px-4 py-2 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            ← all posts
          </Link>
        </div>
      </div>
    );
  }

  const html = post.locked ? opened && renderMarkdown(opened) : post.html;
  const { collection, previous, next } = neighbours(post);

  return (
    <div className="grain relative bg-paper">
      <article className="mx-auto max-w-[46rem] px-6 pb-24 pt-32 sm:px-10 sm:pb-32 sm:pt-40">
        {/* A post inside a series goes back to the series, not to the whole
            blog — that is the list it was read from. */}
        <Link
          to={collection ? `/blog/${collection.slug}` : "/blog"}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-accent"
        >
          ← {collection ? collection.label : "blog"}
        </Link>

        <header className="mt-8 border-b border-ink/10 pb-8">
          <h1 className="font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] text-ink">
            {post.title}
          </h1>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            {collection && post.session !== null && (
              <>
                <span className="text-accent tabular-nums">
                  {collection.label} {String(post.session).padStart(2, "0")}
                </span>
                <span className="px-2 text-ink/25">/</span>
              </>
            )}
            <span className="text-accent">{post.dateLabel}</span>
            {!post.locked && (
              <>
                <span className="px-2 text-ink/25">/</span>
                {post.readingTime} min read
              </>
            )}
          </p>
        </header>

        {html ? (
          <div className="post-body mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <Locked post={post} onOpen={setOpened} />
        )}

        {/*
          Series navigation, and only for a series: a standalone post has no
          next. Hidden while a locked post is still shut, because the footer of
          something you cannot read yet is noise.
        */}
        {collection && html && (previous || next) && (
          <nav className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:justify-between">
            {previous ? (
              <Link
                to={`/blog/${previous.slug}`}
                className="group max-w-[20rem] font-mono text-xs text-ink-2 transition-colors hover:text-accent"
              >
                <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  <span className="inline-block transition-transform group-hover:-translate-x-1">
                    ←
                  </span>{" "}
                  previous
                </span>
                <span className="mt-1.5 block leading-snug">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                to={`/blog/${next.slug}`}
                className="group max-w-[20rem] font-mono text-xs text-ink-2 transition-colors hover:text-accent sm:text-right"
              >
                <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  next{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="mt-1.5 block leading-snug">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}

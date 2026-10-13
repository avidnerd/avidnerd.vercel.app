import { Link } from "react-router-dom";
import { findCollection } from "../data/posts";
import { Reveal, SectionHead } from "../components/ui";
import { usePageTitle } from "../components/usePageTitle";

/*
  A collection's own page: one running series, read forward.

  The list is numbered rather than dated-first like the blog index. In a series
  the position is what orients you — "this is the third class" — and the date is
  secondary, so the two swap places.
*/
export default function Collection({ slug }) {
  const collection = findCollection(slug);

  usePageTitle(
    collection
      ? `${collection.title} — Subhi Stephan`
      : "Not found — Subhi Stephan",
  );

  // Only reachable if the registry and the routes disagree, but a blank page is
  // a worse answer than saying so.
  if (!collection) {
    return (
      <div className="grain relative min-h-[70vh] bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            404
          </p>
          <h1 className="mt-6 font-display text-[clamp(1.8rem,5vw,3rem)] leading-tight text-ink">
            No collection at that address.
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

  const { posts } = collection;

  return (
    <div className="grain relative min-h-[70vh] bg-paper">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pb-28 sm:pt-40">
        <Reveal>
          <Link
            to="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-accent"
          >
            ← blog
          </Link>
        </Reveal>

        <div className="mt-8">
          <SectionHead index="04" label={collection.label} />
        </div>

        <Reveal>
          <h1 className="mt-8 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] text-ink">
            {collection.title}
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-ink-2">
            {collection.intro}
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal>
            <p className="mt-16 font-mono text-sm text-ink-3">
              Nothing here yet.
            </p>
          </Reveal>
        ) : (
          <ul className="mt-14 border-t border-ink/10">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 80}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block border-b border-ink/10 py-8 transition-colors hover:bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-10"
                >
                  <div className="flex gap-5 sm:gap-8">
                    {/* Falls back to position when a post has no session
                        number, so the column is never ragged. */}
                    <span className="font-mono text-sm tabular-nums text-accent sm:text-base">
                      {String(post.session ?? i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-tight text-ink transition-colors group-hover:text-accent">
                        {/* The lock is decorative; the word "locked" below
                            carries the same meaning for a screen reader. */}
                        {post.locked && <span aria-hidden="true">🔒 </span>}
                        {post.title}
                      </h2>

                      {post.summary && (
                        <p className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-2">
                          {post.summary}
                        </p>
                      )}

                      <p className="mt-3 font-mono text-[11px] text-ink-3">
                        <span className="uppercase tracking-[0.14em]">
                          {post.dateLabel}
                        </span>
                        <span className="px-2 text-ink/25">/</span>
                        {post.locked ? "locked" : `${post.readingTime} min read`}
                        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

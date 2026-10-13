import { Link } from "react-router-dom";
import { timeline } from "../data/posts";
import { Reveal, SectionHead } from "../components/ui";
import { usePageTitle } from "../components/usePageTitle";

/*
  A row on the index. Standalone posts and collections share one shape — date
  rail on the left, title and a line of meta on the right — so a series reads as
  a peer of a post rather than a different kind of object.
*/
function Row({ to, rail, title, summary, meta, children }) {
  return (
    <Link
      to={to}
      className="group block border-b border-ink/10 py-8 transition-colors hover:bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-10"
    >
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent sm:w-44 sm:shrink-0">
          {rail}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-tight text-ink transition-colors group-hover:text-accent">
            {children}
            {title}
          </h3>
          {summary && (
            <p className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-2">
              {summary}
            </p>
          )}
          <p className="mt-3 font-mono text-[11px] text-ink-3">
            {meta}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

/*
  The writing index. A plain reverse-chronological list rather than cards: these
  are posts, and a row of tiles would promise images that the posts do not have.

  A collection appears as one row no matter how many entries it holds, so a
  fourteen-week class log cannot bury everything else written that term.

  Top padding is generous because this page has no hero — the fixed nav sits on
  paper from the first pixel, and the heading needs to clear it.
*/
export default function Blog() {
  usePageTitle("Blog — Subhi Stephan");

  return (
    <div className="grain relative min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pb-28 sm:pt-40">
        <SectionHead index="04" label="blog" />

        <Reveal>
          <p className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-ink-2">
            hi. i have a lot of thoughts so i figured i'd put some of them here.
          </p>
        </Reveal>

        {timeline.length === 0 ? (
          <Reveal>
            <p className="mt-16 font-mono text-sm text-ink-3">
              Nothing published yet. Drop a Markdown file in{" "}
              <code className="text-ink-2">src/posts/</code> and it appears here.
            </p>
          </Reveal>
        ) : (
          <ul className="mt-14 border-t border-ink/10">
            {timeline.map((entry, i) => (
              <Reveal
                as="li"
                key={
                  entry.kind === "post"
                    ? entry.post.slug
                    : `collection:${entry.collection.slug}`
                }
                delay={i * 80}
              >
                {entry.kind === "collection" ? (
                  <Row
                    to={`/blog/${entry.collection.slug}`}
                    rail={entry.collection.label}
                    title={entry.collection.title}
                    summary={entry.collection.standfirst}
                    meta={`${entry.collection.posts.length} ${
                      entry.collection.posts.length === 1
                        ? entry.collection.unit
                        : entry.collection.units
                    }`}
                  />
                ) : (
                  <Row
                    to={`/blog/${entry.post.slug}`}
                    rail={entry.post.dateLabel}
                    title={entry.post.title}
                    summary={entry.post.summary}
                    meta={
                      entry.post.locked
                        ? "locked"
                        : `${entry.post.readingTime} min read`
                    }
                  >
                    {/* The lock is decorative; the word "locked" above carries
                        the same meaning for a screen reader. */}
                    {entry.post.locked && <span aria-hidden="true">🔒 </span>}
                  </Row>
                )}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

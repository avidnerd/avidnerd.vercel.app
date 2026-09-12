import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { work } from "../data/content";
import { ExtLink, Reveal, SectionHead, Stat, Tag } from "../components/ui";

/*
  Each project is a spec sheet: a narrow left rail carrying the index, dates,
  stack and links, and a wide right column carrying the argument. The rail is
  what makes it read as engineering documentation rather than as a blog post,
  and it collapses above the content on narrow screens.
*/
function Project({ project, index }) {
  const {
    name,
    role,
    period,
    blurb,
    detail,
    stats = [],
    badge,
    note,
    tags = [],
    links = [],
    image,
    imageCaption,
    imageAlt,
  } = project;

  return (
    <div className="grid gap-8 lg:grid-cols-[9rem_1fr] lg:gap-14">
      {/* rail */}
      <div className="flex flex-row flex-wrap items-baseline gap-x-6 gap-y-3 lg:flex-col lg:items-start lg:gap-4">
        <span className="font-mono text-xs tabular-nums text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[11px] text-ink-3">{period}</span>

        <ul className="flex flex-wrap gap-x-3 gap-y-1.5 lg:mt-2 lg:flex-col lg:gap-1.5">
          {tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <ul className="flex flex-wrap gap-4 lg:mt-2 lg:flex-col lg:gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <ExtLink href={l.href}>{l.label}</ExtLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* body */}
      <div className="min-w-0">
        <h3 className="font-serif text-[clamp(1.75rem,4vw,2.6rem)] leading-tight text-ink">
          {name}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          {role}
        </p>

        {/* Mono runs wide, so it steps down on narrow screens to keep a
            readable measure rather than three words to a line. */}
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink sm:text-[17px]">
          {blurb}
        </p>

        {detail && (
          <p className="mt-4 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-2">
            {detail}
          </p>
        )}

        {stats.length > 0 && (
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <Stat key={label} value={value} label={label} />
            ))}
          </div>
        )}

        {/*
          A notched box rather than a left-bar callout. The accent rule with a
          letterspaced micro-caps label over italic body is a house style that
          turns up on every AI-written page; this borrows from an engineering
          drawing instead, with the label cut into the top border like a
          fieldset legend. Same information, none of the tell.
        */}
        {/* Programme affiliation, as a logo lockup rather than another stat. */}
        {badge && (
          <div className="mt-7 flex items-center gap-3">
            <img
              src={badge.src}
              alt={badge.alt}
              loading="lazy"
              className="h-[15px] w-auto"
            />
            <span className="font-mono text-[12px] text-ink-3">{badge.text}</span>
          </div>
        )}

        {note && (
          <div className="relative mt-10 max-w-2xl border border-ink/20 px-6 pb-6 pt-8">
            <span className="absolute -top-[0.62rem] left-5 bg-paper px-2 font-mono text-[11px] text-ink-2">
              {note.label}
            </span>
            <p className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-ink">
              {note.text}
            </p>
            {note.after && (
              <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink-3">
                {note.after}
              </p>
            )}
            {note.href && (
              <p className="mt-4">
                <ExtLink href={note.href}>{note.hrefLabel || "read"}</ExtLink>
              </p>
            )}
          </div>
        )}

        {image && (
          <figure className="mt-9 max-w-2xl">
            <div className="overflow-hidden border border-ink/12 bg-paper-2">
              <img
                src={image}
                alt={imageAlt || `${name} screenshot`}
                loading="lazy"
                className="w-full"
              />
            </div>
            {imageCaption && (
              <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-ink-3">
                {imageCaption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </div>
  );
}

function Arrow({ dir, onClick, disabled }) {
  const Icon = dir === "next" ? ChevronRight : ChevronLeft;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "next" ? "Next project" : "Previous project"}
      className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink-2 transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:border-ink/10 disabled:text-ink/25"
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}

/*
  One project at a time rather than six stacked.

  Six full spec sheets ran to several screens of scrolling, which buried the
  later ones. A carousel trades scannability for length: each project is now one
  click away instead of one scroll away. The name strip is what keeps that trade
  fair — every title stays on screen, so nothing hides behind a numbered dot
  that tells the reader nothing about what it is.

  It does not auto-advance. Work should be read at the reader's pace, and moving
  copy out from under someone mid-sentence is hostile.
*/
export default function Work() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState("next");

  const go = (to) => {
    const next = Math.max(0, Math.min(work.length - 1, to));
    if (next === i) return;
    setDir(next > i ? "next" : "prev");
    setI(next);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(i - 1);
    }
  };

  const project = work[i];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <SectionHead id="work" index="01" label="selected work" />

      <Reveal>
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Selected work"
          onKeyDown={onKeyDown}
          className="mt-10"
        >
          <div className="flex flex-col gap-4 border-b border-ink/12 pb-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {work.map((p, n) => (
                <li key={p.id}>
                  <button
                    onClick={() => go(n)}
                    aria-current={n === i ? "true" : undefined}
                    className={`font-mono text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      n === i
                        ? "text-ink underline decoration-accent decoration-2 underline-offset-4"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-[11px] tabular-nums text-ink-3">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(work.length).padStart(2, "0")}
              </span>
              <Arrow dir="prev" onClick={() => go(i - 1)} disabled={i === 0} />
              <Arrow
                dir="next"
                onClick={() => go(i + 1)}
                disabled={i === work.length - 1}
              />
            </div>
          </div>

          {/* Announces the move for anyone who is not watching it happen. */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {`Project ${i + 1} of ${work.length}: ${project.name}`}
          </div>

          {/* `key` restarts the entrance animation on every change. */}
          <div key={project.id} className={`carousel-in-${dir} pt-12`}>
            <Project project={project} index={i} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { profile } from "../data/content";

/*
  The painting carries the whole first screen, so the only jobs here are keeping
  the type legible over it and getting out of the way.

  Legibility comes from where the text sits rather than from a heavy overlay: the
  copy is anchored bottom-left, over the darkest part of the picture (the
  silhouetted ridge), with a soft bottom-up scrim doing the rest. That way the
  sun and the cloud layer stay untouched.
*/
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      <img
        src="/img/hero.jpg"
        srcSet="/img/hero-sm.jpg 1280w, /img/hero.jpg 2560w"
        sizes="100vw"
        alt="A sunrise above the cloud layer at Haleakalā, redrawn as thousands of painted dots"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[heroIn_14s_ease-out_forwards]"
      />

      {/*
        Scrim: heavy under the copy, released by roughly three-quarters height so
        the sun and the top of the cloud layer are never touched. Hand-placed
        stops rather than a plain two-colour gradient, because the eyebrow line
        sits over the brightest band in the picture and needs cover there.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,19,16,0.93) 0%, rgba(26,19,16,0.78) 26%, rgba(26,19,16,0.42) 48%, rgba(26,19,16,0.12) 66%, rgba(26,19,16,0) 80%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10 sm:pb-20">
        {/* Rendered only when there is something to say, so emptying `meta`
            closes the gap instead of leaving a blank line above the name. */}
        {profile.meta.length > 0 && (
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/75">
            {profile.meta.join("  ·  ")}
          </p>
        )}

        <h1 className="font-serif text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] text-paper">
          {profile.name}
        </h1>

        <p className="mt-7 max-w-2xl font-mono text-[clamp(1rem,2.1vw,1.4rem)] leading-relaxed text-paper">
          {profile.mission}
          <span className="cursor ml-2 bg-accent-soft align-baseline" />
        </p>

        <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-paper/70">
          {profile.standfirst}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#work"
            className="border border-paper/40 px-4 py-2 font-mono text-xs text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            see the work ↓
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs text-paper/70 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
          >
            {profile.email}
          </a>
        </div>
      </div>

      <p className="relative mx-auto w-full max-w-6xl px-6 pb-6 font-mono text-[10px] text-paper/45 sm:px-10">
        {profile.photoCredit}
      </p>

      <style>{`
        @keyframes heroIn {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

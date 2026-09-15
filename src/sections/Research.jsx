import { research } from "../data/content";
import { Reveal, SectionHead } from "../components/ui";

/*
  Research labs. Credentials rather than arguments, so they get compact list
  treatment: enough to be findable and verifiable, never enough to compete with
  the project section above. The community work that used to sit alongside this
  now lives in the "tech for good" facet.
*/
export default function Research() {
  return (
    <div className="grain relative border-y border-ink/10 bg-paper-2">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-28">
        <SectionHead id="research" index="02" label="research" />
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {research.map((r, i) => (
            <Reveal as="li" key={r.org} delay={i * 90}>
              <h3 className="font-display text-xl leading-snug text-ink">{r.org}</h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {r.lab}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

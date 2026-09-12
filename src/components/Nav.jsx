import { useEffect, useState } from "react";
import { profile } from "../data/content";

const LINKS = [
  ["about", "#about"],
  ["work", "#work"],
  ["research", "#research"],
  ["contact", "#contact"],
];

/*
  Sits over the painting, then takes on paper and a hairline once the hero has
  scrolled past, so it never fights the artwork or the text.

  While still over the hero the bar carries its own soft dark gradient rather
  than a solid fill. Hero copy passing underneath is dimmed by it, which keeps
  the nav labels readable without boxing the painting in.
*/
export default function Nav() {
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    // Switches almost immediately. Waiting until the hero is cleared leaves a
    // long stretch where hero copy scrolls directly behind the wordmark, and no
    // amount of scrim separates overlapping text from text.
    const onScroll = () => setLanded(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        landed
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      {/*
        The over-hero scrim lives on its own layer, taller than the bar itself,
        so its falloff finishes well below the nav instead of stopping dead at
        the header's bottom edge and leaving a visible seam across the painting.
        Non-interactive, so it never swallows a click meant for the hero.
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 via-ink/45 to-transparent transition-opacity duration-500 ${
          landed ? "opacity-0" : "opacity-100"
        }`}
      />
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 font-mono text-xs transition-colors duration-500 sm:px-10 ${
          landed ? "text-ink-2" : "text-paper/90"
        }`}
      >
        <a
          href="#top"
          className={`tracking-[0.14em] transition-colors ${
            landed ? "text-ink hover:text-accent" : "text-paper hover:text-accent-soft"
          }`}
        >
          subhi
        </a>

        <div className="flex items-center gap-5 sm:gap-7">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`hidden transition-colors sm:inline ${
                landed ? "hover:text-accent" : "hover:text-accent-soft"
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`border px-2.5 py-1 transition-colors ${
              landed
                ? "border-ink/25 hover:border-accent hover:text-accent"
                : "border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink"
            }`}
          >
            résumé ↗
          </a>
        </div>
      </nav>
    </header>
  );
}

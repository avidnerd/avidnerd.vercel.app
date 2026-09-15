import { profile } from "../data/content";
import { Reveal } from "../components/ui";

/*
  Closing on ink rather than paper: the page starts dark with the painting, goes
  light for the work, and comes back to dark to finish, so it reads as bookended
  rather than as a document that simply stopped.
*/
export default function Contact() {
  // Discord has no href: a handle is something you copy into the app, not a
  // link, so that row renders as plain type.
  const channels = [
    ["email", `mailto:${profile.email}`, profile.email],
    ["github", profile.github, "github.com/avidnerd"],
    ["linkedin", profile.linkedin, "linkedin.com/in/subhiksha-stephan"],
    ["discord", null, profile.discord],
    ["résumé", profile.resume, "pdf ↗"],
  ];

  return (
    <footer id="contact" className="relative scroll-mt-20 overflow-hidden bg-ink text-paper">
      {/* The drifting panorama. Mirrored copies so the loop has no seam. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="pano-track flex h-full w-max">
          {[0, 1, 2, 3].map((n) => (
            <img
              key={n}
              src="/img/contact-pano.jpg"
              alt=""
              loading="lazy"
              className={`h-full w-auto max-w-none object-cover ${
                n % 2 ? "-scale-x-100" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scrim. The footer's type is light on dark, so the photograph has to sit
          well back or the addresses stop being readable. */}
      <div className="absolute inset-0 bg-ink/82" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-paper/50">
            contact
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] text-paper">
            If you would like to connect or share anything cool you're building, please do! I'm down to talk about anything.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {channels.map(([label, href, value]) => (
              <li key={label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="mt-2 block break-words font-mono text-sm text-paper underline decoration-paper/25 underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 block break-words font-mono text-sm text-paper">
                    {value}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/15 pt-6 font-mono text-[10px] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>
            all photographs are my own!
          </p>
        </div>
      </div>
    </footer>
  );
}

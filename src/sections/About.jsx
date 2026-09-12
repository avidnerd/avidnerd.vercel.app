import { useEffect, useRef, useState } from "react";
import {
  Camera,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Mountain,
  Music,
  PencilRuler,
  Rocket,
  Scale,
  Utensils,
  X,
} from "lucide-react";
import { about, facets, profile } from "../data/content";
import { Reveal, useTypedOnView } from "../components/ui";

/*
  Icons are lucide-react, an ISC-licensed line set. Stroke weight is dialled
  down to match the hairline rules used everywhere else on the page. They are
  imported by name into this map: a wildcard import pulls all ~1,500 icons into
  the bundle, which cost a megabyte before it was pinned down.
*/
const ICONS = {
  GraduationCap,
  Microscope,
  Rocket,
  HeartHandshake,
  Scale,
  Camera,
  Mountain,
  Music,
  PencilRuler,
  Utensils,
};

const HALF = Math.ceil(facets.length / 2);

/*
  `display: none` cancels transitions, so the panel cannot simply be hidden when
  closed or it would pop rather than grow in from the centre. On desktop it is
  absolutely positioned, so it can stay mounted and merely fade — it holds no
  space. On mobile it sits in normal flow, where a mounted-but-invisible panel
  would leave a gap, so there it really is unmounted.
*/
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function Tile({ facet, index, on, onSelect }) {
  const Icon = ICONS[facet.icon];
  return (
    <button
      /* These are independent toggles now rather than a single-selection
         tablist, so each is tabbable and reports its own open state. */
      aria-expanded={on}
      aria-label={facet.label}
      onClick={() => onSelect(index)}
      className={`group relative flex h-[4.5rem] w-full items-center justify-center border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-[4.5rem] ${
        on
          ? "border-ink/30 bg-paper"
          : "border-ink/12 bg-paper/90 hover:border-ink/30 hover:bg-paper"
      }`}
    >
      {/*
        The shine. A radial wash of the icon's own colour sitting behind it,
        faint at rest and full on hover or while its window is open.
      */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-2 rounded-full blur-md transition-opacity duration-300 ${
          on ? "opacity-100" : "opacity-0 group-hover:opacity-80"
        }`}
        style={{
          background: `radial-gradient(circle, ${facet.color}59 0%, transparent 70%)`,
        }}
      />

      <Icon
        size={on ? 30 : 27}
        strokeWidth={on ? 1.9 : 1.6}
        aria-hidden="true"
        className="relative transition-all duration-300 group-hover:scale-110"
        style={{
          color: facet.color,
          filter: on ? `drop-shadow(0 1px 6px ${facet.color}66)` : "none",
        }}
      />

      {/* Name on hover and on keyboard focus, replacing the printed label. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap border border-ink/10 bg-paper px-2 py-1 font-mono text-[10px] text-ink-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {facet.label}
      </span>
    </button>
  );
}

/*
  One window per facet, stacked like application windows.

  Opening a second facet does not replace the first: windows accumulate, each
  closing only by its own button. That means the middle can end up covered, so
  every window cascades off the last by a fixed step and can be dragged by its
  title bar, which is what makes a pile of them navigable rather than a mess.

  Clicking a tile whose window is already open raises it instead of toggling it
  shut, matching how clicking a taskbar item behaves.

  The floating behaviour is desktop only. Below `lg` the middle column is too
  narrow to float anything over, so open windows stack in normal flow under the
  tiles, in the order they were opened.
*/
/*
  The cascade fans out from the centre rather than marching down and right. A
  one-directional cascade pushes the fourth and fifth windows clean out of the
  section; alternating around the origin keeps the whole pile inside it while
  still offsetting every window from its neighbour.
*/
const CASCADE = 26; // px per step
const CASCADE_STEPS = [0, 1, -1, 2, -2];

function FacetWindow({ facet, onClose, onFocus, z, offset, isDesktop }) {
  const Icon = ICONS[facet.icon];
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const origin = useRef(null);

  const onPointerDown = (e) => {
    if (!isDesktop || e.button !== 0) return;
    /*
      Never start a drag from a control inside the bar. Capturing the pointer
      here redirects the following pointerup to the title bar, so the button
      never sees both halves of a click and the close silently stops working.
    */
    if (e.target.closest("button")) return;
    onFocus();
    origin.current = { px: e.clientX, py: e.clientY, ...drag };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!origin.current) return;
    const o = origin.current;
    setDrag({ x: o.x + e.clientX - o.px, y: o.y + e.clientY - o.py });
  };

  const endDrag = (e) => {
    if (!origin.current) return;
    origin.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  /*
    Desktop windows are centred by transform, so the cascade and the drag are
    folded into that same translate. In flow layout they are plain blocks and
    neither applies.
  */
  const style = isDesktop
    ? {
        zIndex: z,
        translate: `calc(-50% + ${offset + drag.x}px) calc(-50% + ${offset + drag.y}px)`,
      }
    : undefined;

  return (
    <section
      aria-label={facet.label}
      onPointerDown={() => onFocus()}
      style={style}
      className="window-in border border-ink/20 bg-paper shadow-[0_20px_60px_-28px_rgba(21,24,28,0.7)] lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:max-h-[21rem] lg:w-[min(40rem,66%)] lg:flex-col"
    >
      {/* Title bar, and the drag handle. */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex shrink-0 items-center gap-2 border-b border-ink/15 bg-paper-2 px-3 py-2 lg:cursor-grab lg:active:cursor-grabbing"
      >
        <Icon
          size={14}
          strokeWidth={1.8}
          aria-hidden="true"
          style={{ color: facet.color }}
        />
        <span className="font-mono text-[11px] text-ink-2">{facet.label}</span>
        <button
          onClick={onClose}
          aria-label={`Close ${facet.label}`}
          className="ml-auto p-1 text-ink-3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <X size={14} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      <div className="p-6 sm:p-7 lg:min-h-0 lg:overflow-y-auto">
        <h3 className="font-serif text-[clamp(1.3rem,2.6vw,1.85rem)] leading-tight text-ink">
          {facet.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{facet.text}</p>

        {facet.photos && (
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            {facet.photos.map((ph) => (
              <li key={ph.src}>
                <div className="overflow-hidden border border-ink/12 bg-paper-3">
                  <img
                    src={ph.src}
                    alt={ph.cap}
                    loading="lazy"
                    draggable="false"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] leading-snug text-ink-3">
                  {ph.cap}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FacetWindows() {
  // Front of the array is the bottom of the pile; the last entry is on top.
  const [stack, setStack] = useState([]);
  const opened = useRef(0);
  const isDesktop = useIsDesktop();

  const open = (i) => {
    /*
      Both the read and the increment happen here, synchronously, never inside
      the updater. React invokes updaters more than once in development and
      batches them besides, so a counter advanced in there hands consecutive
      windows the same offset and the cascade collapses.
    */
    const offset = CASCADE_STEPS[opened.current % CASCADE_STEPS.length] * CASCADE;
    opened.current += 1;
    setStack((prev) => {
      const existing = prev.find((w) => w.i === i);
      // Already open: raise it rather than toggling it shut.
      if (existing) return [...prev.filter((w) => w.i !== i), existing];
      return [...prev, { i, offset }];
    });
  };

  const close = (i) => setStack((prev) => prev.filter((w) => w.i !== i));
  const raise = (i) =>
    setStack((prev) => {
      const w = prev.find((x) => x.i === i);
      if (!w || prev[prev.length - 1] === w) return prev;
      return [...prev.filter((x) => x.i !== i), w];
    });

  const onKeyDown = (e) => {
    if (e.key === "Escape" && stack.length) {
      e.preventDefault();
      close(stack[stack.length - 1].i); // topmost first, like closing windows
    }
  };

  const column = (from, to) => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1">
      {facets.slice(from, to).map((f, n) => {
        const i = from + n;
        return (
          <Tile
            key={f.id}
            facet={f}
            index={i}
            on={stack.some((w) => w.i === i)}
            onSelect={open}
          />
        );
      })}
    </div>
  );

  return (
    <div
      onKeyDown={onKeyDown}
      className="relative mt-8 grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-10"
    >
      {column(0, HALF)}

      {/* The gap the seated figure sits in. It only holds height open. */}
      <div aria-hidden="true" className="hidden lg:block lg:min-h-[25rem]" />

      {column(HALF, facets.length)}

      {stack.length > 0 && (
        /*
          `display: contents` at every width, so this wrapper never becomes a
          grid item itself. As a block it added a second grid row the moment a
          window opened, and the section grew by the row gap and shrank again
          when the last one closed. With contents, the desktop windows are
          absolutely positioned and stay out of flow entirely, while on mobile
          they fall into the single column as ordinary blocks.
        */
        <div className="contents">
          {stack.map((w, n) => (
            <FacetWindow
              key={facets[w.i].id}
              facet={facets[w.i]}
              offset={w.offset}
              z={10 + n}
              isDesktop={isDesktop}
              onClose={() => close(w.i)}
              onFocus={() => raise(w.i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* The section heading, typed out at a shell prompt. */
function WhoIAm() {
  const { ref, out, done } = useTypedOnView("who i am", { speed: 70 });
  return (
    <p
      ref={ref}
      className="inline-flex items-center border border-ink/10 bg-paper px-4 py-2 font-mono text-lg"
    >
      <span className="mr-3 text-accent">$</span>
      <span className="font-medium text-ink">{out}</span>
      {!done && <span className="cursor ml-1 bg-ink" />}
    </p>
  );
}

/*
  Aligned hard to the left rather than centred like the rest of the page. The
  portrait and the opening line sit on plain paper; only the "who i am" block
  below them stands on the painting, at full strength with no wash over it.
*/
export default function About() {
  return (
    <section
      id="about"
      className="grain relative scroll-mt-20 border-b border-ink/10 bg-paper-2"
    >
      <div className="relative px-6 pt-24 sm:px-10 sm:pt-28 lg:px-14">
        <div className="max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              <figure className="w-[12rem] shrink-0 sm:w-[15rem]">
                <div className="overflow-hidden border border-ink/12 bg-paper-3">
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 font-mono text-[11px] leading-snug text-ink-3">
                  Duke Chapel, 2026
                </figcaption>
              </figure>

              <p className="max-w-[38rem] font-serif text-[clamp(1.5rem,3.1vw,2.35rem)] leading-[1.4] text-ink">
                {about[0]}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/*
        The painting block, full bleed so the stipple runs off both edges rather
        than sitting in a box. The source is cropped so the seated figure lands
        at the vertical centre, which is exactly the gap the two tile columns
        leave open between them.
      */}
      <div className="relative mt-12 border-t border-ink/10">
        <img
          src="/img/about-bg.jpg"
          alt="Me sitting in a field watching a magenta sunset, my photograph redrawn as painted dots"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <WhoIAm />
          <Reveal delay={90}>
            <FacetWindows />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

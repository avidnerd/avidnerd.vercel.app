import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ viewport

  A shared, throttled scroll registry rather than IntersectionObserver.

  IntersectionObserver samples at frame boundaries, so a large instantaneous
  jump — a nav anchor, a restored scroll position, a fast trackpad fling — can
  carry an element from below the fold to above it without ever reporting an
  intersection. Anything waiting on that callback then stays hidden forever.
  Measuring rects directly cannot skip, because it asks where the element is now
  instead of waiting to be told that it moved.

  One listener serves every watcher on the page, and it detaches itself once the
  last one has fired.
*/

const watchers = new Set();
let timer = null;
let attached = false;

// Fractions of viewport height at which a watcher fires.
const TRIGGER_ENTER = 1.0; // the moment the top edge crosses into view
const TRIGGER_READ = 0.78; // once the line has settled into the reading zone
const THROTTLE = 60; // ms; imperceptible for a fade trigger, cheap on scroll

function flush() {
  const vh = window.innerHeight;

  for (const w of [...watchers]) {
    if (!w.el || !w.el.isConnected) {
      watchers.delete(w);
      continue;
    }
    const rect = w.el.getBoundingClientRect();
    if (rect.top < vh * w.trigger) {
      watchers.delete(w);
      // Fully past the top edge means the visitor never saw it arrive, so the
      // caller should settle instantly rather than play an entrance.
      w.fire(rect.bottom < 0);
    }
  }

  if (watchers.size === 0) detach();
}

/*
  Throttled with a timer rather than requestAnimationFrame. rAF is suspended
  entirely in a hidden tab, so a page opened in a background tab would register
  its watchers and then never run them. setTimeout is throttled there but still
  fires, which keeps the page from arriving blank.
*/
function schedule() {
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    flush();
  }, THROTTLE);
}

function attach() {
  if (attached) return;
  attached = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function detach() {
  if (!attached) return;
  attached = false;
  clearTimeout(timer);
  timer = null;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

/** Calls `fire(skipped)` once, as soon as `el` reaches its trigger line. */
function watch(el, fire, trigger) {
  const w = { el, fire, trigger };
  watchers.add(w);
  attach();
  // One scheduled pass covers every watcher registered this tick, and lands
  // after paint so above-the-fold blocks still play their fade.
  schedule();
  return () => watchers.delete(w);
}

/* --------------------------------------------------------------------- hooks */

/**
 * Reports when the element has reached the trigger line.
 * `skipped` is true if it was already above the viewport, i.e. never seen.
 */
function useInView(trigger = TRIGGER_ENTER) {
  const ref = useRef(null);
  const [state, setState] = useState({ inView: false, skipped: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return watch(el, (skipped) => setState({ inView: true, skipped }), trigger);
  }, [trigger]);

  return { ref, ...state };
}

/* ---------------------------------------------------------------- primitives */

/* Fades a block up the first time it reaches the trigger line. */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const { ref, inView, skipped } = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "shown" : ""} ${className}`}
      style={{ transitionDelay: skipped ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/*
  Numbered section rule. The index sits in the accent, the label in letterspaced mono
  caps, and a hairline runs out to the right margin — the one repeated structural
  gesture that gives the page its rhythm.
*/
export function SectionHead({ index, label, id }) {
  return (
    <Reveal>
      <div id={id} className="flex items-baseline gap-4 scroll-mt-24">
        <span className="font-mono text-xs text-accent tabular-nums">{index}</span>
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-ink-2">
          {label}
        </h2>
        <span className="h-px flex-1 translate-y-[-2px] bg-ink/15" />
      </div>
    </Reveal>
  );
}

export function Tag({ children }) {
  return (
    <span className="font-mono text-[11px] text-ink-3">
      <span className="text-ink/25">[</span>
      <span className="px-1.5">{children}</span>
      <span className="text-ink/25">]</span>
    </span>
  );
}

export function Stat({ value, label }) {
  return (
    <div>
      <div className="font-mono text-lg font-bold tabular-nums text-ink">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[11px] leading-snug text-ink-3">
        {label}
      </div>
    </div>
  );
}

export function ExtLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group font-mono text-xs text-ink-2 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent ${className}`}
    >
      {children}
      <span className="ml-1 inline-block transition-transform group-hover:-translate-y-px group-hover:translate-x-px">
        ↗
      </span>
    </a>
  );
}

/*
  Types a string out one character at a time, but only once the line has been
  scrolled to, so the visitor always catches it from the first character.

  Renders the finished string immediately when the line was scrolled past
  unseen, or when the visitor has asked for reduced motion.
*/
export function useTypedOnView(text, { speed = 55 } = {}) {
  // Later trigger than a plain fade: a command that types itself out while
  // still hanging off the bottom edge has finished before it can be read.
  const { ref, inView, skipped } = useInView(TRIGGER_READ);
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || skipped) {
      setOut(text);
      setDone(true);
      return;
    }

    // Reset before retyping. `text` is a dependency, so changing it retypes —
    // without this the previous string would sit there for the opening delay
    // and the cursor would never come back.
    setOut("");
    setDone(false);

    let timer;
    let i = 0;
    const step = () => {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) timer = setTimeout(step, speed);
      else setDone(true);
    };
    timer = setTimeout(step, 180);

    return () => clearTimeout(timer);
  }, [inView, skipped, text, speed]);

  return { ref, out, done };
}

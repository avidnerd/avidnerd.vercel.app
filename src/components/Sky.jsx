/*
  Faint clouds drifting behind every page. Fixed to the viewport so they stay
  put while the content scrolls over them, and kept to a few soft blurred puffs
  so they read as weather, not decoration competing with the text.

  Each cloud gets its own height, size, speed and a negative delay, so the sky
  is already populated on load instead of every cloud entering from the left
  edge at once.
*/
const clouds = [
  { top: "6%", scale: 1.1, duration: 55, delay: -20, opacity: 0.9 },
  { top: "22%", scale: 0.7, duration: 75, delay: -15, opacity: 0.7 },
  { top: "38%", scale: 1.4, duration: 90, delay: -65, opacity: 0.6 },
  { top: "55%", scale: 0.9, duration: 65, delay: -15, opacity: 0.75 },
  { top: "72%", scale: 1.2, duration: 85, delay: -50, opacity: 0.65 },
  { top: "86%", scale: 0.8, duration: 60, delay: -30, opacity: 0.8 },
];

export default function Sky() {
  return (
    <div aria-hidden="true" className="sky">
      {clouds.map((c, n) => (
        <span
          key={n}
          className="cloud"
          style={{
            top: c.top,
            opacity: c.opacity,
            "--scale": c.scale,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

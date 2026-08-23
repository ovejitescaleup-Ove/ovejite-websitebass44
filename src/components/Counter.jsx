import { useEffect, useRef, useState } from "react";

/**
 * Counter — animates a number from 0 to target when scrolled into view.
 * Pass `value` as a numeric string like "$3.6M+" — it parses the leading number,
 * animates it, and reattaches the prefix/suffix.
 */
export default function Counter({ value, duration = 1800, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const [done, setDone] = useState(false);

  // Parse prefix, number, suffix
  const match = (value || "").match(/^([^0-9]*)([\d,.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const rawNumber = match ? match[2] : "";
  const suffix = match ? match[3] : "";
  const hasComma = rawNumber.includes(",");
  const target = parseFloat(rawNumber.replace(/,/g, "")) || 0;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(rawNumber || "0");
      setDone(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            let current = target * eased;
            let str = Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1);
            if (hasComma) {
              str = Math.round(current).toLocaleString("en-US");
            }
            setDisplay(str);
            if (p < 1) requestAnimationFrame(tick);
            else setDone(true);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, done, rawNumber, hasComma]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * Funnel — animated conversion funnel visualization.
 * Illustrative: Traffic → Interest → Engagement → Conversion → Growth
 */
const STAGES = [
  { label: "Traffic", value: 100, color: "#FF4D00" },
  { label: "Interest", value: 65, color: "#FF8E72" },
  { label: "Engagement", value: 40, color: "#A855F7" },
  { label: "Conversion", value: 22, color: "#7C3AED" },
  { label: "Growth", value: 12, color: "#EC4899" },
];

export default function Funnel({ className = "" }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setProgress(1); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1200, 1);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const maxWidth = 100;

  return (
    <div ref={ref} className={`space-y-3 ${className}`}>
      {STAGES.map((stage, i) => {
        const widthPct = (stage.value / 100) * maxWidth * progress;
        return (
          <div key={stage.label} className="flex items-center gap-4">
            <div className="w-24 text-right text-sm font-semibold text-slate-600 shrink-0">
              {stage.label}
            </div>
            <div className="flex-1 relative h-12 bg-slate-100 rounded-xl overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-xl flex items-center justify-end pr-3 transition-all"
                style={{
                  width: `${widthPct}%`,
                  background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`,
                }}
              >
                <span className="text-xs font-bold text-white">{stage.value}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * DataFlow — animated tracking data-flow diagram.
 * Ad Click → Website → GTM → GA4 → Conversion → Reporting
 */
const STEPS = [
  { label: "Ad Click", icon: "🎯" },
  { label: "Website", icon: "🌐" },
  { label: "GTM", icon: "🏷️" },
  { label: "GA4", icon: "📊" },
  { label: "Conversion", icon: "✅" },
  { label: "Reporting", icon: "📈" },
];

export default function DataFlow({ className = "" }) {
  const ref = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setActiveStep(STEPS.length - 1); return; }
    const el = ref.current;
    if (!el) return;
    let interval;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let i = 0;
        interval = setInterval(() => {
          setActiveStep(i % STEPS.length);
          i++;
        }, 800);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => { observer.disconnect(); if (interval) clearInterval(interval); };
  }, []);

  return (
    <div ref={ref} className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2">
          <div
            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border-2 transition-all duration-500 min-w-[90px] ${
              activeStep === i
                ? "border-primary bg-orange-50 scale-105 shadow-lg shadow-orange-500/20"
                : "border-slate-200 bg-white"
            }`}
          >
            <span className="text-2xl">{step.icon}</span>
            <span className={`text-xs font-bold ${activeStep === i ? "text-primary" : "text-slate-500"}`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <svg width="24" height="12" viewBox="0 0 24 12" className="shrink-0">
              <path
                d="M2 6 L20 6 M16 2 L20 6 L16 10"
                fill="none"
                stroke={activeStep >= i ? "#FF4D00" : "#cbd5e1"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-500"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * PerformanceChart — animated SVG area chart for the credibility/data sections.
 * Illustrative visual design element (not real data).
 */
export default function PerformanceChart({ color = "#FF4D00", color2 = "#7C3AED", height = 200, points, className = "" }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const data = points || [20, 35, 28, 45, 38, 60, 52, 75, 68, 90, 85, 100];
  const width = 600;
  const max = Math.max(...data);
  const stepX = width / (data.length - 1);

  const coords = data.map((p, i) => ({
    x: i * stepX,
    y: height - (p / max) * (height - 20) - 10,
  }));
  const linePath = `M ${coords.map((c) => `${c.x},${c.y}`).join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
  const totalLength = 1200;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setProgress(1); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 2000, 1);
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

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none" style={{ width: "100%", height }}>
      <defs>
        <linearGradient id={`perf-grad-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`perf-line-${color.slice(1)}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" y1={height * g} x2={width} y2={height * g} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
      ))}
      <path d={areaPath} fill={`url(#perf-grad-${color.slice(1)})`} opacity={progress} />
      <path
        d={linePath}
        fill="none"
        stroke={`url(#perf-line-${color.slice(1)})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={totalLength * (1 - progress)}
      />
      {coords.map((c, i) => (
        <circle
          key={i}
          cx={c.x} cy={c.y} r="4"
          fill="#fff"
          stroke={color}
          strokeWidth="2"
          opacity={progress}
        />
      ))}
    </svg>
  );
}

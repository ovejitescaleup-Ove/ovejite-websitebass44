/**
 * SectionHeader — consistent eyebrow + headline + subtext block.
 */
export default function SectionHeader({ eyebrow, title, subtitle, align = "center", light = false }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <span className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-4 ${
          light ? "text-orange-300" : "text-primary"
        }`}>
          <span className={`h-px w-8 ${light ? "bg-orange-300" : "bg-primary"}`} />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display leading-[1.1] ${
        light ? "text-white" : "text-slate-900"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-slate-300" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

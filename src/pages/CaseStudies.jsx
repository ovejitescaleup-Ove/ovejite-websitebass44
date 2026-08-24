import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import { FALLBACK_CASE_STUDIES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Dental", value: "dental" },
  { label: "Medical", value: "medical" },
  { label: "Local Services", value: "local_services" },
  { label: "E-commerce", value: "ecommerce" },
];

export default function CaseStudies() {
  const { content } = useCMSPage("case-studies");
  const [studies, setStudies] = useState(FALLBACK_CASE_STUDIES);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.CaseStudy.filter({ published: true }, "-created_date", 50);
        if (data && data.length > 0) setStudies(data);
      } catch (e) {}
    })();
  }, []);

  const filtered = filter === "all" ? studies : studies.filter((s) => s.industry === filter);

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" /> {content.eyebrow || "Case Studies"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
              {content.title || "Real Work. Real Strategy. Real Growth."}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              {content.subtitle || "Case studies showing the strategy, tracking, and optimization behind real results. New projects added as they're completed."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === f.value
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-500">No case studies in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((study, i) => (
                <Reveal key={study.slug || study.id || i} delay={i * 60}>
                  <CaseStudyCard study={study} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

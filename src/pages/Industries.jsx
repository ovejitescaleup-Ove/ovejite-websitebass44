import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import IndustryCard from "@/components/IndustryCard";
import { FALLBACK_INDUSTRIES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

export default function Industries() {
  const { content } = useCMSPage("industries");
  const [industries, setIndustries] = useState(FALLBACK_INDUSTRIES);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Industry.list("display_order", 10);
        if (data && data.length > 0) setIndustries(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" /> {content.eyebrow || "Industries"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
              {content.title || "Built for Your Industry"}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              {content.subtitle || "Different industries need different strategies. Here's how I approach the ones I work with most."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug || i} delay={i * 60}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

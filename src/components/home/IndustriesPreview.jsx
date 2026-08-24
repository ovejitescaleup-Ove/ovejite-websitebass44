import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import IndustryCard from "@/components/IndustryCard";
import CTAButton from "@/components/CTAButton";
import { FALLBACK_INDUSTRIES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

export default function IndustriesPreview() {
  const [industries, setIndustries] = useState(FALLBACK_INDUSTRIES);
  const { content } = useCMSPage("home");

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Industry.list("display_order", 10);
        if (data && data.length > 0) setIndustries(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.industries_eyebrow || "Industries"}
            title={content.industries_title || "Built for Your Industry"}
            subtitle={content.industries_subtitle || "Different industries need different strategies. Here's how I approach the ones I work with most."}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug || i} delay={i * 60}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <CTAButton to="/industries" variant="dark" size="lg">
            {content.industries_cta || "Explore All Industries"}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

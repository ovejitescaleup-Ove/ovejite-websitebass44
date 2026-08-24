import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTAButton from "@/components/CTAButton";
import { FALLBACK_CASE_STUDIES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

export default function CaseStudiesPreview() {
  const [studies, setStudies] = useState(FALLBACK_CASE_STUDIES);
  const { content } = useCMSPage("home");

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.CaseStudy.filter({ featured: true, published: true }, "-created_date", 3);
        if (data && data.length > 0) setStudies(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.case_studies_eyebrow || "Proof"}
            title={content.case_studies_title || "Real Work. Real Strategy. Real Growth."}
            subtitle={content.case_studies_subtitle || "Case studies showing the strategy, tracking, and optimization behind real results. New projects added as they're completed."}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.slice(0, 3).map((study, i) => (
            <Reveal key={study.slug || study.id || i} delay={i * 80}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <CTAButton to="/case-studies" variant="dark" size="lg">
            {content.case_studies_cta || "View All Case Studies"}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

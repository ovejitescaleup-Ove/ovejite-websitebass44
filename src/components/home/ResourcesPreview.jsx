import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ResourceCard from "@/components/ResourceCard";
import CTAButton from "@/components/CTAButton";
import { FALLBACK_RESOURCES } from "@/lib/siteData";

export default function ResourcesPreview() {
  const [resources, setResources] = useState(FALLBACK_RESOURCES);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Resource.filter({ published: true }, "-publish_date", 3);
        if (data && data.length > 0) setResources(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Insights & Resources"
            title="Insights & Resources"
            subtitle="Practical guides on Google Ads, Meta Ads, conversion tracking, GA4, and growth strategy — written for marketers and business owners who want to make better decisions."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.slice(0, 3).map((resource, i) => (
            <Reveal key={resource.slug || resource.id || i} delay={i * 80}>
              <ResourceCard resource={resource} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <CTAButton to="/resources" variant="dark" size="lg">
            Explore All Resources
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

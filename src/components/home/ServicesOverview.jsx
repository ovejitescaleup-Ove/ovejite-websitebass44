import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";
import { FALLBACK_SERVICES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

export default function ServicesOverview() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const { content } = useCMSPage("home");

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Service.list("display_order", 20);
        if (data && data.length > 0) setServices(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.services_eyebrow || "What I Do"}
            title={content.services_title || "How I Help Businesses Grow"}
            subtitle={content.services_subtitle || "From advertising strategy to conversion tracking to continuous optimization — every service is built around measurable business outcomes."}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <Reveal key={service.slug || i} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <CTAButton to="/services" variant="dark" size="lg">
            {content.services_cta || "Explore All Services"}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

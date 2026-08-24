import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { FALLBACK_SERVICES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

export default function Services() {
  const { content } = useCMSPage("services");
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Service.list("display_order", 20);
        if (data && data.length > 0) setServices(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" /> {content.eyebrow || "Services"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
              {content.title || "How I Help Businesses Grow"}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              {content.subtitle || "From advertising strategy to conversion tracking to continuous optimization — every service is built around measurable business outcomes."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <Reveal key={service.slug || i} delay={i * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

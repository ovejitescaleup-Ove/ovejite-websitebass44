import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Check, Calendar } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Image } from "@/components/ui/image";
import { FALLBACK_SERVICES } from "@/lib/siteData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { settings } = useSiteSettings();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await base44.entities.Service.filter({ slug }, "display_order", 1);
        if (results && results.length > 0) {
          setService(results[0]);
        } else {
          setService(FALLBACK_SERVICES.find((s) => s.slug === slug) || null);
        }
      } catch (e) {
        setService(FALLBACK_SERVICES.find((s) => s.slug === slug) || null);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Service not found</h1>
        <CTAButton to="/services" variant="secondary" size="lg">View All Services</CTAButton>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
            {service.title}
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            {service.short_description || service.content}
          </p>
          <div className="mt-8">
            <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "service_detail", service: service.title }}>
              <Calendar className="w-5 h-5" /> {service.cta_text || "Book a Free Consultation"}
            </CTAButton>
          </div>
        </div>
      </section>

      {(service.features || service.benefits) && (
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
            {service.features && service.features.length > 0 && (
              <Reveal>
                <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">What's Included</h2>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {service.benefits && service.benefits.length > 0 && (
              <Reveal delay={100}>
                <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">Why It Matters</h2>
                <ul className="space-y-3">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <span className="text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {service.content && (
        <section className="py-12 bg-slate-50/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{service.content}</p>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-6">Ready to get started?</h2>
            <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "service_cta", service: service.title }}>
              <Calendar className="w-5 h-5" /> Book a Free Consultation
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

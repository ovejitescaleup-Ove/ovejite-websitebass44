import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Check, Calendar, Target } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { FALLBACK_INDUSTRIES } from "@/lib/siteData";

export default function IndustryDetail() {
  const { slug } = useParams();
  const { settings } = useSiteSettings();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await base44.entities.Industry.filter({ slug }, "display_order", 1);
        if (results && results.length > 0) {
          setIndustry(results[0]);
        } else {
          setIndustry(FALLBACK_INDUSTRIES.find((s) => s.slug === slug) || null);
        }
      } catch (e) {
        setIndustry(FALLBACK_INDUSTRIES.find((s) => s.slug === slug) || null);
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

  if (!industry) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Industry not found</h1>
        <CTAButton to="/industries" variant="secondary" size="lg">View All Industries</CTAButton>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Industries
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
            {industry.title}
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            {industry.description}
          </p>
          <div className="mt-8">
            <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "industry_detail", industry: industry.title }}>
              <Calendar className="w-5 h-5" /> Book a Free Consultation
            </CTAButton>
          </div>
        </div>
      </section>

      {industry.challenges && industry.challenges.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-display text-slate-900">Common Challenges</h2>
              </div>
              <ul className="space-y-3">
                {industry.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-slate-700">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {industry.strategy && (
        <section className="py-12 bg-slate-50/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">My Approach</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{industry.strategy}</p>
            </Reveal>
          </div>
        </section>
      )}

      {industry.services && industry.services.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">Services for {industry.title}</h2>
              <div className="flex flex-wrap gap-2">
                {industry.services.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full bg-slate-100 text-sm font-semibold text-slate-700">{s}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-6">Let's grow your {industry.title.toLowerCase()} business.</h2>
            <CTAButton to={settings.booking_url || "/contact"} size="lg">
              <Calendar className="w-5 h-5" /> Book a Free Consultation
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

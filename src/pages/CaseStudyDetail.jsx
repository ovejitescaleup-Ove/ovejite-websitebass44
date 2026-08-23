import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Calendar, Target, TrendingUp, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Image } from "@/components/ui/image";

const INDUSTRY_LABELS = { dental: "Dental", medical: "Medical", local_services: "Local Services", ecommerce: "E-commerce" };

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { settings } = useSiteSettings();
  const [study, setStudy] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await base44.entities.CaseStudy.filter({ slug, published: true }, "-created_date", 1);
        if (results && results.length > 0) {
          const s = results[0];
          setStudy(s);
          try {
            const m = await base44.entities.CaseStudyMetric.filter({ case_study_id: s.id }, "display_order", 20);
            setMetrics(m || []);
          } catch (e) {}
        }
      } catch (e) {}
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

  if (!study) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Clock className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Case Study Coming Soon</h1>
        <p className="text-slate-600 mb-8 max-w-md">Project details will be available soon. In the meantime, let's talk about your growth goals.</p>
        <CTAButton to="/contact" size="lg">Get in Touch</CTAButton>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-xs font-bold text-primary mb-4">
            {INDUSTRY_LABELS[study.industry] || study.industry}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 leading-[1.1]">
            {study.title}
          </h1>
          {study.excerpt && <p className="mt-5 text-lg text-slate-600 leading-relaxed">{study.excerpt}</p>}
        </div>
      </section>

      {/* Featured image */}
      {study.featured_image && (
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100">
              <Image src={study.featured_image} alt={study.title} fittingType="fill" className="w-full h-full block" />
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <section className="py-12 bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m) => (
                <div key={m.id} className="text-center">
                  <p className="text-3xl lg:text-4xl font-extrabold font-display text-white">{m.metric_value}</p>
                  <p className="text-sm text-slate-400 mt-1">{m.metric_name}</p>
                  {m.metric_description && <p className="text-xs text-slate-500 mt-1">{m.metric_description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content sections */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {study.challenge && (
            <Reveal>
              <ContentBlock icon={Target} title="The Challenge" content={study.challenge} />
            </Reveal>
          )}
          {study.strategy && (
            <Reveal>
              <ContentBlock icon={TrendingUp} title="The Strategy" content={study.strategy} />
            </Reveal>
          )}
          {study.results && (
            <Reveal>
              <ContentBlock icon={Calendar} title="The Results" content={study.results} />
            </Reveal>
          )}
          {study.services && study.services.length > 0 && (
            <Reveal>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-4">Services Provided</h3>
              <div className="flex flex-wrap gap-2">
                {study.services.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full bg-slate-100 text-sm font-semibold text-slate-700">{s}</span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-6">Want results like this for your business?</h2>
            <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "case_study_cta" }}>
              Book a Free Consultation
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContentBlock({ icon: Icon, title, content }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold font-display text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-600 leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
}

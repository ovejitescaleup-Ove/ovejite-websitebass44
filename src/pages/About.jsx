import { Calendar, ArrowRight, Target, BarChart3, TrendingUp, Shield, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Image } from "@/components/ui/image";
import { useCMSPage } from "@/hooks/useCMSPage";

const EXPERTISE = [
  { icon: Target, label: "Google Ads", desc: "Search, Shopping, Performance Max" },
  { icon: TrendingUp, label: "Meta Ads", desc: "Audience testing & creative optimization" },
  { icon: BarChart3, label: "GA4 & GTM", desc: "Accurate measurement systems" },
  { icon: Shield, label: "Server-Side Tracking", desc: "Reliable data infrastructure" },
  { icon: Zap, label: "Landing Page Optimization", desc: "Better journeys, more conversions" },
  { icon: Target, label: "Growth Strategy", desc: "Connected advertising & data" },
];

const PHILOSOPHY = [
  "Better data leads to better decisions.",
  "Know what your marketing is actually doing.",
  "Advertising works better when strategy, tracking, and conversion are connected.",
  "Growth comes from continuous improvement, not one-time fixes.",
];

export default function About() {
  const { settings } = useSiteSettings();
  const { content } = useCMSPage("about");
  const aboutImage = "https://media.base44.com/images/public/6a8b03e54d231ed531b97b43/cdcec4297_generated_6004dbcc.png";

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                <span className="h-px w-8 bg-primary" /> {content.eyebrow || "About"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
                {content.title || "Meet the Marketer Behind the Strategy."}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                {settings.short_bio || "I'm a performance-focused digital marketer who helps businesses grow through smarter advertising, accurate tracking, and continuous optimization."}
              </p>
              <div className="mt-8">
                <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "about_hero" }}>
                  <Calendar className="w-5 h-5" /> Book a Free Consultation
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-orange-100 to-purple-100 shadow-xl">
                <Image src={settings.profile_photo || aboutImage} alt="Ovejite" fittingType="fill" className="w-full h-full block" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 text-center mb-12">My Marketing Philosophy</h2>
          </Reveal>
          <div className="space-y-6">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#7C3AED] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed pt-1.5">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 lg:py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 text-center mb-4">Technical Expertise</h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-12">
              A blend of advertising strategy and technical tracking expertise — because you need both to grow profitably.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.label} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-purple-50 flex items-center justify-center mb-4">
                    <e.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{e.label}</h3>
                  <p className="text-sm text-slate-600">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mb-6">Let's build your growth strategy together.</h2>
            <CTAButton to="/contact" variant="dark" size="lg">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { Calendar, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import Counter from "@/components/Counter";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function CredibilityCTA() {
  const { settings } = useSiteSettings();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — metric + chart */}
          <Reveal>
            <div className="relative bg-slate-950 rounded-3xl p-8 lg:p-10 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="relative">
                <span className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Featured Metric</span>
                <p className="mt-3 text-5xl lg:text-6xl font-extrabold font-display text-white">
                  <Counter value={settings.monthly_ad_spend} />
                </p>
                <p className="mt-2 text-lg text-slate-300">Monthly Ad Spend Managed</p>

                <div className="mt-8">
                  <PerformanceChart color="#FF4D00" color2="#EC4899" height={160} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Google Ads", "Meta Ads", "GA4", "GTM", "Shopify"].map((p) => (
                    <span key={p} className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white backdrop-blur">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy + CTA */}
          <Reveal delay={100}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" />
              Ready to grow?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 leading-[1.1]">
              Ready to Improve Your Marketing Performance?
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Whether you're scaling ad spend, fixing conversion tracking, or building a growth strategy from scratch — it starts with understanding what's working and what isn't.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "credibility" }}>
                <Calendar className="w-5 h-5" />
                Let's Discuss Your Growth Strategy
              </CTAButton>
              <CTAButton to="/contact" variant="secondary" size="lg">
                Contact Me
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

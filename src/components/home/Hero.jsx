import { Link } from "react-router-dom";
import { Calendar, ArrowRight, TrendingUp, Target, DollarSign } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import MiniSparkline from "@/components/charts/MiniSparkline";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Image } from "@/components/ui/image";

export default function Hero() {
  const { settings } = useSiteSettings();
  const heroImage = "https://media.base44.com/images/public/6a8b03e54d231ed531b97b43/0840b0fd1_generated_dd3c07c4.png";

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-sm font-semibold text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Performance Marketing Specialist
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.05]">
              Let's Grow Your Business Through{" "}
              <span className="bg-gradient-to-r from-[#FF4D00] to-[#7C3AED] bg-clip-text text-transparent">
                Smarter Digital Marketing.
              </span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              Google Ads, Meta Ads, Conversion Tracking & Growth Strategy designed around measurable business results.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "hero" }}>
                <Calendar className="w-5 h-5" />
                Book a Free Consultation
              </CTAButton>
              <CTAButton to="/case-studies" variant="secondary" size="lg" eventName="view_work_click" eventParams={{ location: "hero" }}>
                View My Work
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
            {/* Credibility indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <CredItem value={settings.monthly_ad_spend} label="Ad Spend Managed" />
              <CredItem value={settings.projects_count} label="Projects" />
              <CredItem value={settings.years_experience} label="Years Experience" />
            </div>
          </div>

          {/* Right — visual + floating cards */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Main visual */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-orange-100 via-white to-purple-100 shadow-2xl shadow-purple-500/10">
                <Image src="https://media.base44.com/images/public/6a8b03e54d231ed531b97b43/2e61e7de6_ovejite-gads.jpeg"

                alt="Ovejite — performance marketing specialist"
                fittingType="fill"
                className="w-full h-full block" />
                
              </div>

              {/* Floating ROAS card */}
              <div className="absolute -left-4 sm:-left-8 top-12 bg-white rounded-2xl shadow-xl p-4 w-44 animate-float">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">ROAS</span>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">4.8x</p>
                <MiniSparkline color="#FF4D00" height={30} />
              </div>

              {/* Floating Conversions card */}
              <div className="absolute -right-4 sm:-right-8 bottom-16 bg-white rounded-2xl shadow-xl p-4 w-44 animate-float-slow" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Target className="w-4 h-4 text-[#7C3AED]" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Conversions</span>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">+186%</p>
                <MiniSparkline color="#7C3AED" height={30} points={[5, 8, 6, 12, 15, 13, 20, 24]} />
              </div>

              {/* Floating Ad Spend card */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 rounded-2xl shadow-xl p-4 w-48 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase">Monthly Spend</span>
                  </div>
                </div>
                <p className="text-xl font-extrabold text-white mt-1">{settings.monthly_ad_spend}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function CredItem({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-extrabold font-display text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>);

}

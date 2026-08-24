import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import PerformanceChart from "@/components/charts/PerformanceChart";
import DataFlow from "@/components/charts/DataFlow";
import Funnel from "@/components/charts/Funnel";
import { TrendingUp, ArrowRight, BarChart3, Network } from "lucide-react";
import { useCMSPage } from "@/hooks/useCMSPage";

const SECTIONS = [
  {
    eyebrow: "Google Ads",
    title: "Google Ads That Focus on Business Growth",
    services: ["Search", "Shopping", "Performance Max"],
    description: "Campaigns built around your business goals — not just clicks. From structure and targeting to continuous optimization and scaling.",
    cta: { label: "Explore Google Ads Services", to: "/services/google-ads-management" },
    visual: "chart",
  },
  {
    eyebrow: "Tracking & Measurement",
    title: "Know Exactly What Your Marketing Is Doing",
    services: ["GA4", "GTM", "Conversion Tracking", "Server-Side Tracking"],
    description: "Build accurate measurement systems so every decision is backed by reliable data — not guesswork.",
    cta: { label: "Explore Tracking Services", to: "/services/conversion-tracking" },
    visual: "dataflow",
  },
  {
    eyebrow: "Conversion Optimization",
    title: "Turn More Traffic Into More Customers",
    services: ["Landing Pages", "Funnels", "CRO"],
    description: "Improve the user journey from click to conversion. Better pages, better funnels, better results.",
    cta: { label: "Improve Your Conversion Rate", to: "/services/landing-page-optimization" },
    visual: "funnel",
  },
  {
    eyebrow: "Growth Strategy",
    title: "Build a Connected Growth Strategy",
    services: ["Google Ads", "Meta Ads", "Data", "Optimization"],
    description: "Connect advertising, data, conversion optimization, and business goals into one cohesive growth engine.",
    cta: { label: "Let's Build Your Strategy", to: "/services/growth-strategy" },
    visual: "ecosystem",
  },
];

export default function FeaturedSections() {
  const { content } = useCMSPage("home");
  const sections = content.featured_sections?.length ? content.featured_sections : SECTIONS;
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
        {sections.map((section, i) => (
          <FeaturedSection key={i} section={section} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function FeaturedSection({ section, reverse }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:grid-flow-dense" : ""}`}>
      {/* Copy */}
      <Reveal className={reverse ? "lg:col-start-2" : ""}>
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          {section.eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-[1.15]">
          {section.title}
        </h2>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed">{section.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {section.services.map((s) => (
            <span key={s} className="px-4 py-2 rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <CTAButton to={section.cta.to} variant="secondary" size="lg">
            {section.cta.label}
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </div>
      </Reveal>

      {/* Visual */}
      <Reveal delay={100} className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
        <SectionVisual type={section.visual} />
      </Reveal>
    </div>
  );
}

function SectionVisual({ type }) {
  if (type === "chart") {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-slate-900">Campaign Performance</span>
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
        </div>
        <PerformanceChart color="#FF4D00" color2="#FF8E72" height={180} />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[["Clicks", "12.4K"], ["Conv.", "486"], ["ROAS", "4.8x"]].map(([label, val]) => (
            <div key={label} className="text-center p-3 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-lg font-bold text-slate-900">{val}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">Illustrative visualization</p>
      </div>
    );
  }
  if (type === "dataflow") {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-10">
        <DataFlow />
        <p className="text-xs text-slate-400 mt-6 text-center">Illustrative data flow diagram</p>
      </div>
    );
  }
  if (type === "funnel") {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-10">
        <Funnel />
        <p className="text-xs text-slate-400 mt-6 text-center">Illustrative conversion funnel</p>
      </div>
    );
  }
  // ecosystem
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-10">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF4D00] to-[#7C3AED] flex items-center justify-center">
          <Network className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Google Ads", "Meta Ads", "GA4 & GTM", "Landing Pages", "Server-Side", "CRO"].map((s, i) => (
          <div key={s} className="p-4 rounded-xl bg-slate-50 text-center">
            <div className="w-8 h-8 rounded-lg bg-white mx-auto mb-2 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-slate-700">{s}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-6 text-center">Illustrative connected ecosystem</p>
    </div>
  );
}

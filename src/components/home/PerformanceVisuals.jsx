import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import PerformanceChart from "@/components/charts/PerformanceChart";
import Funnel from "@/components/charts/Funnel";
import { BarChart3, TrendingDown, TrendingUp, DollarSign, PieChart, Activity } from "lucide-react";

const VISUALS = [
  {
    icon: TrendingUp,
    label: "ROAS Growth",
    color: "#FF4D00",
    color2: "#FF8E72",
    points: [20, 30, 25, 40, 38, 55, 50, 70, 65, 85, 80, 100],
    stat: "4.8x",
    statLabel: "Return on ad spend",
  },
  {
    icon: TrendingDown,
    label: "Cost per Conversion",
    color: "#7C3AED",
    color2: "#EC4899",
    points: [100, 85, 90, 75, 70, 60, 55, 45, 40, 35, 30, 25],
    stat: "-62%",
    statLabel: "Cost reduction",
  },
  {
    icon: Activity,
    label: "Conversion Increase",
    color: "#EC4899",
    color2: "#7C3AED",
    points: [15, 20, 18, 28, 35, 32, 45, 52, 48, 65, 72, 88],
    stat: "+186%",
    statLabel: "More conversions",
  },
];

export default function PerformanceVisuals() {
  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <SectionHeader
            eyebrow="Data-Driven"
            title="Marketing Decisions Should Be Backed by Data."
            subtitle="Every campaign, every optimization, every dollar — measured, analyzed, and improved. These are illustrative visualizations of the metrics that matter."
            light
          />
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {VISUALS.map((v, i) => (
            <Reveal key={v.label} delay={i * 100}>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-white">{v.label}</span>
                </div>
                <PerformanceChart color={v.color} color2={v.color2} height={120} points={v.points} />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white font-display">{v.stat}</span>
                  <span className="text-sm text-slate-400">{v.statLabel}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">Spend Allocation by Channel</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Google Search", pct: 45, color: "#FF4D00" },
                  { label: "Meta Ads", pct: 30, color: "#7C3AED" },
                  { label: "Shopping / PMax", pct: 15, color: "#EC4899" },
                  { label: "Display / Retargeting", pct: 10, color: "#FF8E72" },
                ].map((c) => (
                  <div key={c.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{c.label}</span>
                      <span className="font-bold text-white">{c.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">Conversion Funnel</span>
              </div>
              <Funnel />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <p className="text-center text-sm text-slate-400">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Illustrative visualizations — real metrics come from actual case studies managed in the CMS.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

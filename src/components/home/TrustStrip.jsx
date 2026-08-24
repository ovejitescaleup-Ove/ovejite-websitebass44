import { TrendingUp, Target, BarChart3, Zap } from "lucide-react";
import { useCMSPage } from "@/hooks/useCMSPage";

const ITEMS = [
  { icon: TrendingUp, label: "Performance Marketing" },
  { icon: Target, label: "Data-Driven Strategy" },
  { icon: BarChart3, label: "Conversion Tracking" },
  { icon: Zap, label: "Growth Optimization" },
];

const PLATFORMS = ["Google Ads", "Google Analytics", "GTM", "Meta", "Shopify"];

export default function TrustStrip() {
  const { content } = useCMSPage("home");
  const items = (content.trust_items || []).map((label, i) => ({ icon: [TrendingUp, Target, BarChart3, Zap][i % 4], label }));
  const platforms = content.platforms || PLATFORMS;

  return (
    <section className="py-10 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {(items.length ? items : ITEMS).map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-600">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {platforms.map((p) => (
              <span key={p} className="text-sm font-bold text-slate-400">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

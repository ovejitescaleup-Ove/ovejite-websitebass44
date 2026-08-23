import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Search, Share2, ShoppingCart, Target, BarChart3, Server, Layout, TrendingUp,
} from "lucide-react";

const ICONS = {
  Search, Share2, ShoppingCart, Target, BarChart3, Server, Layout, TrendingUp,
};

export default function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] || Target;
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative bg-white rounded-2xl border border-slate-100 p-6 hover:border-transparent hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-50/0 to-purple-50/0 group-hover:from-orange-50/50 group-hover:to-purple-50/50 transition-all duration-300 pointer-events-none" />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#7C3AED] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">{service.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{service.short_description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

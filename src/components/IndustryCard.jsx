import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, HeartPulse, MapPin, ShoppingBag } from "lucide-react";

const ICONS = { Stethoscope, HeartPulse, MapPin, ShoppingBag };

export default function IndustryCard({ industry }) {
  const Icon = ICONS[industry?.icon] || Stethoscope;
  return (
    <Link
      to={`/industries/${industry?.slug || "dental"}`}
      className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/20 via-transparent to-[#7C3AED]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 font-display">{industry?.title || "Industry"}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {industry?.description || "Learn how I help businesses in this industry grow."}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 group-hover:gap-2 transition-all">
          Explore <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

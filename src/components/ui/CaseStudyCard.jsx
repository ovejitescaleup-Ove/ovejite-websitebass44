import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

const INDUSTRY_LABELS = {
  dental: "Dental",
  medical: "Medical",
  local_services: "Local Services",
  ecommerce: "E-commerce",
};

export default function CaseStudyCard({ study }) {
  const isPlaceholder = !study || study.title?.includes("Coming Soon");
  return (
    <Link
      to={`/case-studies/${study?.slug || "coming-soon"}`}
      className="group flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {study?.featured_image ? (
          <img src={study.featured_image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
            <Clock className="w-10 h-10 mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider">Screenshot placeholder</span>
          </div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-slate-700">
          {INDUSTRY_LABELS[study?.industry] || study?.industry || "—"}
        </span>
        {isPlaceholder && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500 text-xs font-bold text-white">
            Coming Soon
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{study?.title || "Case Study Coming Soon"}</h3>
        <p className="text-sm text-slate-600 leading-relaxed flex-1">
          {study?.excerpt || "Project details available soon."}
        </p>
        <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
          {isPlaceholder ? "Stay tuned" : "View Case Study"} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

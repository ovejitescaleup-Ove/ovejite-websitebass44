import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";

const CATEGORY_LABELS = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  conversion_tracking: "Conversion Tracking",
  ga4_gtm: "GA4 & GTM",
  case_studies: "Case Studies",
  growth_strategy: "Growth Strategy",
};

const CATEGORY_COLORS = {
  google_ads: "bg-blue-50 text-blue-600",
  meta_ads: "bg-purple-50 text-purple-600",
  conversion_tracking: "bg-orange-50 text-orange-600",
  ga4_gtm: "bg-green-50 text-green-600",
  case_studies: "bg-pink-50 text-pink-600",
  growth_strategy: "bg-indigo-50 text-indigo-600",
};

export default function ResourceCard({ resource }) {
  const date = resource?.publish_date || resource?.created_date;
  return (
    <Link
      to={`/resources/${resource?.slug || "coming-soon"}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-orange-50 to-purple-50 overflow-hidden">
        {resource?.featured_image ? (
          <img src={resource.featured_image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-200 font-display">
              {(resource?.title || "Article").charAt(0)}
            </span>
          </div>
        )}
        {resource?.category && (
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[resource.category] || "bg-slate-100 text-slate-600"}`}>
            {CATEGORY_LABELS[resource.category] || resource.category}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        {date && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <Calendar className="w-3 h-3" />
            {format(new Date(date), "MMM d, yyyy")}
          </div>
        )}
        <h3 className="text-lg font-bold text-slate-900 mb-2 font-display group-hover:text-primary transition-colors">
          {resource?.title || "Article Coming Soon"}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed flex-1">
          {resource?.excerpt || "Content available soon."}
        </p>
        <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
          Read more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

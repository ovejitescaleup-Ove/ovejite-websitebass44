import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search } from "lucide-react";
import Reveal from "@/components/Reveal";
import ResourceCard from "@/components/ResourceCard";
import { FALLBACK_RESOURCES } from "@/lib/siteData";
import { useCMSPage } from "@/hooks/useCMSPage";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Google Ads", value: "google_ads" },
  { label: "Meta Ads", value: "meta_ads" },
  { label: "Conversion Tracking", value: "conversion_tracking" },
  { label: "GA4 & GTM", value: "ga4_gtm" },
  { label: "Case Studies", value: "case_studies" },
  { label: "Growth Strategy", value: "growth_strategy" },
];

export default function Resources() {
  const { content } = useCMSPage("resources");
  const [resources, setResources] = useState(FALLBACK_RESOURCES);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Resource.filter({ published: true }, "-publish_date", 100);
        if (data && data.length > 0) setResources(data);
      } catch (e) {}
    })();
  }, []);

  const filtered = resources.filter((r) => {
    const matchCat = filter === "all" || r.category === filter;
    const matchSearch = !search || r.title?.toLowerCase().includes(search.toLowerCase()) || r.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" /> {content.eyebrow || "Resources"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
              {content.title || "Insights & Resources"}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              {content.subtitle || "Practical guides on Google Ads, Meta Ads, conversion tracking, GA4, and growth strategy."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + filters */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="relative max-w-md mx-auto w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setFilter(c.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    filter === c.value
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-500">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r, i) => (
                <Reveal key={r.slug || r.id || i} delay={i * 50}>
                  <ResourceCard resource={r} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

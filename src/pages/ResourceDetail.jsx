import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { Image } from "@/components/ui/image";
import { format } from "date-fns";

const CATEGORY_LABELS = {
  google_ads: "Google Ads", meta_ads: "Meta Ads", conversion_tracking: "Conversion Tracking",
  ga4_gtm: "GA4 & GTM", case_studies: "Case Studies", growth_strategy: "Growth Strategy",
};

export default function ResourceDetail() {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await base44.entities.Resource.filter({ slug, published: true }, "-publish_date", 1);
        if (results && results.length > 0) setResource(results[0]);
      } catch (e) {}
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Article Coming Soon</h1>
        <p className="text-slate-600 mb-8">This article will be published soon. Check back later!</p>
        <CTAButton to="/resources" variant="secondary" size="lg">Back to Resources</CTAButton>
      </div>
    );
  }

  const date = resource.publish_date || resource.created_date;

  return (
    <article>
      {/* Header */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          {resource.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-xs font-bold text-primary mb-4">
              {CATEGORY_LABELS[resource.category] || resource.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 leading-[1.15]">
            {resource.title}
          </h1>
          {resource.excerpt && <p className="mt-5 text-lg text-slate-600 leading-relaxed">{resource.excerpt}</p>}
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
            {resource.author && (
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {resource.author}</span>
            )}
            {date && (
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(date), "MMMM d, yyyy")}</span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {resource.featured_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100">
            <Image src={resource.featured_image} alt={resource.title} fittingType="fill" className="w-full h-full block" />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-600 leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-orange-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono">
            <ReactMarkdown>{resource.content || resource.excerpt || "Content available soon."}</ReactMarkdown>
          </div>

          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {resource.tags.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-slate-600">#{t}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-purple-50 text-center">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-3">Want help implementing this?</h3>
            <p className="text-slate-600 mb-5">Let's discuss how to apply this to your business.</p>
            <CTAButton to="/contact" size="lg">Get in Touch <ArrowRight className="w-5 h-5" /></CTAButton>
          </div>
        </div>
      </section>
    </article>
  );
}

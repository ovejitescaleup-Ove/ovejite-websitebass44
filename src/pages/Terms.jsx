import Reveal from "@/components/Reveal";
import { useCMSPage } from "@/hooks/useCMSPage";

const FALLBACK = `Terms of Service

Last updated: {{date}}

By using Ovejite.me, you agree to these terms.

## Services

Ovejite provides digital marketing consulting services including Google Ads, Meta Ads, conversion tracking, and growth strategy. Specific deliverables are agreed upon per engagement.

## No Guarantees

While we strive for excellent results, marketing outcomes depend on many factors outside our control. We do not guarantee specific performance metrics.

## Intellectual Property

All content on this site is the property of Ovejite.me. Case studies and resources are provided for informational purposes.

## Contact

For questions about these terms, please reach out through the contact page.`;

function renderContent(text) {
  return String(text || FALLBACK).replace("{{date}}", new Date().toLocaleDateString()).split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
    if (!line.trim()) return <div key={i} className="h-1" />;
    if (i === 0) return <h1 key={i} className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 mb-8">{line}</h1>;
    return <p key={i}>{line}</p>;
  });
}

export default function Terms() {
  const { content } = useCMSPage("terms", { content_markdown: FALLBACK });
  return (
    <div className="pt-32 pb-20 lg:pt-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="space-y-6 text-slate-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:mb-3">
            {renderContent(content.content_markdown)}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

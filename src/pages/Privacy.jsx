import Reveal from "@/components/Reveal";
import { useCMSPage } from "@/hooks/useCMSPage";

const FALLBACK = `Privacy Policy

Last updated: {{date}}

Ovejite.me respects your privacy. This policy explains how we collect, use, and protect your information.

## Information We Collect

When you submit a contact form, we collect the information you provide: name, email, phone, company, website, budget, service interest, and message.

## How We Use Your Information

We use your information to respond to inquiries, provide consulting services, and communicate about marketing strategy. We never sell or share your data with third parties.

## Analytics

We may use Google Analytics, Google Tag Manager, and Meta Pixel to understand website usage. These tools collect anonymous usage data.

## Contact

For privacy questions, please reach out through the contact page.`;

function renderContent(text) {
  return String(text || FALLBACK).replace("{{date}}", new Date().toLocaleDateString()).split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
    if (!line.trim()) return <div key={i} className="h-1" />;
    if (i === 0) return <h1 key={i} className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 mb-8">{line}</h1>;
    return <p key={i}>{line}</p>;
  });
}

export default function Privacy() {
  const { content } = useCMSPage("privacy", { content_markdown: FALLBACK });
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

import Reveal from "@/components/Reveal";

export default function Privacy() {
  return (
    <div className="pt-32 pb-20 lg:pt-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-slate-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:mb-3">
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-slate-600">Ovejite.me respects your privacy. This policy explains how we collect, use, and protect your information.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Information We Collect</h2>
            <p className="text-slate-600">When you submit a contact form, we collect the information you provide: name, email, phone, company, website, budget, service interest, and message.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">How We Use Your Information</h2>
            <p className="text-slate-600">We use your information to respond to inquiries, provide consulting services, and communicate about marketing strategy. We never sell or share your data with third parties.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Analytics</h2>
            <p className="text-slate-600">We may use Google Analytics, Google Tag Manager, and Meta Pixel to understand website usage. These tools collect anonymous usage data.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Contact</h2>
            <p className="text-slate-600">For privacy questions, please reach out through the contact page.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

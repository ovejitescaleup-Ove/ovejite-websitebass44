import Reveal from "@/components/Reveal";

export default function Terms() {
  return (
    <div className="pt-32 pb-20 lg:pt-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 mb-8">Terms of Service</h1>
          <div className="space-y-6 text-slate-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:mb-3">
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-slate-600">By using Ovejite.me, you agree to these terms.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Services</h2>
            <p className="text-slate-600">Ovejite provides digital marketing consulting services including Google Ads, Meta Ads, conversion tracking, and growth strategy. Specific deliverables are agreed upon per engagement.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">No Guarantees</h2>
            <p className="text-slate-600">While we strive for excellent results, marketing outcomes depend on many factors outside our control. We do not guarantee specific performance metrics.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Intellectual Property</h2>
            <p className="text-slate-600">All content on this site is the property of Ovejite.me. Case studies and resources are provided for informational purposes.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Contact</h2>
            <p className="text-slate-600">For questions about these terms, please reach out through the contact page.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

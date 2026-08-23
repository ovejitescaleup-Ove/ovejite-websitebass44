import Reveal from "@/components/Reveal";
import { Search, Ruler, Wrench, Gauge, Rocket } from "lucide-react";

const STEPS = [
  { num: "01", icon: Search, title: "Understand", desc: "Learn about the business, goals, customers, and current marketing." },
  { num: "02", icon: Ruler, title: "Measure", desc: "Build or improve tracking so decisions are based on accurate data." },
  { num: "03", icon: Wrench, title: "Build", desc: "Create the campaign strategy, structure, targeting, and conversion system." },
  { num: "04", icon: Gauge, title: "Optimize", desc: "Analyze performance and continuously improve efficiency." },
  { num: "05", icon: Rocket, title: "Scale", desc: "Increase what works while protecting profitability." },
];

export default function Process() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" />
              The Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 leading-[1.1]">
              How I Approach Growth
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              A structured, repeatable process that turns data into decisions and decisions into growth.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-purple-200 to-pink-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="relative text-center lg:text-left">
                  <div className="relative inline-flex lg:flex lg:justify-start mb-5">
                    <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 shadow-lg flex items-center justify-center relative z-10 group hover:border-primary hover:shadow-xl hover:shadow-orange-500/10 transition-all">
                      <step.icon className="w-9 h-9 text-primary" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#7C3AED] text-white text-xs font-bold flex items-center justify-center">
                        {step.num}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

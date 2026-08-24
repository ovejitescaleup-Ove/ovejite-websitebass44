import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Image } from "@/components/ui/image";
import { useCMSPage } from "@/hooks/useCMSPage";

export default function AboutPreview() {
  const { settings } = useSiteSettings();
  const { content } = useCMSPage("home");
  const aboutImage = "https://media.base44.com/images/public/6a8b03e54d231ed531b97b43/cdcec4297_generated_6004dbcc.png";

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-orange-100 to-purple-100 shadow-xl">
                <Image
                  src={settings.profile_photo || aboutImage}
                  alt="Ovejite — performance marketing specialist"
                  fittingType="fill"
                  className="w-full h-full block"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[200px] hidden sm:block">
                <p className="text-3xl font-extrabold font-display text-primary">{settings.years_experience}</p>
                <p className="text-sm text-slate-600">Years in performance marketing</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" />
              About
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 leading-[1.1]">
              {content.about_title || "Meet the Marketer Behind the Strategy."}
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              {settings.short_bio || "I'm a performance-focused digital marketer specializing in Google Ads, Meta Ads, conversion tracking, and growth strategy. I help businesses understand, improve, and scale their marketing through better advertising strategy, accurate tracking, and continuous optimization."}
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {content.about_paragraph || "My approach connects advertising, data, and conversion optimization — because advertising works better when strategy, tracking, and conversion are connected."}
            </p>
            <div className="mt-8">
              <CTAButton to="/about" variant="secondary" size="lg">
                {content.about_cta || "Learn More About Me"}
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

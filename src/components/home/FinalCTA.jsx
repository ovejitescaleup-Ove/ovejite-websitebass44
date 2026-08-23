import { Calendar, MessageCircle, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings, buildWhatsAppUrl, trackEvent } from "@/hooks/useSiteSettings";

export default function FinalCTA() {
  const { settings } = useSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-gradient-to-br from-[#FF4D00] via-[#FF8E72] to-[#7C3AED] px-6 py-16 lg:px-16 lg:py-24 text-center">
            {/* Decorative orbs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display text-white leading-[1.1]">
                Let's Talk About Better Results.
              </h2>
              <p className="mt-6 text-lg lg:text-xl text-white/90 leading-relaxed">
                If you're looking to improve your paid advertising, fix your conversion tracking, or build a stronger growth strategy, let's start with a conversation.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  to={settings.booking_url || "/contact"}
                  variant="white"
                  size="lg"
                  eventName="consultation_click"
                  eventParams={{ location: "final_cta" }}
                >
                  <Calendar className="w-5 h-5" />
                  Book a Call
                </CTAButton>
                {settings.whatsapp_number && (
                  <CTAButton
                    href={whatsappUrl}
                    variant="whatsapp"
                    size="lg"
                    eventName="whatsapp_click"
                    eventParams={{ location: "final_cta" }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Me
                  </CTAButton>
                )}
                {settings.email && (
                  <CTAButton
                    href={`mailto:${settings.email}`}
                    variant="ghostLight"
                    size="lg"
                    eventName="email_click"
                    eventParams={{ location: "final_cta" }}
                  >
                    <Mail className="w-5 h-5" />
                    Send an Email
                  </CTAButton>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Mail, MessageCircle, Calendar, Clock, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CTAButton from "@/components/CTAButton";
import { useSiteSettings, buildWhatsAppUrl } from "@/hooks/useSiteSettings";

export default function Contact() {
  const { settings } = useSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary" /> Contact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 leading-[1.05]">
              Let's Start a Conversation
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              Tell me about your business and your goals. I'll get back to you within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <Reveal className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-10">
                <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">Send a Message</h2>
                <ContactForm source="contact_page" />
              </div>
            </Reveal>

            {/* Info sidebar */}
            <Reveal delay={100}>
              <div className="space-y-4">
                {settings.email && (
                  <ContactInfoCard icon={Mail} label="Email" value={settings.email} href={`mailto:${settings.email}`} color="orange" />
                )}
                {settings.whatsapp_number && (
                  <ContactInfoCard icon={MessageCircle} label="WhatsApp" value="Chat with me" href={whatsappUrl} color="green" />
                )}
                <ContactInfoCard icon={Calendar} label="Book a Call" value="Schedule a free consultation" href={settings.booking_url || "/contact"} color="purple" />
                <ContactInfoCard icon={Clock} label="Response Time" value="Within 24 hours" color="slate" />
                <ContactInfoCard icon={MapPin} label="Working With" value="Local & e-commerce brands worldwide" color="slate" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfoCard({ icon: Icon, label, value, href, color }) {
  const colors = {
    orange: "bg-orange-50 text-primary",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-[#7C3AED]",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-base font-bold text-slate-900">{value}</p>
      </div>
    </a>
  );
}

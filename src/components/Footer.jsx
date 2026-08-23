import { Link } from "react-router-dom";
import { Mail, MessageCircle, Linkedin, Twitter, Instagram, Facebook, ArrowRight } from "lucide-react";
import { useSiteSettings, buildWhatsAppUrl } from "@/hooks/useSiteSettings";

export default function Footer() {
  const { settings } = useSiteSettings();

  const socials = [
    { icon: Linkedin, url: settings.linkedin, label: "LinkedIn" },
    { icon: Twitter, url: settings.twitter, label: "Twitter" },
    { icon: Instagram, url: settings.instagram, label: "Instagram" },
    { icon: Facebook, url: settings.facebook, label: "Facebook" },
  ].filter((s) => s.url);

  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 mb-5">
              <span className="text-2xl font-extrabold font-display text-white">Ovejite</span>
              <span className="text-2xl font-extrabold text-primary">.</span>
              <span className="text-sm font-semibold text-slate-500">me</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Performance marketing specialist helping businesses grow through smarter advertising, accurate tracking, and continuous optimization.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Navigate</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/industries">Industries</FooterLink>
              <FooterLink to="/case-studies">Case Studies</FooterLink>
              <FooterLink to="/resources">Resources</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/services/google-ads-management">Google Ads Management</FooterLink>
              <FooterLink to="/services/meta-ads">Meta Ads</FooterLink>
              <FooterLink to="/services/conversion-tracking">Conversion Tracking</FooterLink>
              <FooterLink to="/services/ga4-gtm-setup">GA4 & GTM Setup</FooterLink>
              <FooterLink to="/services/growth-strategy">Growth Strategy</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.whatsapp_number && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            <Link
              to={settings.booking_url || "/contact"}
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Book a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Ovejite.me — All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-slate-400 hover:text-primary transition-colors">
        {children}
      </Link>
    </li>
  );
}

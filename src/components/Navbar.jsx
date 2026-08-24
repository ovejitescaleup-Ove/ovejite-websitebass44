import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle, Calendar } from "lucide-react";
import CTAButton from "./CTAButton";
import { useSiteSettings, trackEvent } from "@/hooks/useSiteSettings";
import { base44 } from "@/api/base44Client";

const SERVICES = [
  { label: "Google Ads Management", slug: "google-ads-management", icon: "Search" },
  { label: "Meta Ads", slug: "meta-ads", icon: "Share2" },
  { label: "E-commerce Growth", slug: "ecommerce-growth", icon: "ShoppingCart" },
  { label: "Conversion Tracking", slug: "conversion-tracking", icon: "Target" },
  { label: "GA4 & GTM Setup", slug: "ga4-gtm-setup", icon: "BarChart3" },
  { label: "Server-Side Tracking", slug: "server-side-tracking", icon: "Server" },
  { label: "Landing Page Optimization", slug: "landing-page-optimization", icon: "Layout" },
  { label: "Growth Strategy", slug: "growth-strategy", icon: "TrendingUp" },
];

const INDUSTRIES = [
  { label: "Dental", slug: "dental", icon: "Stethoscope" },
  { label: "Medical", slug: "medical", icon: "HeartPulse" },
  { label: "Local Services", slug: "local-services", icon: "MapPin" },
  { label: "E-commerce", slug: "ecommerce", icon: "ShoppingBag" },
];

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [services, setServices] = useState(SERVICES);
  const [industries, setIndustries] = useState(INDUSTRIES);

  useEffect(() => {
    (async () => {
      try {
        const [serviceRows, industryRows] = await Promise.all([
          base44.entities.Service.list("display_order", 50),
          base44.entities.Industry.list("display_order", 50),
        ]);
        if (serviceRows?.length) setServices(serviceRows.map((s) => ({ label: s.title, slug: s.slug, icon: s.icon })));
        if (industryRows?.length) setIndustries(industryRows.map((i) => ({ label: i.title, slug: i.slug, icon: i.icon })));
      } catch (_) {}
    })();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const bookingUrl = settings.booking_url || "#contact";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-200/60" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group" onClick={() => setMobileOpen(false)}>
              <span className="text-2xl font-extrabold font-display tracking-tight text-slate-900">
                Ovejite
              </span>
              <span className="text-2xl font-extrabold text-primary">.</span>
              <span className="text-sm font-semibold text-slate-500 hidden sm:inline">me</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/about">About</NavLink>

              {/* Services dropdown */}
              <DropdownNavItem
                label="Services"
                items={services}
                basePath="/services"
                isOpen={openDropdown === "services"}
                onEnter={() => setOpenDropdown("services")}
                onLeave={() => setOpenDropdown(null)}
              />

              {/* Industries dropdown */}
              <DropdownNavItem
                label="Industries"
                items={industries}
                basePath="/industries"
                isOpen={openDropdown === "industries"}
                onEnter={() => setOpenDropdown("industries")}
                onLeave={() => setOpenDropdown(null)}
              />

              <NavLink to="/case-studies">Case Studies</NavLink>
              <NavLink to="/resources">Resources</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <CTAButton to={bookingUrl} size="sm" eventName="consultation_click" eventParams={{ location: "navbar" }}>
                <Calendar className="w-4 h-4" />
                Book a Free Consultation
              </CTAButton>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-slate-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white pt-20 overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
            <MobileAccordion label="Services" items={services} basePath="/services" onNavigate={() => setMobileOpen(false)} />
            <MobileAccordion label="Industries" items={industries} basePath="/industries" onNavigate={() => setMobileOpen(false)} />
            <MobileLink to="/case-studies" onClick={() => setMobileOpen(false)}>Case Studies</MobileLink>
            <MobileLink to="/resources" onClick={() => setMobileOpen(false)}>Resources</MobileLink>
            <MobileLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
            <div className="pt-4 space-y-3">
              <CTAButton to={bookingUrl} size="md" className="w-full" eventName="consultation_click" eventParams={{ location: "mobile_nav" }}>
                <Calendar className="w-4 h-4" />
                Book a Free Consultation
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors rounded-lg"
    >
      {children}
    </Link>
  );
}

function DropdownNavItem({ label, items, basePath, isOpen, onEnter, onLeave }) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors flex items-center gap-1 rounded-lg"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 w-80">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 grid grid-cols-1 gap-1 animate-fade-in-up">
            {items.map((item) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-50 to-purple-50 flex items-center justify-center text-primary group-hover:from-orange-100 group-hover:to-purple-100 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#7C3AED]" />
                </span>
                <span className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
            <Link to={basePath} className="mt-1 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-orange-50 rounded-xl transition-colors">
              View all {label.toLowerCase()} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="block px-4 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">
      {children}
    </Link>
  );
}

function MobileAccordion({ label, items, basePath, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full flex items-center justify-between px-4 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pl-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`${basePath}/${item.slug}`}
              onClick={onNavigate}
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-primary rounded-lg"
            >
              {item.label}
            </Link>
          ))}
          <Link to={basePath} onClick={onNavigate} className="block px-4 py-2.5 text-sm font-semibold text-primary rounded-lg">
            View all →
          </Link>
        </div>
      )}
    </div>
  );
}

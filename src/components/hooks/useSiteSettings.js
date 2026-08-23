import { useEffect, useState } from "react";

/**
 * useSiteSettings — loads the single SiteSetting record (the CMS-driven
 * global config). Returns a sensible fallback until the record exists so
 * the public site always renders, then swaps in backend values once loaded.
 */
const FALLBACK = {
  name: "Ovejite",
  title: "Performance Marketing Specialist",
  short_bio: "I help businesses grow through smarter advertising, accurate tracking, and continuous optimization.",
  profile_photo: "",
  email: "hello@ovejite.me",
  whatsapp_number: "",
  whatsapp_message: "Hi Ovejite, I would like to discuss my marketing strategy.",
  booking_url: "#contact",
  linkedin: "",
  twitter: "",
  instagram: "",
  facebook: "",
  monthly_ad_spend: "$3.6M+",
  projects_count: "50+",
  years_experience: "8+",
  seo_title: "Ovejite — Smarter Digital Marketing",
  meta_description: "Performance marketing specialist in Google Ads, Meta Ads, conversion tracking, and growth strategy.",
  gtm_id: "",
  ga4_id: "",
  meta_pixel_id: "",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { base44 } = await import("@/api/base44Client");
        const list = await base44.entities.SiteSetting.list();
        if (mounted && list && list.length > 0) {
          setSettings({ ...FALLBACK, ...list[0] });
        }
      } catch (e) {
        // keep fallback — site still renders
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { settings, loading };
}

/** Build a WhatsApp deep link from a raw number + message. */
export function buildWhatsAppUrl(number, message) {
  const cleaned = (number || "").replace(/[^0-9]/g, "");
  const msg = encodeURIComponent(message || "");
  return `https://wa.me/${cleaned}${msg ? `?text=${msg}` : ""}`;
}

/** Track a conversion event (GTM/GA4/Meta Pixel ready). */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined") {
    if (window.dataLayer) window.dataLayer.push({ event: eventName, ...params });
    if (window.fbq) window.fbq("trackCustom", eventName, params);
    if (window.gtag) window.gtag("event", eventName, params);
  }
}

/**
 * Fallback content used across the public site so it always looks complete,
 * even before the admin populates the CMS. Backend data replaces these
 * automatically once records exist.
 */

export const FALLBACK_SERVICES = [
  { title: "Google Ads Management", slug: "google-ads-management", short_description: "Search, Shopping, Performance Max, optimization, scaling, and strategy.", icon: "Search", display_order: 1 },
  { title: "Meta Ads", slug: "meta-ads", short_description: "Campaign strategy, audience testing, creative optimization, and performance analysis.", icon: "Share2", display_order: 2 },
  { title: "E-commerce Growth", slug: "ecommerce-growth", short_description: "Build stronger acquisition systems designed to generate profitable growth.", icon: "ShoppingCart", display_order: 3 },
  { title: "Conversion Tracking", slug: "conversion-tracking", short_description: "Know exactly what happens after someone clicks your ads.", icon: "Target", display_order: 4 },
  { title: "GA4 & GTM Setup", slug: "ga4-gtm-setup", short_description: "Build accurate measurement systems for better decisions.", icon: "BarChart3", display_order: 5 },
  { title: "Server-Side Tracking", slug: "server-side-tracking", short_description: "Improve data reliability and strengthen your marketing measurement infrastructure.", icon: "Server", display_order: 6 },
  { title: "Landing Page Optimization", slug: "landing-page-optimization", short_description: "Improve the user journey and increase the chances of conversion.", icon: "Layout", display_order: 7 },
  { title: "Growth Strategy", slug: "growth-strategy", short_description: "Connect advertising, data, conversion optimization, and business goals.", icon: "TrendingUp", display_order: 8 },
];

export const FALLBACK_INDUSTRIES = [
  { title: "Dental", slug: "dental", icon: "Stethoscope", description: "Lead generation, appointment tracking, search campaigns, and local targeting.", display_order: 1 },
  { title: "Medical", slug: "medical", icon: "HeartPulse", description: "Qualified leads, compliance-aware advertising, conversion tracking, and patient acquisition.", display_order: 2 },
  { title: "Local Services", slug: "local-services", icon: "MapPin", description: "Calls, form leads, local search advertising, and service-area targeting.", display_order: 3 },
  { title: "E-commerce", slug: "ecommerce", icon: "ShoppingBag", description: "Shopping campaigns, Performance Max, product feeds, ROAS, and customer acquisition.", display_order: 4 },
];

export const FALLBACK_CASE_STUDIES = [
  { title: "Case Study Coming Soon", slug: "coming-soon-dental", industry: "dental", excerpt: "Project details available soon. Real strategy, metrics, and results will be published here.", featured: true },
  { title: "Case Study Coming Soon", slug: "coming-soon-medical", industry: "medical", excerpt: "Project details available soon. Real strategy, metrics, and results will be published here.", featured: true },
  { title: "Case Study Coming Soon", slug: "coming-soon-ecommerce", industry: "ecommerce", excerpt: "Project details available soon. Real strategy, metrics, and results will be published here.", featured: true },
];

export const FALLBACK_RESOURCES = [
  { title: "Understanding GA4: A Beginner's Guide", slug: "understanding-ga4", category: "ga4_gtm", excerpt: "Learn the fundamentals of Google Analytics 4 and how to set it up for accurate measurement.", featured: true, publish_date: new Date().toISOString() },
  { title: "5 Google Ads Mistakes Killing Your ROAS", slug: "google-ads-mistakes", category: "google_ads", excerpt: "Common pitfalls in Google Ads campaigns and how to fix them for better returns.", featured: true, publish_date: new Date().toISOString() },
  { title: "Server-Side Tracking: Why It Matters Now", slug: "server-side-tracking-guide", category: "conversion_tracking", excerpt: "How server-side tracking improves data reliability in a privacy-first world.", featured: true, publish_date: new Date().toISOString() },
];

export const SERVICE_LIST = [
  "Google Ads Management", "Meta Ads", "E-commerce Growth", "Conversion Tracking",
  "GA4 & GTM Setup", "Server-Side Tracking", "Landing Page Optimization", "Growth Strategy",
];

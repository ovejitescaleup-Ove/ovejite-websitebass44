-- OVEJITE CMS SETUP
-- Requires Supabase Auth. Admin write access is granted only to
-- authenticated users whose JWT app_metadata.role = 'admin'.

create extension if not exists pgcrypto;

create table if not exists public.cms_records (
  id uuid primary key default gen_random_uuid(),
  entity text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_records_entity_idx on public.cms_records(entity);
create index if not exists cms_records_slug_idx on public.cms_records((data->>'slug'));

create or replace function public.cms_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cms_records_updated_at on public.cms_records;
create trigger cms_records_updated_at
before update on public.cms_records
for each row execute function public.cms_set_updated_at();

alter table public.cms_records enable row level security;

drop policy if exists "Public can read published CMS records" on public.cms_records;
create policy "Public can read published CMS records"
on public.cms_records for select
to anon, authenticated
using (
  coalesce((data->>'published')::boolean, true) = true
);

drop policy if exists "Admins can read all CMS records" on public.cms_records;
create policy "Admins can read all CMS records"
on public.cms_records for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can create CMS records" on public.cms_records;
create policy "Admins can create CMS records"
on public.cms_records for insert
to authenticated
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update CMS records" on public.cms_records;
create policy "Admins can update CMS records"
on public.cms_records for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete CMS records" on public.cms_records;
create policy "Admins can delete CMS records"
on public.cms_records for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- Legacy content from the current project.
-- Inserts only when the slug is not already present.

insert into public.cms_records(entity, data)
select 'Service', v.data
from (values
  ('{"title":"Google Ads Management","slug":"google-ads-management","short_description":"Search, Shopping, Performance Max, optimization, scaling, and strategy.","icon":"Search","display_order":1,"published":true}'::jsonb),
  ('{"title":"Meta Ads","slug":"meta-ads","short_description":"Campaign strategy, audience testing, creative optimization, and performance analysis.","icon":"Share2","display_order":2,"published":true}'::jsonb),
  ('{"title":"E-commerce Growth","slug":"ecommerce-growth","short_description":"Build stronger acquisition systems designed to generate profitable growth.","icon":"ShoppingCart","display_order":3,"published":true}'::jsonb),
  ('{"title":"Conversion Tracking","slug":"conversion-tracking","short_description":"Know exactly what happens after someone clicks your ads.","icon":"Target","display_order":4,"published":true}'::jsonb),
  ('{"title":"GA4 & GTM Setup","slug":"ga4-gtm-setup","short_description":"Build accurate measurement systems for better decisions.","icon":"BarChart3","display_order":5,"published":true}'::jsonb),
  ('{"title":"Server-Side Tracking","slug":"server-side-tracking","short_description":"Improve data reliability and strengthen your marketing measurement infrastructure.","icon":"Server","display_order":6,"published":true}'::jsonb),
  ('{"title":"Landing Page Optimization","slug":"landing-page-optimization","short_description":"Improve the user journey and increase the chances of conversion.","icon":"Layout","display_order":7,"published":true}'::jsonb),
  ('{"title":"Growth Strategy","slug":"growth-strategy","short_description":"Connect advertising, data, conversion optimization, and business goals.","icon":"TrendingUp","display_order":8,"published":true}'::jsonb)
) v(data)
where not exists (
  select 1 from public.cms_records c
  where c.entity='Service' and c.data->>'slug'=v.data->>'slug'
);

insert into public.cms_records(entity, data)
select 'Industry', v.data
from (values
  ('{"title":"Dental","slug":"dental","icon":"Stethoscope","description":"Lead generation, appointment tracking, search campaigns, and local targeting.","display_order":1,"published":true}'::jsonb),
  ('{"title":"Medical","slug":"medical","icon":"HeartPulse","description":"Qualified leads, compliance-aware advertising, conversion tracking, and patient acquisition.","display_order":2,"published":true}'::jsonb),
  ('{"title":"Local Services","slug":"local-services","icon":"MapPin","description":"Calls, form leads, local search advertising, and service-area targeting.","display_order":3,"published":true}'::jsonb),
  ('{"title":"E-commerce","slug":"ecommerce","icon":"ShoppingBag","description":"Shopping campaigns, Performance Max, product feeds, ROAS, and customer acquisition.","display_order":4,"published":true}'::jsonb)
) v(data)
where not exists (
  select 1 from public.cms_records c
  where c.entity='Industry' and c.data->>'slug'=v.data->>'slug'
);

insert into public.cms_records(entity, data)
select 'CaseStudy', v.data
from (values
  ('{"title":"Case Study Coming Soon","slug":"coming-soon-dental","industry":"dental","excerpt":"Project details available soon. Real strategy, metrics, and results will be published here.","featured":true,"published":true}'::jsonb),
  ('{"title":"Case Study Coming Soon","slug":"coming-soon-medical","industry":"medical","excerpt":"Project details available soon. Real strategy, metrics, and results will be published here.","featured":true,"published":true}'::jsonb),
  ('{"title":"Case Study Coming Soon","slug":"coming-soon-ecommerce","industry":"ecommerce","excerpt":"Project details available soon. Real strategy, metrics, and results will be published here.","featured":true,"published":true}'::jsonb)
) v(data)
where not exists (
  select 1 from public.cms_records c
  where c.entity='CaseStudy' and c.data->>'slug'=v.data->>'slug'
);

insert into public.cms_records(entity, data)
select 'Resource', v.data
from (values
  ('{"title":"Understanding GA4: A Beginner''s Guide","slug":"understanding-ga4","category":"ga4_gtm","excerpt":"Learn the fundamentals of Google Analytics 4 and how to set it up for accurate measurement.","featured":true,"published":true}'::jsonb),
  ('{"title":"5 Google Ads Mistakes Killing Your ROAS","slug":"google-ads-mistakes","category":"google_ads","excerpt":"Common pitfalls in Google Ads campaigns and how to fix them for better returns.","featured":true,"published":true}'::jsonb),
  ('{"title":"Server-Side Tracking: Why It Matters Now","slug":"server-side-tracking-guide","category":"conversion_tracking","excerpt":"How server-side tracking improves data reliability in a privacy-first world.","featured":true,"published":true}'::jsonb)
) v(data)
where not exists (
  select 1 from public.cms_records c
  where c.entity='Resource' and c.data->>'slug'=v.data->>'slug'
);

-- Global settings.
insert into public.cms_records(entity, data)
select 'SiteSetting', '{
  "name":"Ovejite",
  "title":"Performance Marketing Specialist",
  "short_bio":"I help businesses grow through smarter advertising, accurate tracking, and continuous optimization.",
  "email":"hello@ovejite.me",
  "whatsapp_message":"Hi Ovejite, I would like to discuss my marketing strategy.",
  "booking_url":"/contact",
  "monthly_ad_spend":"$3.6M+",
  "projects_count":"50+",
  "years_experience":"8+",
  "seo_title":"Ovejite — Smarter Digital Marketing",
  "meta_description":"Performance marketing specialist in Google Ads, Meta Ads, conversion tracking, and growth strategy."
}'::jsonb
where not exists (select 1 from public.cms_records where entity='SiteSetting');


-- Website page defaults. These are editable from /admin/pages.
insert into public.cms_records(entity, data)
select 'Page', jsonb_build_object(
  'slug', v.slug,
  'title', v.title,
  'published', true,
  'seo_title', v.seo_title,
  'meta_description', v.meta_description,
  'content', v.content
)
from (values
(
  'home',
  'Home Page',
  'Ovejite — Smarter Digital Marketing',
  'Performance marketing specialist in Google Ads, Meta Ads, conversion tracking, and growth strategy.',
  '{
    "hero_badge":"Performance Marketing Specialist",
    "hero_title_before":"Let''s Grow Your Business Through",
    "hero_title_highlight":"Smarter Digital Marketing.",
    "hero_description":"Google Ads, Meta Ads, Conversion Tracking & Growth Strategy designed around measurable business results.",
    "hero_primary_cta":"Book a Free Consultation",
    "hero_secondary_cta":"View My Work",
    "roas":"4.8x",
    "conversions":"+186%",
    "trust_items":["Performance Marketing","Data-Driven Strategy","Conversion Tracking","Growth Optimization"],
    "platforms":["Google Ads","Google Analytics","GTM","Meta","Shopify"],
    "credibility_eyebrow":"Ready to grow?",
    "credibility_title":"Ready to Improve Your Marketing Performance?",
    "credibility_description":"Whether you''re scaling ad spend, fixing conversion tracking, or building a growth strategy from scratch — it starts with understanding what''s working and what isn''t.",
    "credibility_cta":"Let''s Discuss Your Growth Strategy",
    "services_eyebrow":"What I Do",
    "services_title":"How I Help Businesses Grow",
    "services_subtitle":"From advertising strategy to conversion tracking to continuous optimization — every service is built around measurable business outcomes.",
    "services_cta":"Explore All Services",
    "performance_eyebrow":"Data-Driven",
    "performance_title":"Marketing Decisions Should Be Backed by Data.",
    "performance_subtitle":"Every campaign, every optimization, every dollar — measured, analyzed, and improved. These are illustrative visualizations of the metrics that matter.",
    "industries_eyebrow":"Industries",
    "industries_title":"Built for Your Industry",
    "industries_subtitle":"Different industries need different strategies. Here''s how I approach the ones I work with most.",
    "industries_cta":"Explore All Industries",
    "case_studies_eyebrow":"Proof",
    "case_studies_title":"Real Work. Real Strategy. Real Growth.",
    "case_studies_subtitle":"Case studies showing the strategy, tracking, and optimization behind real results. New projects added as they''re completed.",
    "case_studies_cta":"View All Case Studies",
    "process_eyebrow":"The Process",
    "process_title":"How I Approach Growth",
    "process_subtitle":"A structured, repeatable process that turns data into decisions and decisions into growth.",
    "about_title":"Meet the Marketer Behind the Strategy.",
    "about_paragraph":"My approach connects advertising, data, and conversion optimization — because advertising works better when strategy, tracking, and conversion are connected.",
    "about_cta":"Learn More About Me",
    "resources_eyebrow":"Insights & Resources",
    "resources_title":"Insights & Resources",
    "resources_subtitle":"Practical guides on Google Ads, Meta Ads, conversion tracking, GA4, and growth strategy — written for marketers and business owners who want to make better decisions.",
    "resources_cta":"Explore All Resources",
    "final_title":"Let''s Talk About Better Results.",
    "final_description":"If you''re looking to improve your paid advertising, fix your conversion tracking, or build a stronger growth strategy, let''s start with a conversation.",
    "final_cta":"Book a Call"
  }'::jsonb
),
(
  'about',
  'About Page',
  'About Ovejite',
  'Meet the marketer behind the strategy.',
  '{"eyebrow":"About","title":"Meet the Marketer Behind the Strategy.","cta":"Let''s Work Together"}'::jsonb
),
(
  'contact',
  'Contact Page',
  'Contact Ovejite',
  'Start a conversation about your marketing.',
  '{"eyebrow":"Contact","title":"Let''s Start a Conversation","description":"Tell me about your business and your goals. I''ll get back to you within 24 hours.","form_title":"Send a Message"}'::jsonb
),
(
  'services',
  'Services Page',
  'Services | Ovejite',
  'Google Ads, Meta Ads, tracking, analytics, and growth strategy.',
  '{"eyebrow":"Services","title":"How I Help Businesses Grow","subtitle":"From advertising strategy to conversion tracking to continuous optimization — every service is built around measurable business outcomes."}'::jsonb
),
(
  'industries',
  'Industries Page',
  'Industries | Ovejite',
  'Marketing strategies built for the industries Ovejite serves.',
  '{"eyebrow":"Industries","title":"Built for Your Industry","subtitle":"Different industries need different strategies. Here''s how I approach the ones I work with most."}'::jsonb
),
(
  'case-studies',
  'Case Studies Page',
  'Case Studies | Ovejite',
  'Real marketing strategy, tracking, optimization, and growth.',
  '{"eyebrow":"Case Studies","title":"Real Work. Real Strategy. Real Growth.","subtitle":"Case studies showing the strategy, tracking, and optimization behind real results. New projects added as they''re completed."}'::jsonb
),
(
  'resources',
  'Resources Page',
  'Resources | Ovejite',
  'Practical marketing guides and insights.',
  '{"eyebrow":"Resources","title":"Insights & Resources","subtitle":"Practical guides on Google Ads, Meta Ads, conversion tracking, GA4, and growth strategy."}'::jsonb
),
(
  'privacy',
  'Privacy Policy',
  'Privacy Policy | Ovejite',
  'Privacy policy for Ovejite.me.',
  '{"content_markdown":"Privacy Policy\n\nLast updated: {{date}}\n\nOvejite.me respects your privacy. This policy explains how we collect, use, and protect your information.\n\n## Information We Collect\n\nWhen you submit a contact form, we collect the information you provide: name, email, phone, company, website, budget, service interest, and message.\n\n## How We Use Your Information\n\nWe use your information to respond to inquiries, provide consulting services, and communicate about marketing strategy. We never sell or share your data with third parties.\n\n## Analytics\n\nWe may use Google Analytics, Google Tag Manager, and Meta Pixel to understand website usage. These tools collect anonymous usage data.\n\n## Contact\n\nFor privacy questions, please reach out through the contact page."}'::jsonb
),
(
  'terms',
  'Terms of Service',
  'Terms of Service | Ovejite',
  'Terms of service for Ovejite.me.',
  '{"content_markdown":"Terms of Service\n\nLast updated: {{date}}\n\nBy using Ovejite.me, you agree to these terms.\n\n## Services\n\nOvejite provides digital marketing consulting services including Google Ads, Meta Ads, conversion tracking, and growth strategy. Specific deliverables are agreed upon per engagement.\n\n## No Guarantees\n\nWhile we strive for excellent results, marketing outcomes depend on many factors outside our control. We do not guarantee specific performance metrics.\n\n## Intellectual Property\n\nAll content on this site is the property of Ovejite.me. Case studies and resources are provided for informational purposes.\n\n## Contact\n\nFor questions about these terms, please reach out through the contact page."}'::jsonb
)
) v(slug,title,seo_title,meta_description,content)
where not exists (
  select 1 from public.cms_records c where c.entity='Page' and c.data->>'slug'=v.slug
);

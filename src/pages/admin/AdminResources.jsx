import AdminCMSPage from "@/components/admin/AdminCMSPage";

const CATEGORY_OPTIONS = [
  { value: "google_ads", label: "Google Ads" },
  { value: "meta_ads", label: "Meta Ads" },
  { value: "conversion_tracking", label: "Conversion Tracking" },
  { value: "ga4_gtm", label: "GA4 & GTM" },
  { value: "case_studies", label: "Case Studies" },
  { value: "growth_strategy", label: "Growth Strategy" },
];

export default function AdminResources() {
  return (
    <AdminCMSPage
      entityName="Resource"
      title="Resources"
      itemLabel="Article"
      sortBy="-publish_date"
      defaultValues={{ published: false, featured: false, tags: [], author: "Ovejite" }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug (URL)", type: "text", required: true, placeholder: "understanding-ga4" },
        { name: "category", label: "Category", type: "select", required: true, options: CATEGORY_OPTIONS },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Full Article Content (Markdown)", type: "markdown" },
        { name: "featured_image", label: "Featured Image", type: "image" },
        { name: "author", label: "Author", type: "text" },
        { name: "seo_title", label: "SEO Title", type: "text" },
        { name: "meta_description", label: "Meta Description", type: "textarea" },
        { name: "tags", label: "Tags", type: "list" },
        { name: "featured", label: "Featured on homepage", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
      tableColumns={[
        { name: "title", label: "Title", render: (i) => <span className="font-semibold">{i.title}</span> },
        { name: "category", label: "Category", render: (i) => CATEGORY_OPTIONS.find((o) => o.value === i.category)?.label || i.category },
        { name: "published", label: "Status", render: (i) => <span className={i.published ? "text-green-600 font-semibold" : "text-slate-400"}>{i.published ? "Published" : "Draft"}</span> },
      ]}
    />
  );
}

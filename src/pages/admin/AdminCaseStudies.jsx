import AdminCMSPage from "@/components/admin/AdminCMSPage";

const INDUSTRY_OPTIONS = [
  { value: "dental", label: "Dental" },
  { value: "medical", label: "Medical" },
  { value: "local_services", label: "Local Services" },
  { value: "ecommerce", label: "E-commerce" },
];

export default function AdminCaseStudies() {
  return (
    <AdminCMSPage
      entityName="CaseStudy"
      title="Case Studies"
      itemLabel="Case Study"
      sortBy="-created_date"
      defaultValues={{ published: false, featured: false, services: [], screenshots: [], display_order: 0 }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug (URL)", type: "text", required: true, placeholder: "dental-clinic-growth" },
        { name: "industry", label: "Industry", type: "select", required: true, options: INDUSTRY_OPTIONS },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "challenge", label: "Challenge", type: "textarea" },
        { name: "strategy", label: "Strategy", type: "textarea" },
        { name: "results", label: "Results", type: "textarea" },
        { name: "content", label: "Full Case Study Content", type: "markdown" },
        { name: "featured_image", label: "Featured Image", type: "image" },
        { name: "services", label: "Services Provided", type: "list" },
        { name: "featured", label: "Featured on homepage", type: "checkbox" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "display_order", label: "Display Order", type: "text" },
      ]}
      tableColumns={[
        { name: "title", label: "Title", render: (i) => <span className="font-semibold">{i.title}</span> },
        { name: "industry", label: "Industry", render: (i) => INDUSTRY_OPTIONS.find((o) => o.value === i.industry)?.label || i.industry },
        { name: "featured", label: "Featured", render: (i) => i.featured ? "⭐" : "—" },
        { name: "published", label: "Status", render: (i) => <span className={i.published ? "text-green-600 font-semibold" : "text-slate-400"}>{i.published ? "Published" : "Draft"}</span> },
      ]}
    />
  );
}

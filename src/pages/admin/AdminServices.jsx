import AdminCMSPage from "@/components/admin/AdminCMSPage";

const ICON_OPTIONS = [
  { value: "Search", label: "Search" },
  { value: "Share2", label: "Share / Meta" },
  { value: "ShoppingCart", label: "Shopping Cart" },
  { value: "Target", label: "Target" },
  { value: "BarChart3", label: "Bar Chart" },
  { value: "Server", label: "Server" },
  { value: "Layout", label: "Layout" },
  { value: "TrendingUp", label: "Trending Up" },
];

export default function AdminServices() {
  return (
    <AdminCMSPage
      entityName="Service"
      title="Services"
      itemLabel="Service"
      sortBy="display_order"
      defaultValues={{ published: true, features: [], benefits: [], display_order: 0 }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug (URL)", type: "text", required: true, placeholder: "google-ads-management" },
        { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
        { name: "short_description", label: "Short Description", type: "textarea" },
        { name: "content", label: "Full Page Content", type: "markdown" },
        { name: "features", label: "Features (What's Included)", type: "list" },
        { name: "benefits", label: "Benefits (Why It Matters)", type: "list" },
        { name: "cta_text", label: "CTA Button Text", type: "text", placeholder: "Book a Free Consultation" },
        { name: "featured_image", label: "Featured Image", type: "image" },
        { name: "display_order", label: "Display Order", type: "text" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
      tableColumns={[
        { name: "title", label: "Title", render: (i) => <span className="font-semibold">{i.title}</span> },
        { name: "icon", label: "Icon" },
        { name: "published", label: "Status", render: (i) => <span className={i.published ? "text-green-600 font-semibold" : "text-slate-400"}>{i.published ? "Published" : "Draft"}</span> },
      ]}
    />
  );
}

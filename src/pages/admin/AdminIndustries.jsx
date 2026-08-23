import AdminCMSPage from "@/components/admin/AdminCMSPage";

const ICON_OPTIONS = [
  { value: "Stethoscope", label: "Stethoscope (Dental)" },
  { value: "HeartPulse", label: "Heart Pulse (Medical)" },
  { value: "MapPin", label: "Map Pin (Local)" },
  { value: "ShoppingBag", label: "Shopping Bag (E-commerce)" },
];

export default function AdminIndustries() {
  return (
    <AdminCMSPage
      entityName="Industry"
      title="Industries"
      itemLabel="Industry"
      sortBy="display_order"
      defaultValues={{ published: true, challenges: [], services: [], display_order: 0 }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug (URL)", type: "text", required: true, placeholder: "dental" },
        { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
        { name: "description", label: "Description", type: "textarea" },
        { name: "challenges", label: "Common Challenges", type: "list" },
        { name: "strategy", label: "Strategy / Approach", type: "textarea" },
        { name: "services", label: "Services Offered", type: "list" },
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

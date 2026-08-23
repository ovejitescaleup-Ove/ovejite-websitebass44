import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2, Check } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.SiteSetting.list();
        if (list && list.length > 0) {
          setSettings(list[0]);
        } else {
          setSettings({});
        }
      } catch (e) {
        setSettings({});
      }
      setLoading(false);
    })();
  }, []);

  const setField = (name, value) => {
    setSettings({ ...settings, [name]: value });
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (settings.id) {
        await base44.entities.SiteSetting.update(settings.id, settings);
      } else {
        const created = await base44.entities.SiteSetting.create(settings);
        setSettings(created);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save settings: " + (err.message || ""));
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold font-display text-slate-900 mb-6">Website Settings</h1>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Personal Info */}
        <Section title="Personal Information">
          <Input label="Name" value={settings.name} onChange={(v) => setField("name", v)} />
          <Input label="Title" value={settings.title} onChange={(v) => setField("title", v)} />
          <Textarea label="Short Bio" value={settings.short_bio} onChange={(v) => setField("short_bio", v)} />
          <AdminImageUpload label="Profile Photo" value={settings.profile_photo} onChange={(v) => setField("profile_photo", v)} ratio="aspect-square max-w-[200px]" />
        </Section>

        {/* Contact */}
        <Section title="Contact Information">
          <Input label="Email" value={settings.email} onChange={(v) => setField("email", v)} />
          <Input label="WhatsApp Number (with country code)" value={settings.whatsapp_number} onChange={(v) => setField("whatsapp_number", v)} placeholder="e.g. 12025551234" />
          <Textarea label="WhatsApp Pre-filled Message" value={settings.whatsapp_message} onChange={(v) => setField("whatsapp_message", v)} />
          <Input label="Booking URL (Calendly, Google Calendar, etc.)" value={settings.booking_url} onChange={(v) => setField("booking_url", v)} placeholder="/contact or https://calendly.com/..." />
        </Section>

        {/* Social */}
        <Section title="Social Media">
          <Input label="LinkedIn URL" value={settings.linkedin} onChange={(v) => setField("linkedin", v)} />
          <Input label="Twitter URL" value={settings.twitter} onChange={(v) => setField("twitter", v)} />
          <Input label="Instagram URL" value={settings.instagram} onChange={(v) => setField("instagram", v)} />
          <Input label="Facebook URL" value={settings.facebook} onChange={(v) => setField("facebook", v)} />
        </Section>

        {/* Credibility */}
        <Section title="Credibility Metrics">
          <Input label="Monthly Ad Spend Managed" value={settings.monthly_ad_spend} onChange={(v) => setField("monthly_ad_spend", v)} placeholder="$3.6M+" />
          <Input label="Projects Count" value={settings.projects_count} onChange={(v) => setField("projects_count", v)} placeholder="50+" />
          <Input label="Years of Experience" value={settings.years_experience} onChange={(v) => setField("years_experience", v)} placeholder="8+" />
        </Section>

        {/* SEO */}
        <Section title="SEO Settings">
          <Input label="Default SEO Title" value={settings.seo_title} onChange={(v) => setField("seo_title", v)} />
          <Textarea label="Default Meta Description" value={settings.meta_description} onChange={(v) => setField("meta_description", v)} />
          <AdminImageUpload label="Open Graph Image" value={settings.og_image} onChange={(v) => setField("og_image", v)} />
        </Section>

        {/* Analytics */}
        <Section title="Analytics & Tracking">
          <Input label="GTM Container ID" value={settings.gtm_id} onChange={(v) => setField("gtm_id", v)} placeholder="GTM-XXXXXXX" />
          <Input label="GA4 Measurement ID" value={settings.ga4_id} onChange={(v) => setField("ga4_id", v)} placeholder="G-XXXXXXXXXX" />
          <Input label="Meta Pixel ID" value={settings.meta_pixel_id} onChange={(v) => setField("meta_pixel_id", v)} placeholder="123456789012345" />
        </Section>

        {/* Save button */}
        <div className="sticky bottom-4 flex items-center gap-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-lg">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
              <Check className="w-4 h-4" /> Saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-bold font-display text-slate-900 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}

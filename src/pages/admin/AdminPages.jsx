import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Save, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PAGE_DEFAULTS } from "@/lib/sitePageDefaults";

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Page.list("slug", 100);
      setPages(data || []);
    } catch (e) {
      alert("Could not load website pages: " + (e.message || ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (page) => {
    setEditing({
      ...page,
      content: page.content || PAGE_DEFAULTS[page.slug] || {},
    });
  };

  const createMissing = (slug) => {
    setEditing({
      slug,
      title: slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
      published: true,
      seo_title: "",
      meta_description: "",
      content: PAGE_DEFAULTS[slug] || {},
    });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        slug: editing.slug,
        title: editing.title,
        published: editing.published !== false,
        seo_title: editing.seo_title || "",
        meta_description: editing.meta_description || "",
        content: editing.content || {},
      };
      if (editing.id) await base44.entities.Page.update(editing.id, payload);
      else await base44.entities.Page.create(payload);
      setEditing(null);
      await load();
    } catch (e) {
      alert("Save failed: " + (e.message || ""));
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Website Pages
        </button>
        <form onSubmit={save} className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 max-w-5xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-900">Edit {editing.title}</h1>
              <p className="text-sm text-slate-500 mt-1">Changes here are used by the public website.</p>
            </div>
            <button
              type="button"
              onClick={() => setEditing({ ...editing, content: PAGE_DEFAULTS[editing.slug] || {} })}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600"
            >
              <RotateCcw className="w-4 h-4" /> Reset Content
            </button>
          </div>

          <div className="space-y-5">
            <Input label="Page Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Input label="SEO Title" value={editing.seo_title} onChange={(v) => setEditing({ ...editing, seo_title: v })} />
            <Textarea label="Meta Description" value={editing.meta_description} onChange={(v) => setEditing({ ...editing, meta_description: v })} />
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={editing.published !== false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
              <span className="text-sm font-semibold text-slate-700">Published</span>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Page Content</h2>
              <ContentEditor value={editing.content || {}} onChange={(content) => setEditing({ ...editing, content })} />
            </div>
          </div>

          <div className="mt-8">
            <button disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const configured = new Set(pages.map((p) => p.slug));
  const slugs = Object.keys(PAGE_DEFAULTS);

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Website Pages</h1>
      <p className="text-slate-500 mb-6">Control the editable content of your public pages from here.</p>
      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {slugs.map((slug) => {
            const page = pages.find((p) => p.slug === slug);
            return (
              <div key={slug} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900">{page?.title || slug}</h2>
                  <p className="text-xs text-slate-400 mt-1">/{slug === "home" ? "" : slug}</p>
                  <p className="text-xs mt-2">{page ? (page.published ? "Published" : "Draft") : "Not configured yet"}</p>
                </div>
                <button
                  onClick={() => page ? startEdit(page) : createMissing(slug)}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
                >
                  {page ? "Edit" : "Set Up"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return <label className="block"><span className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</span><input value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></label>;
}
function Textarea({ label, value, onChange }) {
  return <label className="block"><span className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</span><textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></label>;
}

function ContentEditor({ value, onChange }) {
  return (
    <div className="space-y-4">
      {Object.entries(value || {}).map(([key, val]) => (
        <ContentField key={key} path={key} label={humanize(key)} value={val} root={value} onChange={onChange} />
      ))}
    </div>
  );
}

function ContentField({ path, label, value, root, onChange }) {
  const update = (next) => {
    const clone = structuredClone(root);
    setAtPath(clone, path.split("."), next);
    onChange(clone);
  };

  if (Array.isArray(value)) {
    const simple = value.every((v) => typeof v === "string");
    return simple ? (
      <Textarea label={label + " (one item per line)"} value={value.join("\n")} onChange={(v) => update(v.split("\n").filter(Boolean))} />
    ) : (
      <Textarea label={label + " (JSON)"} value={JSON.stringify(value, null, 2)} onChange={(v) => {
        try { update(JSON.parse(v)); } catch (_) {}
      }} />
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="rounded-xl border border-slate-200 p-4">
        <h3 className="font-bold text-slate-800 mb-3">{label}</h3>
        <div className="space-y-4">
          {Object.entries(value).map(([child, childValue]) => (
            <ContentField key={child} path={`${path}.${child}`} label={humanize(child)} value={childValue} root={root} onChange={onChange} />
          ))}
        </div>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return <label className="flex items-center gap-3"><input type="checkbox" checked={value} onChange={(e) => update(e.target.checked)} /><span className="text-sm font-semibold">{label}</span></label>;
  }

  const isLong = String(value ?? "").length > 100;
  return isLong ? <Textarea label={label} value={value} onChange={update} /> : <Input label={label} value={value} onChange={update} />;
}

function setAtPath(obj, path, value) {
  let target = obj;
  for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
  target[path[path.length - 1]] = value;
}
function humanize(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

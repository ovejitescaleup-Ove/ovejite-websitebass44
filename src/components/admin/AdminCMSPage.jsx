import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, ArrowLeft, Save, Loader2, Star, Eye, EyeOff, X } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";

/**
 * AdminCMSPage — generic CRUD interface for a CMS entity.
 * Config:
 *   entityName: base44.entities.<EntityName>
 *   title: section title
 *   itemLabel: singular label ("Case Study")
 *   fields: [{ name, label, type, options?, required?, placeholder? }]
 *   tableColumns: [{ name, label, render? }]
 *   defaultValues: {}
 *   sortBy: field to sort by
 */
export default function AdminCMSPage({ entityName, title, itemLabel, fields, tableColumns, defaultValues = {}, sortBy = "-created_date" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list, {} = new, object = edit
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities[entityName].list(sortBy, 200);
      setItems(data || []);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      if (formData.id) {
        await base44.entities[entityName].update(formData.id, formData);
      } else {
        const { id, ...rest } = formData;
        await base44.entities[entityName].create(rest);
      }
      setEditing(null);
      load();
    } catch (err) {
      alert("Save failed: " + (err.message || "please try again"));
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm(`Delete this ${itemLabel.toLowerCase()}? This cannot be undone.`)) return;
    try {
      await base44.entities[entityName].delete(id);
      load();
    } catch (e) {
      alert("Delete failed");
    }
  };

  // List view
  if (!editing) {
    const filtered = search
      ? items.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()))
      : items;

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-display text-slate-900">{title}</h1>
          <button
            onClick={() => setEditing({ ...defaultValues })}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" /> New {itemLabel}
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}...`}
          className="w-full mb-4 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
        />

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No {title.toLowerCase()} yet. Click "New {itemLabel}" to create one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {tableColumns.map((col) => (
                    <th key={col.name} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{col.label}</th>
                  ))}
                  <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                    {tableColumns.map((col) => (
                      <td key={col.name} className="px-4 py-3 text-sm text-slate-700">
                        {col.render ? col.render(item) : item[col.name]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditing(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Edit view
  return (
    <div>
      <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to {title}
      </button>
      <EditForm
        fields={fields}
        initial={editing}
        onSave={handleSave}
        saving={saving}
        itemLabel={itemLabel}
      />
    </div>
  );
}

function EditForm({ fields, initial, onSave, saving, itemLabel }) {
  const [form, setForm] = useState(initial);

  const setField = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 max-w-3xl">
      <h2 className="text-xl font-bold font-display text-slate-900 mb-6">
        {form.id ? `Edit ${itemLabel}` : `New ${itemLabel}`}
      </h2>
      <div className="space-y-5">
        {fields.map((field) => (
          <FieldRenderer key={field.name} field={field} value={form[field.name]} onChange={(v) => setField(field.name, v)} />
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => history.back()} className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </form>
  );
}

function FieldRenderer({ field, value, onChange }) {
  const { name, label, type, options, required, placeholder } = field;

  if (type === "image") {
    return <AdminImageUpload value={value || ""} onChange={onChange} label={label} />;
  }

  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`relative w-12 h-6 rounded-full transition-colors ${value ? "bg-primary" : "bg-slate-300"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? "translate-x-6" : ""}`} />
        </button>
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}{required && <span className="text-primary">*</span>}</label>
        <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
          <option value="">Select...</option>
          {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}{required && <span className="text-primary">*</span>}</label>
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={5} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
      </div>
    );
  }

  if (type === "markdown") {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}{required && <span className="text-primary">*</span>}</label>
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={12} placeholder="Supports Markdown..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary" />
        <p className="text-xs text-slate-400 mt-1">Markdown supported</p>
      </div>
    );
  }

  if (type === "list") {
    return <ListEditor label={label} value={value || []} onChange={onChange} />;
  }

  // text
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}{required && <span className="text-primary">*</span>}</label>
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

function ListEditor({ label, value, onChange }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              e.preventDefault();
              onChange([...value, input.trim()]);
              setInput("");
            }
          }}
          placeholder="Type and press Enter..."
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:border-primary"
        />
        <button type="button" onClick={() => { if (input.trim()) { onChange([...value, input.trim()]); setInput(""); } }} className="px-4 rounded-xl bg-slate-100 text-sm font-semibold">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 text-sm">
            {item}
            <button type="button" onClick={() => onChange(value.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-red-500">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

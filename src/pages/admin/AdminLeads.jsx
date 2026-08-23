import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Loader2, X, Save, Mail, Phone, Globe, Building } from "lucide-react";
import { StatusBadge } from "./AdminDashboard";

const STATUSES = ["new", "contacted", "qualified", "proposal_sent", "won", "lost"];
const STATUS_LABELS = {
  new: "New", contacted: "Contacted", qualified: "Qualified",
  proposal_sent: "Proposal Sent", won: "Won", lost: "Lost",
};

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Lead.list("-created_date", 500);
      setLeads(data || []);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await base44.entities.Lead.update(id, { status });
      setLeads(leads.map((l) => l.id === id ? { ...l, status } : l));
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch (e) {}
  };

  const saveNotes = async (id, notes) => {
    try {
      await base44.entities.Lead.update(id, { notes });
      setLeads(leads.map((l) => l.id === id ? { ...l, notes } : l));
      setSelected(null);
    } catch (e) {
      alert("Failed to save notes");
    }
  };

  const filtered = leads.filter((l) => {
    const matchSearch = !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-slate-900 mb-6">Leads</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">No leads found.</div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Service</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase hidden lg:table-cell">Budget</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell">{lead.service_interest || "—"}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 hidden lg:table-cell">{lead.budget || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="text-xs font-bold rounded-full border-0 bg-transparent cursor-pointer focus:outline-none"
                      style={{ color: "inherit" }}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 hidden sm:table-cell">
                    {new Date(lead.created_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelected(lead)} className="text-sm font-semibold text-primary hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail drawer */}
      {selected && <LeadDrawer lead={selected} onClose={() => setSelected(null)} onSaveNotes={saveNotes} onUpdateStatus={updateStatus} />}
    </div>
  );
}

function LeadDrawer({ lead, onClose, onSaveNotes, onUpdateStatus }) {
  const [notes, setNotes] = useState(lead.notes || "");

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-900">Lead Details</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{lead.name}</h3>
            <div className="mt-3 space-y-2">
              <InfoRow icon={Mail} label="Email" value={lead.email} href={`mailto:${lead.email}`} />
              {lead.phone && <InfoRow icon={Phone} label="Phone" value={lead.phone} href={`tel:${lead.phone}`} />}
              {lead.company && <InfoRow icon={Building} label="Company" value={lead.company} />}
              {lead.website && <InfoRow icon={Globe} label="Website" value={lead.website} href={lead.website} />}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Service Interest</p>
            <p className="text-sm text-slate-700">{lead.service_interest || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Budget</p>
            <p className="text-sm text-slate-700">{lead.budget || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Source</p>
            <p className="text-sm text-slate-700">{lead.source || "website"}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Message</p>
            <p className="text-sm text-slate-700 whitespace-pre-line bg-slate-50 rounded-xl p-3">{lead.message}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(lead.id, s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    lead.status === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add notes about this lead..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => onSaveNotes(lead.id, notes)}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-orange-600"
            >
              <Save className="w-4 h-4" /> Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-2 text-sm text-slate-700">
      <Icon className="w-4 h-4 text-slate-400" />
      <span>{value}</span>
    </div>
  );
  return href ? <a href={href} className="hover:text-primary block">{content}</a> : content;
}

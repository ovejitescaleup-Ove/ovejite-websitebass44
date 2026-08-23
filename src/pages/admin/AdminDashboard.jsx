import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Users, FileText, BookOpen, TrendingUp, ArrowRight, Mail } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ newLeads: 0, totalLeads: 0, caseStudies: 0, resources: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [leads, studies, resources] = await Promise.all([
          base44.entities.Lead.list("-created_date", 100),
          base44.entities.CaseStudy.list("-created_date", 200),
          base44.entities.Resource.list("-created_date", 200),
        ]);
        setStats({
          newLeads: (leads || []).filter((l) => l.status === "new").length,
          totalLeads: (leads || []).length,
          caseStudies: (studies || []).length,
          resources: (resources || []).filter((r) => r.published).length,
        });
        setRecentLeads((leads || []).slice(0, 5));
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-slate-900 mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="New Leads" value={stats.newLeads} color="orange" />
        <StatCard icon={TrendingUp} label="Total Leads" value={stats.totalLeads} color="purple" />
        <StatCard icon={FileText} label="Case Studies" value={stats.caseStudies} color="pink" />
        <StatCard icon={BookOpen} label="Published Resources" value={stats.resources} color="blue" />
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-slate-900">Recent Contact Submissions</h2>
          <Link to="/admin/leads" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="py-8 text-center text-slate-400">Loading...</div>
        ) : recentLeads.length === 0 ? (
          <div className="py-8 text-center text-slate-400">No leads yet.</div>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                  {lead.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{lead.name}</p>
                  <p className="text-sm text-slate-500 truncate">{lead.email}</p>
                </div>
                <StatusBadge status={lead.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    orange: "bg-orange-50 text-primary",
    purple: "bg-purple-50 text-[#7C3AED]",
    pink: "bg-pink-50 text-pink-600",
    blue: "bg-blue-50 text-blue-600",
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-extrabold font-display text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export function StatusBadge({ status }) {
  const colors = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    qualified: "bg-purple-100 text-purple-700",
    proposal_sent: "bg-indigo-100 text-indigo-700",
    won: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
  };
  const labels = {
    new: "New", contacted: "Contacted", qualified: "Qualified",
    proposal_sent: "Proposal Sent", won: "Won", lost: "Lost",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[status] || colors.new}`}>
      {labels[status] || status}
    </span>
  );
}

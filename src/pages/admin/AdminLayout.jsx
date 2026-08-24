import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard, Users, FileText, BookOpen, Wrench, Briefcase, Settings, PanelsTopLeft,
  LogOut, ExternalLink, Menu, X,
} from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/case-studies", label: "Case Studies", icon: FileText },
  { to: "/admin/resources", label: "Resources", icon: BookOpen },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/industries", label: "Industries", icon: Briefcase },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/pages", label: "Website Pages", icon: PanelsTopLeft },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
      } catch (e) {
        // ProtectedRoute handles unauthenticated
      }
      setChecking(false);
    })();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    navigate("/");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Access Denied</h1>
        <p className="text-slate-600 mb-6">You need admin access to view this page.</p>
        <Link to="/" className="text-primary font-semibold hover:underline">← Back to site</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold font-display text-slate-900">Ovejite</span>
            <span className="text-xl font-extrabold text-primary">.</span>
            <span className="text-sm font-semibold text-slate-500">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100">
            <ExternalLink className="w-5 h-5" /> View Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <span className="font-bold text-slate-900">Admin Panel</span>
        </div>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { useAuth } from "@/context/AuthContext";
import { 
  Sparkles, 
  Users, 
  ShieldAlert, 
  Settings, 
  Database, 
  User, 
  Mail, 
  Building2, 
  Hash, 
  LogOut, 
  Layout, 
  BarChart,
  ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const { orgId } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load admin profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    Router.replace("/login");
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-purple-500/30">
        
        {/* AMBIENT BACKGROUND GLOW */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none -z-10" />

        {/* TOP BAR */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-purple-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)] group-hover:scale-110 transition-transform">
              <ShieldAlert className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-white">
              Manage<span className="text-purple-500">X</span>
              <span className="ml-2 text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-widest font-bold">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-all group shadow-[0_0_15px_rgba(147,51,234,0.1)]">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              AI Insights
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="relative">
                <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 blur-lg bg-purple-500/20 animate-pulse"></div>
              </div>
              <p className="text-slate-500 font-bold mt-6 tracking-widest uppercase text-xs">Accessing Secure Records...</p>
            </div>
          ) : (
            <>
              {/* HEADER SECTION */}
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight mb-2">
                    System Overview
                  </h2>
                  <p className="text-slate-400 text-lg font-medium">
                    Central control for <span className="text-slate-200">{profile?.org?.name}</span> organization.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">System Active</span>
                  </div>
                </div>
              </div>

              {/* PROFILE MINI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <InfoCard
                  icon={<User className="text-purple-400 w-5 h-5" />}
                  title="Master Admin"
                  value={profile?.name || "-"}
                />
                <InfoCard
                  icon={<Mail className="text-blue-400 w-5 h-5" />}
                  title="Auth Email"
                  value={profile?.email || "-"}
                />
                <InfoCard
                  icon={<Building2 className="text-indigo-400 w-5 h-5" />}
                  title="Workspace"
                  value={profile?.org?.name || "-"}
                />
                <InfoCard
                  icon={<Hash className="text-slate-400 w-5 h-5" />}
                  title="Org ID"
                  value={orgId || profile?.org?.id || "-"}
                />
              </div>

              {/* MANAGEMENT MODULES */}
              <div className="mb-8">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  Management Modules <div className="h-px flex-1 bg-slate-800"></div>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AdminActionCard
                    title="User Management"
                    icon={<Users className="w-6 h-6" />}
                    description="Audit workspace access. Manage roles for Managers and Employees or revoke access instantly."
                    stats="24 Active"
                    accent="purple"
                  />

                  <AdminActionCard
                    title="Data Archives"
                    icon={<Database className="w-6 h-6" />}
                    description="Access immutable logs of completed sprints and organization-wide historical performance."
                    stats="1.2k Records"
                    accent="blue"
                  />

                  <AdminActionCard
                    title="Org Analytics"
                    icon={<BarChart className="w-6 h-6" />}
                    description="Visualize throughput velocity and team health metrics across all active departments."
                    stats="Live Feed"
                    accent="indigo"
                  />

                  <AdminActionCard
                    title="Global Settings"
                    icon={<Settings className="w-6 h-6" />}
                    description="Control global sprint parameters, security protocols, and third-party integration keys."
                    stats="Nominal"
                    accent="slate"
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

/* ---------- UI COMPONENTS ---------- */

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 hover:bg-slate-900/60 transition-all group relative overflow-hidden">
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-purple-500/30 transition-colors">
          {icon}
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {title}
        </p>
      </div>
      <h3 className="text-lg font-bold text-white truncate relative z-10">
        {value}
      </h3>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-purple-600/5 blur-2xl group-hover:bg-purple-600/10 transition-all"></div>
    </div>
  );
}

function AdminActionCard({ title, icon, description, stats, accent }) {
  const accentStyles = {
    purple: "text-purple-400 group-hover:border-purple-500/50",
    blue: "text-blue-400 group-hover:border-blue-500/50",
    indigo: "text-indigo-400 group-hover:border-indigo-500/50",
    slate: "text-slate-400 group-hover:border-slate-500/50",
  };

  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 transition-all duration-300 group cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${accentStyles[accent]}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform ${accentStyles[accent]}`}>
          {icon}
        </div>
        <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">
          {stats}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        Enter Module <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
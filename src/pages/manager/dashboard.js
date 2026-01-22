import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { useAuth } from "@/context/AuthContext";
import { 
  Command, 
  BarChart3, 
  Users, 
  CheckCircle, 
  LayoutDashboard, 
  User, 
  Mail, 
  Building2, 
  LogOut, 
  Sun, 
  Moon, 
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function ManagerDashboard() {
  const { orgId } = useAuth();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Theme synchronization
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    const loadData = async () => {
      try {
        const data = await fetchMyProfile();
        setManager(data);
      } catch (err) {
        console.error("Failed to load manager profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    Router.replace("/login");
  };

  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-300">
        
        {/* Ambient Background Glow (Dark Mode Only) */}
        <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] pointer-events-none -z-10 hidden dark:block" />

        {/* TOP BAR */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-indigo-600 dark:bg-indigo-500 p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Command className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter dark:text-white">
              Manage<span className="text-indigo-600 dark:text-indigo-400">X</span>
              <span className="ml-2 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md uppercase font-bold tracking-widest">Manager</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <div className="h-10 w-10 border-4 border-indigo-200 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin" />
              <p className="mt-4 text-sm font-black tracking-widest text-slate-400 uppercase">Booting Command Center...</p>
            </div>
          ) : (
            <>
              {/* MANAGER HEADER */}
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl font-black dark:text-white tracking-tight mb-2">
                    Executive Suite
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                    Monitoring performance for <span className="text-indigo-600 dark:text-indigo-400 font-bold">{manager?.org?.name}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Teams Performing at 94%</span>
                </div>
              </div>

              {/* STATS/PROFILE ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <InfoCard icon={<User className="text-blue-500" />} title="Lead Manager" value={manager?.name} />
                <InfoCard icon={<Mail className="text-purple-500" />} title="Corporate Email" value={manager?.email} />
                <InfoCard icon={<Building2 className="text-emerald-500" />} title="Organization" value={manager?.org?.name} />
                <InfoCard icon={<CheckCircle className="text-orange-500" />} title="Sync ID" value={manager?.org?.id} />
              </div>

              {/* MANAGER ACTIONS */}
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                Operations & Governance <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActionCard
                  title="Sprint Overview"
                  icon={<BarChart3 className="w-6 h-6" />}
                  description="Global visibility into active sprint cycles, burndown charts, and team velocity metrics."
                  stats="3 Active Sprints"
                  accent="blue"
                />
                <ActionCard
                  title="Team Management"
                  icon={<Users className="w-6 h-6" />}
                  description="Review workload distribution across your squads and reassign high-priority tickets."
                  stats="12 Members"
                  accent="purple"
                />
                <ActionCard
                  title="Task Approval"
                  icon={<CheckCircle className="w-6 h-6" />}
                  description="Quality assurance portal. Review and verify completed work before final archive."
                  stats="8 Pending"
                  accent="emerald"
                />
                <ActionCard
                  title="Executive Reports"
                  icon={<LayoutDashboard className="w-6 h-6" />}
                  description="Generate high-level retrospectives and performance data for organizational audit."
                  stats="Q1 Ready"
                  accent="orange"
                />
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
    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-2xl p-6 transition-all group hover:bg-white dark:hover:bg-slate-900/60 hover:shadow-lg dark:hover:shadow-none">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{title}</p>
      </div>
      <h3 className="text-sm font-bold truncate dark:text-white">{value || "---"}</h3>
    </div>
  );
}

function ActionCard({ title, icon, description, stats, accent }) {
  const accentColors = {
    blue: "text-blue-600 dark:text-blue-400 group-hover:border-blue-500/50",
    purple: "text-purple-600 dark:text-purple-400 group-hover:border-purple-500/50",
    emerald: "text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-500/50",
    orange: "text-orange-600 dark:text-orange-400 group-hover:border-orange-500/50",
  };

  return (
    <div className={`bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 transition-all duration-300 group cursor-pointer hover:shadow-2xl dark:hover:shadow-none hover:-translate-y-1 ${accentColors[accent]}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 group-hover:rotate-3 transition-transform">
          {icon}
        </div>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">
          {stats}
        </span>
      </div>
      <h3 className="text-2xl font-black mb-3 dark:text-white">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        Enter Dashboard <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
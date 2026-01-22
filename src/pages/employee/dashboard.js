import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { useAuth } from "@/context/AuthContext";
import { 
  ClipboardList, 
  Activity, 
  User, 
  Mail, 
  Building2, 
  Hash, 
  LogOut, 
  Command, // This matches the Home Page logo icon
  Sun, 
  Moon, 
  ChevronRight,
  Zap
} from "lucide-react";

export default function EmployeeDashboard() {
  const { orgId } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Theme sync
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
        setProfile(data);
      } catch (err) {
        console.error("Failed to load employee profile", err);
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
    <ProtectedRoute allowedRoles={["employee"]}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-300">
        
        {/* Background Glows (Dark Mode Only) */}
        <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] pointer-events-none -z-10 hidden dark:block" />

        {/* TOP BAR */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
          <div className="flex items-center gap-2 group">
            {/* Same Logo Icon from Index/Home */}
            <div className="bg-blue-600 dark:bg-purple-600 p-1.5 rounded-lg shadow-lg group-hover:rotate-6 transition-transform">
              <Command className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter dark:text-white">
              Manage<span className="text-blue-600 dark:text-purple-500">X</span>
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
              <div className="h-10 w-10 border-4 border-blue-200 dark:border-purple-500/20 border-t-blue-600 dark:border-t-purple-500 rounded-full animate-spin" />
              <p className="mt-4 text-sm font-bold tracking-widest text-slate-400 uppercase">Synchronizing Workspace...</p>
            </div>
          ) : (
            <>
              {/* WELCOME HEADER */}
              <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-black dark:text-white tracking-tight mb-2">
                    Welcome back, {profile?.name?.split(' ')[0]} 👋
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    You have <span className="text-blue-600 dark:text-purple-400 font-bold">4 active tasks</span> in the current sprint.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-purple-500/10 border border-blue-100 dark:border-purple-500/20 rounded-2xl">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-purple-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-purple-300">
                    Employee Access
                  </span>
                </div>
              </div>

              {/* PERSONAL INFO ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <InfoCard icon={<User className="text-blue-500" />} title="Full Name" value={profile?.name} />
                <InfoCard icon={<Mail className="text-purple-500" />} title="Work Email" value={profile?.email} />
                <InfoCard icon={<Building2 className="text-emerald-500" />} title="Department" value={profile?.org?.name} />
                <InfoCard icon={<Hash className="text-orange-500" />} title="Identity ID" value={orgId || "---"} />
              </div>

              {/* TASK FOCUS SECTION */}
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                Active Sprint Operations <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PlaceholderCard 
                  title="My Active Tickets" 
                  icon={<ClipboardList className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  description="Complete your assigned tasks and update progress for your manager to review."
                  badge="4 Active"
                  accent="blue"
                />
                <PlaceholderCard 
                  title="Team Velocity" 
                  icon={<Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
                  description="Monitor the overall sprint health and contribute to the team goal."
                  badge="70% Comp."
                  accent="emerald"
                />
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

/* ---------- SHARED UI COMPONENTS ---------- */

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-2xl p-6 transition-all group hover:border-blue-300 dark:hover:border-purple-500/30">
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

function PlaceholderCard({ title, icon, description, badge, accent }) {
  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl dark:hover:shadow-none transition-all group cursor-pointer overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 group-hover:rotate-6 transition-transform">
          {icon}
        </div>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">
          {badge}
        </span>
      </div>
      <h3 className="text-2xl font-black mb-3 dark:text-white">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">{description}</p>
      
      {/* Visual Placeholder for real content */}
      <div className="w-full bg-slate-50 dark:bg-slate-950/50 h-32 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center group-hover:border-blue-300 dark:group-hover:border-purple-500/30 transition-colors">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          Initializing Stream <ChevronRight className="w-3 h-3 animate-pulse" />
        </p>
      </div>

      {/* Subtle Bottom Accent Glow */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20 bg-${accent}-500`} />
    </div>
  );
}
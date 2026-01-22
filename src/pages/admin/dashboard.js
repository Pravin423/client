import { useEffect, useState } from "react";
import { getProjects } from "@/utils/project";

import ProtectedRoute from "../../components/ProtectedRoute";
import Router, { useRouter } from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles, Users, Command, Settings, Database,
  User, Mail, Building2, Hash, LogOut,
  BarChart, ChevronRight, Sun, Moon, Copy, CheckCircle2
} from "lucide-react";

export default function AdminDashboard() {
  const { orgId } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Fetch projects function
  const loadProjects = async () => {
    if (!orgId) return; // wait until orgId is available
    setProjects([]); // clear previous projects to avoid stale display
    setProjectsLoading(true);
    try {
      const projectData = await getProjects(orgId); // pass orgId if your API supports it
      if (Array.isArray(projectData)) {
        setProjects(projectData);
      } else if (projectData && Array.isArray(projectData.projects)) {
        setProjects(projectData.projects);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    // THEME SYNC
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    // Load profile
    const loadProfile = async () => {
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // REFRESH PROJECTS whenever orgId changes (this fixes stale projects)
  useEffect(() => {
    loadProjects();
  }, [orgId]);

  // Refresh projects when returning from project creation page
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/admin" || url === "/admin/") {
        loadProjects(); // Refresh projects whenever returning to admin dashboard
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

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

  const handleNewProject = () => {
    Router.push("/projects/create");
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-300 selection:bg-purple-500/30">

        {/* AMBIENT GLOW */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none -z-10 hidden dark:block" />

        {/* TOP BAR */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-purple-600 p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Command className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter dark:text-white">
              Manage<span className="text-purple-600 dark:text-purple-500">X</span>
              <span className="ml-2 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-widest font-bold">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 rounded-full hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-all">
              <Sparkles className="w-4 h-4" />
              AI Insights
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold mt-6 tracking-widest uppercase text-xs">Accessing Secure Records...</p>
            </div>
          ) : (
            <>
              {/* HEADER SECTION */}
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl font-black dark:text-white tracking-tight mb-2">System Overview</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                    Central control for <span className="text-slate-900 dark:text-slate-200">{profile?.org?.name}</span>.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">System Active</span>
                </div>
              </div>

              {/* PROFILE MINI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <InfoCard icon={<User className="text-purple-600 dark:text-purple-400 w-5 h-5" />} title="Master Admin" value={profile?.name} />
                <InfoCard icon={<Mail className="text-blue-600 dark:text-blue-400 w-5 h-5" />} title="Auth Email" value={profile?.email} />
                <InfoCard icon={<Building2 className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />} title="Workspace" value={profile?.org?.name} />
                <InfoCard
                  icon={<Hash className="text-slate-600 dark:text-slate-400 w-5 h-5" />}
                  title="Org ID"
                  value={orgId || profile?.org?.id}
                  isCopyable={true}
                />
              </div>

              {/* PROJECTS SECTION HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex-1 flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">
                    Projects
                  </span>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => Router.push("/projects")}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition-all active:scale-95"
                  >
                    View All
                  </button>

                  <button
                    onClick={handleNewProject}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                  >
                    <span className="hidden sm:inline">New Project</span>
                    <span className="inline sm:hidden">New</span>
                  </button>
                </div>
              </div>

              {/* PROJECTS LIST */}
              {projectsLoading ? (
                <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                  <div className="h-4 w-4 border-2 border-purple-500/30 border-t-purple-600 rounded-full animate-spin"></div>
                  Loading projects...
                </div>
              ) : projects.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  No projects created yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {projects.map((project) => (
                    <div key={project._id} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all">
                      <h4 className="text-lg font-bold dark:text-white mb-2">{project.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{project.description || "No description provided"}</p>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
                        <span>Status: {project.status || "active"}</span>
                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ADMIN MODULE CARDS */}
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
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

/* ---------- UI COMPONENTS ---------- */
function InfoCard({ title, value, icon, isCopyable = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!isCopyable || !value || value === "-") return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={`bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-2xl p-6 transition-all group relative overflow-hidden shadow-sm hover:shadow-md ${isCopyable ? 'cursor-pointer active:scale-95' : ''}`}
    >
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-purple-500/30 transition-colors">
            {icon}
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{title}</p>
        </div>
        {isCopyable && (
          copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-300 group-hover:text-purple-400 transition-colors" />
        )}
      </div>
      <h3 className="text-lg font-bold dark:text-white truncate relative z-10 transition-colors">
        {copied ? <span className="text-green-500">ID Copied!</span> : (value || "-")}
      </h3>
      <div className={`absolute bottom-0 right-0 w-16 h-16 blur-2xl transition-all ${copied ? 'bg-green-500/10' : 'bg-purple-600/5 group-hover:bg-purple-600/10'}`}></div>
    </div>
  );
}

function AdminActionCard({ title, icon, description, stats, accent }) {
  const accents = {
    purple: "text-purple-600 dark:text-purple-400 group-hover:border-purple-500/50",
    blue: "text-blue-600 dark:text-blue-400 group-hover:border-blue-500/50",
    indigo: "text-indigo-600 dark:text-indigo-400 group-hover:border-indigo-500/50",
    slate: "text-slate-600 dark:text-slate-400 group-hover:border-slate-500/50",
  };

  return (
    <div className={`bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 transition-all duration-300 group cursor-pointer hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 ${accents[accent]}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform ${accents[accent]}`}>
          {icon}
        </div>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">
          {stats}
        </span>
      </div>
      <h3 className="text-xl font-bold dark:text-white mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">{description}</p>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        Enter Module <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}

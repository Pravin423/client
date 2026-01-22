import { useEffect, useState } from "react";
import { getProjects } from "@/utils/project";
import { useAuth } from "@/context/AuthContext";
import Router from "next/router";
import { 
  Command, 
  ArrowLeft, 
  Sun, 
  Moon, 
  FolderKanban, 
  User, 
  Users, 
  Settings2, 
  Plus,
  ExternalLink
} from "lucide-react";

export default function ProjectsPage() {
  const { role } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Theme sync with local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => Router.back()}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg group-hover:rotate-6 transition-transform">
              <Command className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter dark:text-white">
              Manage<span className="text-indigo-600">X</span>
              <span className="ml-2 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-widest font-bold">Projects</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {role !== "employee" && (
            <button  onClick={() => Router.push('/projects/create')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              New Project
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="h-12 w-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Loading Repository...</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-4xl font-black dark:text-white tracking-tight mb-2">Project Repository</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                Showing {projects.length} active initiatives in your organization.
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-[2rem] p-20 text-center">
                <FolderKanban className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Projects Found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} role={role} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function ProjectCard({ project, role }) {
  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 hover:shadow-2xl dark:hover:shadow-none hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <FolderKanban className="w-6 h-6" />
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
             Active
           </span>
        </div>
      </div>

      <h3 className="text-xl font-black dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {project.name}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
        {project.description || "No description provided for this project initiative."}
      </p>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-sm font-medium">
          <User className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Manager:</span>
          <span className="dark:text-white">{project.manager?.name || "Unassigned"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Team Size:</span>
          <span className="dark:text-white">{project.employees?.length || 0} Members</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-slate-200 dark:border-slate-800">
          <ExternalLink className="w-3 h-3" />
          View Details
        </button>
        
        {role !== "employee" && (
          <button className="p-2.5 bg-white dark:bg-slate-900 hover:border-indigo-500 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 rounded-xl transition-all">
            <Settings2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
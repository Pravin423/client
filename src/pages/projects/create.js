import { useState } from "react";
import { createProject } from "@/utils/project";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { 
  Command, 
  ArrowLeft, 
  Plus, 
  FolderKanban, 
  AlignLeft, 
  UserCircle2, 
  Sparkles 
} from "lucide-react";


export default function CreateProject() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    managerId: "",
    employees: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject(form);
      router.push("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-300">
        
        {/* HEADER */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 group">
              <div className="bg-purple-600 p-1.5 rounded-lg shadow-lg">
                <Command className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-black tracking-tighter dark:text-white">
                Manage<span className="text-purple-600">X</span>
                <span className="ml-2 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-widest font-bold">
                  Forge
                </span>
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto p-6 md:p-12">
          <div className="mb-10">
            <h2 className="text-4xl font-black dark:text-white tracking-tight mb-2">Initialize Project</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Configure a new workspace initiative and assign leadership.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl -z-10" />

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Project Name
                </label>
                <div className="relative group">
                  <FolderKanban className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    required
                    placeholder="e.g. Q1 Infrastructure Audit"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-bold text-slate-800 dark:text-white"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Strategy & Objectives
                </label>
                <div className="relative group">
                  <AlignLeft className="absolute left-4 top-5 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  <textarea
                    required
                    placeholder="Define the scope and mission of this project..."
                    rows="4"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-slate-600 dark:text-slate-300"
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>

              {/* Manager ID */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Lead Manager Assignment
                </label>
                <div className="relative group">
                  <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    required
                    placeholder="Enter secure Manager ID"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-mono text-sm tracking-wider dark:text-white"
                    onChange={(e) => setForm({ ...form, managerId: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Deploy Project
                    </>
                  )}
                </button>

                <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  Secure System Initialization
                </p>
              </div>

            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

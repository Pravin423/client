import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  Layout, 
  Users, 
  Zap, 
  ArrowRight, 
  Activity, 
  Sparkles,
  Command,
  MousePointer2
} from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-purple-500/30">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] pointer-events-none -z-10" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)]">
            <Command className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">
            Manage<span className="text-purple-500">X</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-bold text-slate-400 hover:text-purple-400 transition-colors"
          >
            Sign In
          </Link>
          <button
            onClick={() => router.push("/org/register")}
            className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative pt-16 pb-24">
        <section className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Project OS
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
            Manage Everything. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500">
              Deliver Faster.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            The command center for high-performance Scrum teams. 
            <span className="text-slate-200 font-medium ml-1">ManageX</span> replaces fragmented tools with one unified, role-based platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <button 
                onClick={() => router.push("/org/register")}
                className="w-full sm:w-auto px-10 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all flex items-center justify-center gap-3 group shadow-[0_0_25px_rgba(147,51,234,0.3)]"
            >
                Launch Your Workspace
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-slate-300 font-bold rounded-2xl border border-slate-800 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <MousePointer2 className="w-4 h-4" />
                View Live Demo
            </button>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="relative max-w-5xl mx-auto mb-32">
            <div className="absolute inset-0 bg-purple-500/10 blur-[80px] -z-10" />
            <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-3 shadow-2xl">
                <div className="rounded-[2rem] bg-slate-950 border border-slate-800/50 h-[450px] flex items-center justify-center relative overflow-hidden">
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
                             <Layout className="w-10 h-10 text-purple-500 opacity-80" />
                        </div>
                        <p className="font-black tracking-[0.3em] uppercase text-[10px] text-slate-600">
                            System Interface Preview
                        </p>
                    </div>
                    {/* Abstract Decorative Lines */}
                    <div className="absolute top-10 left-10 w-32 h-2 bg-slate-900 rounded-full opacity-50" />
                    <div className="absolute top-16 left-10 w-24 h-2 bg-slate-900 rounded-full opacity-30" />
                </div>
            </div>
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<Zap className="w-6 h-6 text-purple-400" />}
              title="Hyper-Fast Sprints"
              desc="Optimized Kanban boards designed for speed. Move tasks through the pipeline with zero friction."
            />
            <Feature
              icon={<Users className="w-6 h-6 text-purple-400" />}
              title="Team Autonomy"
              desc="Role-specific dashboards that give Managers and Employees exactly what they need to succeed."
            />
            <Feature
              icon={<Activity className="w-6 h-6 text-purple-400" />}
              title="Advanced Metrics"
              desc="Deep-dive into velocity, burndown charts, and team performance with automated reporting."
            />
          </div>
        </section>
      </main>

      {/* DARK FOOTER */}
      <footer className="py-16 border-t border-slate-900 bg-[#010413]">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-2">
                    <Command className="text-purple-500 w-6 h-6" />
                    <span className="text-xl font-black text-white">ManageX</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className={`h-2 w-2 rounded-full ${message ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-700'}`}></div>
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                     API Status: {message ? "Operational" : "Offline"}
                   </span>
                </div>
            </div>
            <div className="h-px w-full bg-slate-900 mb-8" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    © 2026 ManageX Tech Systems. All rights reserved.
                </p>
                <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <a href="#" className="hover:text-purple-400 transition-colors">Security</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Docs</a>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-slate-900/30 backdrop-blur-sm p-10 rounded-[2.5rem] border border-slate-800/50 hover:border-purple-500/50 hover:bg-slate-900/50 transition-all duration-500 group text-left">
      <div className="mb-6 p-4 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 group-hover:border-purple-500/30 transition-all inline-block shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-500 leading-relaxed font-medium italic group-hover:text-slate-400 transition-colors">
        "{desc}"
      </p>
    </div>
  );
}
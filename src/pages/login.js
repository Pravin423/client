import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { 
  Command, 
  Mail, 
  Lock, 
  Hash, 
  ArrowRight, 
  AlertCircle, 
  Sparkles 
} from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password, orgId);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col selection:bg-purple-500/30">
      
      {/* GLOW DECOR (Top Left) */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      {/* GLOW DECOR (Bottom Right) */}
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 bg-transparent">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-purple-600 p-1.5 rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:scale-110 transition-transform">
            <Command className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Manage<span className="text-purple-500">X</span>
          </span>
        </Link>
      </nav>

      {/* LOGIN CONTAINER */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-[440px]">
          {/* CARD */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden">
            
            {/* CARD GLOW ACCENT */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 blur-[60px]" />

            {/* HEADER */}
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles className="w-3 h-3" /> Secure Access
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-400 mt-2 font-medium">
                Enter your workspace credentials
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5 relative">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 pb-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Organization ID
                </label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    placeholder="org-123-xyz"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {loading ? "Verifying..." : "Sign In to ManageX"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">New to ManageX?</span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {/* REGISTER BUTTONS */}
            <div className="space-y-3">
              <button
                onClick={() => router.push("/register")}
                className="w-full border-2 border-slate-800 text-slate-400 hover:border-purple-500/50 hover:text-purple-400 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                Join an Organization
              </button>
              <button
                onClick={() => router.push("/org/register")}
                className="w-full text-purple-400 font-bold text-sm hover:text-purple-300 hover:underline transition-all"
              >
                Create a brand new organization
              </button>
            </div>
          </div>
          
          {/* FOOTER LINKS */}
          <div className="mt-8 flex justify-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
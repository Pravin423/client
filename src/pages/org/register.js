import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { 
  Command, 
  Building2, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  Sparkles 
} from "lucide-react";

export default function OrgRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    orgName: "",
    adminName: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Note: Replaced localhost with env variable for best practice
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/org/create`,
        form,
        { withCredentials: true }
      );

      setSuccess("Organization created successfully 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col selection:bg-purple-500/30">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] pointer-events-none -z-10" />

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 bg-transparent">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-purple-600 p-1.5 rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:rotate-3 transition-transform">
            <Command className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Manage<span className="text-purple-500">X</span>
          </span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-[500px]">
          
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden">
            
            {/* SUCCESS OVERLAY */}
            {success && (
              <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
                <div className="bg-green-500/20 p-4 rounded-full mb-4">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Workspace Created!</h2>
                <p className="text-slate-400">Redirecting you to the command center...</p>
              </div>
            )}

            {/* HEADER */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3 h-3" /> Root Registration
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Register Organization
              </h1>
              <p className="text-slate-400 mt-2 font-medium">
                Set up your company's private cloud workspace.
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                icon={<Building2 className="w-5 h-5" />}
                label="Organization Name"
                name="orgName"
                placeholder="e.g. Acme Corp"
                value={form.orgName}
                onChange={handleChange}
              />

              <Input
                icon={<User className="w-5 h-5" />}
                label="Root Admin Name"
                name="adminName"
                placeholder="Your Full Name"
                value={form.adminName}
                onChange={handleChange}
              />

              <Input
                icon={<Mail className="w-5 h-5" />}
                label="Admin Email"
                name="email"
                type="email"
                placeholder="admin@company.com"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                icon={<Lock className="w-5 h-5" />}
                label="Master Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white py-4 rounded-2xl font-bold transition-all shadow-[0_0_25px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {loading ? "Provisioning..." : "Launch Organization"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-800 text-center">
              <p className="text-sm text-slate-500">
                Already part of an org?{" "}
                <Link href="/register" className="text-purple-400 font-bold hover:underline">
                  Join here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Input Component ---------- */

function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
          {icon}
        </div>
        <input
          {...props}
          required
          className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 text-white rounded-2xl focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}
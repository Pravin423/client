import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password, orgId);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 border-b bg-white">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ScrumFlow
        </Link>
      </nav>

      {/* LOGIN CONTAINER */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white border rounded-xl shadow-lg p-8">
          
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Sign in to your workspace
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage sprints, tasks, and team collaboration
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full p-2.5 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 border rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization ID
              </label>
              <input
                type="text"
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                placeholder="your-org-id"
                className="w-full p-2.5 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition"
            >
              Login
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs text-gray-400">NEW TO SCRUMFLOW?</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* REGISTER */}
         
           <button
            onClick={() => router.push("/register")}
            className="w-full border border-blue-600  mb-2 text-blue-600 hover:bg-blue-50 py-2.5 rounded-md font-medium transition"
          >
            Register yourself 
           
          </button>
           <button
            onClick={() => router.push("/org/register")}
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-md font-medium transition"
          >
            Create an organization(pending)
          </button>
        </div>
      </div>
    </>
  );
}

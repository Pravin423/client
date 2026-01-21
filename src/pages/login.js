import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Router, { useRouter } from "next/router";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orgId, setOrgId] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password, orgId);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

  };
  const router = useRouter();
  const handleregister = () => {
    router.push("/register")

  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md  border p-8 rounded-lg shadow-lg">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Organization ID"
            value={orgId}
            onChange={e => setOrgId(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleregister}
          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 p-2 rounded font-medium transition"
        >
          Register Now
        </button>
      </div>
    </div>
  );

}

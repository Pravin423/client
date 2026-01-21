import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org_id, setOrg_id] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("employee");

  const handleLogin=()=>{
    router.push("/login")
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call register function from AuthContext
  await register(name, email, password, org_id, role);


      // Success: redirect to login
      router.push("/login");
    } catch (err) {
      // Display backend error message
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md border rounded-lg shadow-md p-8">
      
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

      {error && (
        <p className="text-red-500 mb-4 text-center font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Org ID</label>
          <input
            type="text"
            placeholder="1"
            value={org_id}
            onChange={(e) => setOrg_id(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded text-white font-semibold transition ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 p-2 rounded font-medium transition"
      >
        Login
      </button>

    </div>
  </div>
);

}

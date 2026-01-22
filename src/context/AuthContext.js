import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [orgId, setOrgId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setAccessToken(token);
        setRole(decoded.role);
        setOrgId(decoded.org_id);
        setUserId(decoded.id);
      } catch {
        localStorage.removeItem("accessToken");
      }
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (email, password, orgId) => {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
      org_id: orgId, // 👈 BACKEND EXPECTS THIS
    });

    const decoded = jwtDecode(data.accessToken);

    localStorage.setItem("accessToken", data.accessToken);

    setAccessToken(data.accessToken);
    setRole(decoded.role);
    setOrgId(decoded.org_id);
    setUserId(decoded.id);

    // 🔥 SINGLE SOURCE OF REDIRECT
    router.replace(`/${decoded.role}/dashboard`);
  };

  // ✅ LOGOUT
  const logout = async () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setRole(null);
    setOrgId(null);
    setUserId(null);
    router.push("/login");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ accessToken, role, orgId, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

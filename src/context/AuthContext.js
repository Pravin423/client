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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);




  // ✅ RESTORE AUTH ON PAGE REFRESH
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
    try {
      const decoded = jwtDecode(token); // decoded payload
      setAccessToken(token);
      setRole(decoded.role);
      setOrgId(decoded.org_id);
    } catch (err) {
      localStorage.removeItem("accessToken");
    }
  }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (email, password, org_id) => {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
      org_id
    });

    const decoded = jwtDecode(data.accessToken);
    console.log("DECODED TOKEN 👉", decoded);

    setAccessToken(data.accessToken);
    setRole(data.role);
    setOrgId(decoded.org_id);

    localStorage.setItem("accessToken", data.accessToken);

    router.push(`/${data.role}/dashboard`);
  };

  // ✅ REGISTER
  const register = async (name, email, password, org_id, role = "employee") => {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
      org_id,
      role
    });
    return res.data;
  };

  // ✅ LOGOUT
  const logout = async () => {
    await api.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setRole(null);
    setOrgId(null);
    router.push("/login");
  };

  if (loading) return null; // ⛔ Prevent redirect flicker

  return (
    <AuthContext.Provider
      value={{ accessToken, role, orgId, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

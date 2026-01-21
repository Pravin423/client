import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import {jwtDecode} from "jwt-decode"; // fixed import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [orgId, setOrgId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // user object

  // RESTORE AUTH ON PAGE REFRESH
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token); // decoded payload from JWT
        setAccessToken(token);
        setRole(decoded.role);
        setOrgId(decoded.org_id);

        setUser({
          name: decoded.name || null,
          email: decoded.email || null,
          role: decoded.role || null,
          orgId: decoded.org_id || null, // add orgId here
        });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("accessToken");
      }
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password, org_id) => {
    const { data } = await api.post("/api/auth/login", { email, password, org_id });
    const decoded = jwtDecode(data.accessToken);

    setAccessToken(data.accessToken);
    setRole(decoded.role);
    setOrgId(decoded.org_id);

    setUser({
      name: decoded.name || null,
      email: decoded.email || null,
      role: decoded.role || null,
      orgId: decoded.org_id || null,
    });

    localStorage.setItem("accessToken", data.accessToken);
    router.push(`/${decoded.role}/dashboard`);
  };

  // REGISTER
  const register = async (name, email, password, org_id, role = "employee") => {
    const res = await api.post("/api/auth/register", { name, email, password, org_id, role });
    return res.data;
  };

  // LOGOUT
  const logout = async () => {
    await api.post("/api/auth/logout").catch(() => {});
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setRole(null);
    setOrgId(null);
    setUser(null);
    router.push("/login");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ accessToken, role, orgId, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

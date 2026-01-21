import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);

  // Login
  const login = async (email, password, org_id) => {
    const { data } = await api.post("/api/auth/login", { email, password,org_id });
    setAccessToken(data.accessToken);
    setRole(data.role);

    // Role-based redirect
    switch (data.role) {
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "manager":
        router.push("/manager/dashboard");
        break;
      case "employee":
        router.push("/employee/dashboard");
        break;
      default:
        router.push("/");
    }
  };


  // Register
  const register = async (name, email, password, org_id, role = "employee") => {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
      org_id: Number(org_id),
      role
    });
    return res.data;
  };

  // Logout
  const logout = async () => {
    await api.post("/api/auth/logout");
    setAccessToken(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ accessToken, role, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

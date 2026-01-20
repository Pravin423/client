import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);

  // Login
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
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
  const register = async (name, email, password) => {
    await api.post("/auth/register", { name, email, password });
    router.push("/login");
  };

  // Logout
  const logout = async () => {
    await api.post("/auth/logout");
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

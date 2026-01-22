import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { accessToken, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth restoration
    if (!accessToken) {
      if (typeof window !== "undefined") router.replace("/login");
      return;
    }
    if (allowedRoles.length && !allowedRoles.includes(role)) {
      if (typeof window !== "undefined") router.replace("/login");
    }
  }, [accessToken, role, loading, router]);

  // Prevent UI flicker and router errors
  if (loading) return null;
  if (!accessToken) return null;
  if (allowedRoles.length && !allowedRoles.includes(role)) return null;
  return children;
};

export default ProtectedRoute;

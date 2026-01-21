import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { accessToken, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ⏳ wait until auth is restored

    if (!accessToken) {
      router.replace("/login");
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(role)) {
      router.replace("/login"); // or /unauthorized
    }
  }, [accessToken, role, loading, router]);

  // ⛔ Prevent UI flicker
  if (loading) return null;

  if (!accessToken) return null;

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

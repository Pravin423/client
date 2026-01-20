import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { accessToken, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    } else if (allowedRoles.length && !allowedRoles.includes(role)) {
      router.push("/login"); // or /unauthorized
    }
  }, [accessToken, role, router]);

  if (!accessToken || (allowedRoles.length && !allowedRoles.includes(role))) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

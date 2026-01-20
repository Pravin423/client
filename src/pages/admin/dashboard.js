import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Only Admin can see this.</p>
      </div>
    </ProtectedRoute>
  );
}

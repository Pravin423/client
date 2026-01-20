import ProtectedRoute from "../../components/ProtectedRoute";

export default function  ManagerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        <p>Only manager can see this.</p>
      </div>
    </ProtectedRoute>
  );
}

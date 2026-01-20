import ProtectedRoute from "../../components/ProtectedRoute";

export default function  EmployeeDashboard() {
  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <p>Only employee can see this.</p>
      </div>
    </ProtectedRoute>
  );
}

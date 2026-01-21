

import ProtectedRoute from "../../components/ProtectedRoute";
import { useRouter } from "next/router";
import { logoutUser } from "@/utils/auth";
import Router from "next/router";

export default function EmployeeDashboard() {
 return (
  <ProtectedRoute allowedRoles={["employee"]}>
    <div className="p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <p className="text-gray-600">Only employee can see this.</p>
        </div>

        {/* Logout Button */}
      <button
          onClick={async () => {
            await logoutUser();
            Router.replace("/login");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

    </div>
  </ProtectedRoute>
);

}

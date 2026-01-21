import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { useAuth } from "@/context/AuthContext";

export default function EmployeeDashboard() {
 const { user, orgId,  } = useAuth(); // 👈 user added

  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <div className="min-h-screen bg-gray-50">

        {/* TOP BAR */}
        <header className="flex justify-between items-center px-10 py-4 bg-white border-b">
          <h1 className="text-xl font-bold text-blue-600">
            ScrumFlow
          </h1>

          <button
            onClick={async () => {
              await logoutUser();
              Router.replace("/login");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Employee Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            Track your assigned tasks and sprint progress
          </p>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <InfoCard
              title="Logged in as"
              value={user?.name || user?.email || "Employee"}
            />

            <InfoCard
              title="Role"
              value="Employee"
            />

            <InfoCard
              title="Organization ID"
              value={orgId}
            />

          </div>

          {/* PLACEHOLDER SECTIONS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlaceholderCard title="My Tasks" />
            <PlaceholderCard title="Sprint Progress" />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function InfoCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3 className="text-lg font-semibold text-gray-900">
        {value}
      </h3>
    </div>
  );
}

function PlaceholderCard({ title }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500">
        This section will display real-time task and sprint data.
      </p>
    </div>
  );
}

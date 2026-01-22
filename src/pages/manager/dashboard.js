import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { LayoutDashboard, Users, CheckCircle, BarChart3, LogOut, Building2, Mail, User } from "lucide-react";

export default function ManagerDashboard() {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadManager = async () => {
      try {
        const data = await fetchMyProfile();
        setManager(data);
      } catch (err) {
        console.error("Failed to load manager profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadManager();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    Router.replace("/login");
  };

  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <div className="min-h-screen bg-[#f8fafc]">
        {/* TOP BAR */}
        <header className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ManageX
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{manager?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{manager?.role}</p>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors border border-red-100"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Loading your workspace...</p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Manager Dashboard
                    </h2>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                        {manager?.role}
                    </span>
                  </div>
                  <p className="text-gray-500 text-lg">
                    Welcome back. Here is what's happening with your teams today.
                  </p>
              </div>

              {/* PROFILE CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <InfoCard icon={<User className="text-blue-500"/>} title="Manager Name" value={manager?.name} />
                <InfoCard icon={<Mail className="text-purple-500"/>} title="Email Address" value={manager?.email} />
                <InfoCard icon={<Building2 className="text-emerald-500"/>} title="Organization" value={manager?.org?.name} />
                <InfoCard icon={<CheckCircle className="text-orange-500"/>} title="Org ID" value={manager?.org?.id} />
              </div>

              {/* FEATURES SECTION */}
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <ActionCard
                  icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
                  title="Sprint Overview"
                  description="Track sprint progress, velocity, and upcoming deadlines across all active teams."
                  color="blue"
                />
                <ActionCard
                  icon={<Users className="w-6 h-6 text-purple-600" />}
                  title="Team Performance"
                  description="Monitor individual contributor workload and identify potential bottlenecks early."
                  color="purple"
                />
                <ActionCard
                  icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                  title="Task Approval"
                  description="Review pending deliverables and move items to the 'Done' column for final sign-off."
                  color="emerald"
                />
                <ActionCard
                  icon={<LayoutDashboard className="w-6 h-6 text-orange-600" />}
                  title="Reports & Analytics"
                  description="Generate and download comprehensive performance data and sprint retrospective reports."
                  color="orange"
                />
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

/* ---------- UI COMPONENTS ---------- */

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
      </div>
      <h3 className="text-lg font-bold text-gray-800 truncate">{value || "-"}</h3>
    </div>
  );
}

function ActionCard({ title, description, icon, color }) {
    const colorMap = {
        blue: "hover:border-blue-200 hover:bg-blue-50/30",
        purple: "hover:border-purple-200 hover:bg-purple-50/30",
        emerald: "hover:border-emerald-200 hover:bg-emerald-50/30",
        orange: "hover:border-orange-200 hover:bg-orange-50/30",
    }

  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 group ${colorMap[color]}`}>
      <div className="mb-4 inline-block p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
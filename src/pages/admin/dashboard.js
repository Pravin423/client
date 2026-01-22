import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { useAuth } from "@/context/AuthContext";
import { Sparkles } from "lucide-react";
import {
  Users,
  ShieldAlert,
  Settings,
  Database,
  User,
  Mail,
  Building2,
  Hash,
  LogOut,
  Layout,
  BarChart
} from "lucide-react";

export default function AdminDashboard() {
  const { orgId } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load admin profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    Router.replace("/login");
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-[#f8fafc]">

        {/* TOP BAR */}
        <header className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
              <ShieldAlert className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
              ManageX
            </h1>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100 hover:shadow-md hover:shadow-indigo-100 transition-all duration-300 group">
              <Sparkles className="w-4 h-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
              AI Analytics
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>



        </header>

        {/* DASHBOARD CONTENT */}
        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-500 font-medium">Initializing Admin Console...</p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-10 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                    System Overview
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Manage organization-wide users, roles, and historical records.
                  </p>
                </div>
                <div className="hidden md:flex gap-2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                    Admin Access
                  </span>
                  <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 border border-indigo-200">
                    System Active
                  </span>
                </div>
              </div>

              {/* PROFILE CARDS (Same as Manager/Employee) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <InfoCard
                  icon={<User className="text-indigo-500 w-5 h-5" />}
                  title="Admin Name"
                  value={profile?.name || "-"}
                />
                <InfoCard
                  icon={<Mail className="text-blue-500 w-5 h-5" />}
                  title="Admin Email"
                  value={profile?.email || "-"}
                />
                <InfoCard
                  icon={<Building2 className="text-emerald-500 w-5 h-5" />}
                  title="Organization"
                  value={profile?.org?.name || "-"}
                />
                <InfoCard
                  icon={<Hash className="text-orange-500 w-5 h-5" />}
                  title="Organization ID"
                  value={orgId || profile?.org?.id || "-"}
                />
              </div>

              {/* ADMIN ACTIONS GRID */}
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Management Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                <AdminActionCard
                  title="User Management"
                  icon={<Users className="w-6 h-6 text-indigo-600" />}
                  description="View all Managers and Employees. Reset passwords, change roles, or remove users from the organization."
                  stats="24 Active Users"
                  color="indigo"
                />

                <AdminActionCard
                  title="Records & Archive"
                  icon={<Database className="w-6 h-6 text-emerald-600" />}
                  description="Access all past sprints, completed tasks, and historical data logs for the entire organization."
                  stats="1,240 Total Records"
                  color="emerald"
                />

                <AdminActionCard
                  title="Organization Analytics"
                  icon={<BarChart className="w-6 h-6 text-blue-600" />}
                  description="High-level reports on organization productivity, sprint success rates, and team velocity."
                  stats="Updated 1h ago"
                  color="blue"
                />

                <AdminActionCard
                  title="System Settings"
                  icon={<Settings className="w-6 h-6 text-orange-600" />}
                  description="Configure organization-wide settings, default sprint lengths, and integration API keys."
                  stats="All Systems Nominal"
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
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
          {icon}
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
      </div>
      <h3 className="text-lg font-bold text-gray-800 truncate">
        {value}
      </h3>
    </div>
  );
}

function AdminActionCard({ title, icon, description, stats, color }) {
  const colorMap = {
    indigo: "hover:border-indigo-200 hover:bg-indigo-50/30",
    emerald: "hover:border-emerald-200 hover:bg-emerald-50/30",
    blue: "hover:border-blue-200 hover:bg-blue-50/30",
    orange: "hover:border-orange-200 hover:bg-orange-50/30",
  }

  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-sm transition-all duration-300 group cursor-pointer ${colorMap[color]}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors shadow-sm">
          {icon}
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded-full uppercase tracking-widest">
          {stats}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Open Module &rarr;
      </div>
    </div>
  );
}
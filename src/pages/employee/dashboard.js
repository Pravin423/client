import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Router from "next/router";
import { logoutUser } from "@/utils/auth";
import { fetchMyProfile } from "@/utils/user";
import { useAuth } from "@/context/AuthContext";
import { 
  ClipboardList, 
  Activity, 
  User, 
  Mail,
  Building2, 
  Hash, 
  LogOut, 
  Layout 
} from "lucide-react";

export default function EmployeeDashboard() {
  const { orgId } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load employee profile", err);
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
    <ProtectedRoute allowedRoles={["employee"]}>
      <div className="min-h-screen bg-[#f8fafc]">
        
        {/* TOP BAR */}
        <header className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Layout className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ManageX
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500 font-medium">Syncing your workspace...</p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-10 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                    Employee Dashboard
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Track your assigned tasks and sprint progress
                  </p>
                </div>
                <span className="px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-2">
                  {profile?.role}
                </span>
              </div>

              {/* PROFILE CARDS - Now matches Manager layout (4 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <InfoCard
                  icon={<User className="text-blue-500 w-5 h-5" />}
                  title="Name"
                  value={profile?.name || "-"}
                />
                <InfoCard
                  icon={<Mail className="text-purple-500 w-5 h-5" />}
                  title="Email"
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

              {/* ACTION SECTIONS */}
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Current Focus</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PlaceholderCard 
                  title="My Tasks" 
                  icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
                  description="View and update the status of your current tickets."
                  badge="4 Active"
                />
                <PlaceholderCard 
                  title="Sprint Progress" 
                  icon={<Activity className="w-6 h-6 text-emerald-600" />}
                  description="See how the current sprint is trending toward the goal."
                  badge="Day 5 of 14"
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
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
          {icon}
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
      </div>
      <h3 className="text-[16px] font-bold text-gray-800 truncate">
        {value}
      </h3>
    </div>
  );
}

function PlaceholderCard({ title, icon, description, badge }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:border-blue-200 transition-all cursor-default">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gray-50 rounded-xl">
          {icon}
        </div>
        {badge && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed mb-6">
        {description}
      </p>
      <div className="w-full bg-gray-100 h-24 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
        <p className="text-xs text-gray-400 font-medium italic underline underline-offset-4">
          Real-time data stream connecting...
        </p>
      </div>
    </div>
  );
}
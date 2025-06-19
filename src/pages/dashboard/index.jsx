import { useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import DashboardLayout from "@/components/DashboardLayout";
import { getUserFromToken } from "@/utils/extractUserFromToken";
import AdminDashboard from "./AdminDashboard";
import CitizenDashboard from "./CitizenDashboard";
import MaintenanceCompanyDashboard from "./MaintenanceCompanyDashboard";
import GovtBodyCompanyDashboard from "./GovtBodyDashboard";
import { useUserRole } from "@/contexts/UserRoleContexts";

export default function AnalyticsPage() {
  useAuthGuard();
  const [dashboardData, setDashboardData] = useState(null);
  const { role, loading: roleLoading } = useUserRole(); // Use context role

  useEffect(() => {
    const userData = getUserFromToken();

    fetch(`${backendURL}/dashboard?user_id=${userData.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data.dashboard);
        // Remove role setting here
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <DashboardLayout>
      <main className="py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            {dashboardData ? (
              <>
                <h2 className="text-3xl font-bold mb-2">{dashboardData.title}</h2>
                <p className="text-gray-600">{dashboardData.description}</p>
              </>
            ) : (
              <p>Loading dashboard...</p>
            )}
          </div>

          {role === "administrator" && <AdminDashboard />}
          {role === "citizen" && <CitizenDashboard />}
          {role === "maintenance_company" && <MaintenanceCompanyDashboard />}
          {role === "govt_body" && <GovtBodyCompanyDashboard />}
        </div>
      </main>
    </DashboardLayout>
  );
}
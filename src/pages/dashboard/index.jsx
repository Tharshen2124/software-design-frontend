import { useEffect, useState, useMemo } from "react"
import { backendURL } from "@/utils/env"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import { getUserFromToken } from "@/utils/extractUserFromToken";
import AdminDashboard from "./AdminDashboard";
import CitizenDashboard from "./CitizenDashboard";
import MaintenanceCompanyDashboard from "./MaintenanceCompanyDashboard";
import GovtBodyCompanyDashboard from "./GovtBodyDashboard";

export default function AnalyticsPage() {
    useAuthGuard();

    const [dashboardData, setDashboardData] = useState(null);
    const [role, setRole] = useState(null); 

    useEffect(() => {
        const userData = getUserFromToken();
        console.log("User from token:", userData);

        fetch(`${backendURL}/dashboard?user_id=${userData.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDashboardData(data.dashboard);
                setRole(data.role); 
            })
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <DashboardLayout>
            <main className="py-8">
                <div className="max-w-7xl mx-auto">

                    {/* read data */}
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

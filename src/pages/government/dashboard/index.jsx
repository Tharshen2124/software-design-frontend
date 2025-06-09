import { useEffect, useState, useMemo } from "react"
import { backendURL } from "@/utils/env"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import SummaryPages from "@/components/AnalyticsDashboard/Summary";
import { getUserFromToken } from "@/utils/extractUserFromToken";

export default function AnalyticsPage() {
    useAuthGuard()
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(()=>{
        const user = getUserFromToken();

        fetch(`${backendURL}/dashboard?user_id=${user.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setDashboardData(data.dashboard)
        })
        .catch(err => console.error("Error:", err));
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
                    
                    {/* read analytics' summary */}
                    <SummaryPages />

                    {/* complaints over time chart */}

                </div>
            </main>
        </DashboardLayout>
    )
}
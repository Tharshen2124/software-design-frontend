import { useEffect, useState, useMemo } from "react"
import { backendURL } from "@/utils/env"
import DashboardLayout from "@/components/DashboardLayout"
import SummaryPages from "@/components/AnalyticsDashboard/Summary";

export default function AnalyticsPage() {
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(()=>{
        fetch(`${backendURL}/dashboard/`)
        .then((res) => res.json())
        .then((data) => {
            setDashboardData(data.dashboard)
        })
        .catch((err) => {
            console.error("Failed to render:", err);
            alert("APIERROR: Failed rendering dashboard.");
        });
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
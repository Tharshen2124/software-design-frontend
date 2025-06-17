import ComplaintsOverTimeChart from "@/components/AnalyticsDashboard/ComplaintsOverTime";
import StatusDistributionChart from "@/components/AnalyticsDashboard/StatusDistributionPieChart";
import StatusBreakdown from "@/components/AnalyticsDashboard/StatusBreakdown";
import SummaryPages from "@/components/AnalyticsDashboard/Summary";

export default function AdminDashboard() {
    return(
        <>
            {/* read analytics' summary */}
            <SummaryPages />

            {/* complaints over time chart */}
            <ComplaintsOverTimeChart />

            {/* status distribution */}
            <StatusDistributionChart />

            {/* pie chart breakdown */}
            <StatusBreakdown />
        </>
    )
}
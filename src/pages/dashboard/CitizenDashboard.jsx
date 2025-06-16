import SummaryPages from "@/components/AnalyticsDashboard/Summary";
import ComplaintsOverTimeChart from "@/components/AnalyticsDashboard/ComplaintsOverTime";

export default function CitizenDashboard() {
    return(
        <>
            <SummaryPages />
            <ComplaintsOverTimeChart />
        </>
    )
}
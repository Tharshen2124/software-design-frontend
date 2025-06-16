import { ProjectSummaryPages } from "@/components/AnalyticsDashboard/Summary";
import { ProjectsOverTimeChart } from "@/components/AnalyticsDashboard/ComplaintsOverTime";
import {ProjectsStatusDistributionChart} from "@/components/AnalyticsDashboard/StatusDistributionPieChart";
import {ProjectsStatusBreakdown} from "@/components/AnalyticsDashboard/StatusBreakdown";

export default function MaintenanceCompanyDashboard() {
    return(
        <>
            <ProjectSummaryPages />
            <ProjectsOverTimeChart />
            <ProjectsStatusDistributionChart />
            <ProjectsStatusBreakdown />
        </>
    )
}
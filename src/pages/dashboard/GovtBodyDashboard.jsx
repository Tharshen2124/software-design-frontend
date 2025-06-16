import { GovtProjectSummaryPages } from "@/components/AnalyticsDashboard/Summary";
import { ProjectsOverTimeChart } from "@/components/AnalyticsDashboard/ComplaintsOverTime";
import { GovtProjectsStatusDistributionChart } from "@/components/AnalyticsDashboard/StatusDistributionPieChart";
import {ProjectsStatusBreakdown} from "@/components/AnalyticsDashboard/StatusBreakdown";

export default function GovtBodyCompanyDashboard() {
    return(
        <>
            <GovtProjectSummaryPages />
            <ProjectsOverTimeChart />
            <GovtProjectsStatusDistributionChart />
            <ProjectsStatusBreakdown />
        </>
    )
}
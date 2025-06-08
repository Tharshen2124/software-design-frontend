import { useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { summaryConfig } from "./AnalyticsMapping";
import SummaryCards from "@/components/AnalyticsDashboard/SummaryCards";

export default function SummaryPages() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetch(`${backendURL}/dashboard/`)
      .then((res) => res.json())
      .then((data) => {
        setAnalyticsData(data.analytics.summary);
      })
      .catch((err) => {
        console.error("Failed to render:", err);
        alert("APIERROR: Failed rendering analytics.");
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(summaryConfig).map(
        ([key, { label, icon: Icon, className, color }]) => (
          <SummaryCards
            key={key}
            title={label}
            value={analyticsData?.[key] ?? 0}
            icon={<Icon className={`h-6 w-6 ${className}`} />}
            color={color}
          />
        )
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { summaryConfig, summaryProject, GovtSummaryProject } from "./AnalyticsMapping";
import SummaryCards from "@/components/AnalyticsDashboard/SummaryCards";
import { getUserFromToken } from "@/utils/extractUserFromToken";


export default function SummaryPages() {
  const [analyticsData, setAnalyticsData] = useState(null);

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
      setAnalyticsData(data.analytics.summary)
    })
    .catch(err => console.error("Error:", err));
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

export function ProjectSummaryPages() {
  const [analyticsData, setAnalyticsData] = useState(null);

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
      setAnalyticsData(data.analytics.summary)
    })
    .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(summaryProject).map(
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

export function GovtProjectSummaryPages() {
  const [analyticsData, setAnalyticsData] = useState(null);

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
      setAnalyticsData(data.analytics.summary)
    })
    .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {Object.entries(GovtSummaryProject).map(
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
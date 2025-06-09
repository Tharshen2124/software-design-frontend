import { useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { statusColorMap } from "./AnalyticsMapping";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { getUserFromToken } from "@/utils/extractUserFromToken";

export default function StatusBreakdown() {
  useAuthGuard();
  const [chartData, setChartData] = useState([]);
  const [resolutionRate, setResolutionRate] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);

  useEffect(() => {
    const user = getUserFromToken();

    fetch(`${backendURL}/dashboard?user_id=${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const breakdown = data.analytics.status_breakdown;
        const summary = data.analytics.summary;

        // Map breakdown to chartData format
        const formattedData = Object.entries(breakdown).map(([key, value]) => {
          const cleanKey = key.replace("_percentage", "");
          const meta = statusColorMap[cleanKey];

          return {
            name: meta?.name ?? cleanKey,
            value: typeof value === "string" ? parseFloat(value.replace("%", "")) : Number(value),
            color: meta?.color ?? "#ccc",
          };
        });

        setChartData(formattedData);

        // Set total complaints from summary.total
        setTotalComplaints(summary.total);

        // Set resolution rate from backend (parse if string)
        let rate = data.analytics.resolution_rate;
        if (typeof rate === "string") {
          rate = parseFloat(rate.replace("%", ""));
        }
        setResolutionRate(rate);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <div className="mt-6 pt-6 border-t border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 mb-2">Total Complaints</span>
          <span className="text-lg font-bold text-gray-900">{totalComplaints}</span>
        </div>
      </div>

      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-l font-bold text-gray-900">Resolution Rate</h3>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${resolutionRate}%` }}
            />
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">{resolutionRate}%</span>
        </div>
      </div>
    </div>
  );
}

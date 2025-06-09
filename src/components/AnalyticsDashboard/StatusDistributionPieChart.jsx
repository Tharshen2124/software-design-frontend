import { useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { statusColorMap } from "./AnalyticsMapping";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { getUserFromToken } from "@/utils/extractUserFromToken";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

export default function StatusDistributionChart() {
  useAuthGuard();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const user = getUserFromToken();

    fetch(`${backendURL}/dashboard?user_id=${user.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const breakdown = data.analytics.status_breakdown;
        
        // Transform to chart-ready format
        const formattedData = Object.entries(breakdown).map(([key, value]) => {
            const cleanKey = key.replace("_percentage", "");
            const meta = statusColorMap[cleanKey];

            return {
                name: meta?.name ?? cleanKey, // label in chart
                value: typeof value === "string" ? parseFloat(value.replace("%", "")) : Number(value),
                fill: meta?.color ?? "#ccc",  // color of each pie segment
            };
        });

        setChartData(formattedData);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Complaint Status Distribution
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    style={{ pointerEvents: 'none' }}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

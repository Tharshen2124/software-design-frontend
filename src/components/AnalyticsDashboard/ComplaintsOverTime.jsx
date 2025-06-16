import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/extractUserFromToken";
import { backendURL } from "@/utils/env";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ComplaintsOverTimeChart() {
  const [timeFilter, setTimeFilter] = useState("30days");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [analyticsData, setAnalyticsData] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const user = getUserFromToken();
    const baseURL = `${backendURL}/dashboard?user_id=${user.id}`;
    const url =
      timeFilter === "month"
        ? `${baseURL}&timeline=${months[selectedMonth - 1]}&year=${selectedYear}`
        : `${baseURL}&timeline=${timeFilter}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const rawData = data.analytics.complaints_over_time || {};
        const formatted = Object.entries(rawData).map(([date, complaints]) => ({
          formattedDate: date,
          complaints,
        }));
        setAnalyticsData(formatted);
      })
      .catch((err) => console.error("Error:", err));
  }, [timeFilter, selectedMonth, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Complaints Over Time
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="month">Specific Month</option>
            </select>
          </div>

          {timeFilter === "month" && (
            <>
              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(Number.parseInt(e.target.value))
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(Number.parseInt(e.target.value))
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="formattedDate"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#374151" }}
            />
            <Bar
              dataKey="complaints"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Complaints"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProjectsOverTimeChart() {
  const [timeFilter, setTimeFilter] = useState("30days");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [analyticsData, setAnalyticsData] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const user = getUserFromToken();
    const baseURL = `${backendURL}/dashboard?user_id=${user.id}`;
    const url =
      timeFilter === "month"
        ? `${baseURL}&timeline=${months[selectedMonth - 1]}&year=${selectedYear}`
        : `${baseURL}&timeline=${timeFilter}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const rawData = data.analytics.complaints_over_time || {};
        const formatted = Object.entries(rawData).map(([date, complaints]) => ({
          formattedDate: date,
          complaints,
        }));
        setAnalyticsData(formatted);
      })
      .catch((err) => console.error("Error:", err));
  }, [timeFilter, selectedMonth, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Assigned Tasks Over Time
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="month">Specific Month</option>
            </select>
          </div>

          {timeFilter === "month" && (
            <>
              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(Number.parseInt(e.target.value))
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(Number.parseInt(e.target.value))
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="formattedDate"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#374151" }}
            />
            <Bar
              dataKey="complaints"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Complaints"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
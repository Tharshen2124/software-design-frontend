import { useEffect, useState, useMemo } from "react"
import { Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, Hand, FileInput, FileCheck, Pickaxe } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import DashboardLayout from "@/components/DashboardLayout"
import SummaryCards from "@/components/AnalyticsDashboard/SummaryCards"

// Mock data for complaints over the last 30 days
const generateMockData = () => {
  const data = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const complaints = Math.floor(Math.random() * 15) + 5 // Random between 5-20 complaints per day

    data.push({
      date: date.toISOString().split("T")[0],
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      complaints,
      formattedDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    })
  }

  return data
}

// Mock data for complaint status
const statusData = [
  { name: "Open", value: 45, color: "#ef4444" },
  { name: "In Progress", value: 32, color: "#f59e0b" },
  { name: "Resolved", value: 78, color: "#10b981" },
  { name: "Closed", value: 23, color: "#6b7280" },
]


// function starts from here
export default function AnalyticsPage() {

  // for complaints over time
  const [timeFilter, setTimeFilter] = useState("30days") // default 30 days
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const mockData = useMemo(() => generateMockData(), []) // let it be for now

  // for dashboard's heading and analytics content
  const [dashboardData, setDashboardData] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)

  // for error handling
  const [error, setError] = useState(null)

  // call API
  useEffect(() => {
    fetch(`${backendURL}/dashboard/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("APIError: Failed to fetch data")
        }
        return res.json()
      })
      .then((data) => {
        setDashboardData(data.dashboard)
        setAnalyticsData(data.analytics)
      })
      .catch((err) => {
        setError("Failed to fetch analytics.")
        console.error(err)
      })
  }, [])

  // an array of complaints over time
  const complaintsArray = useMemo(() => {
    if (!analyticsData?.complaints_over_time) return []

    return Object.entries(analyticsData.complaints_over_time).map(([date, complaints]) => {
      const d = new Date(date)
      return {
        date,
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        complaints,
      }
    })
  }, [analyticsData])

  // Filter data based on selected time period, let it be for now
  const filteredData = useMemo(() => {
    if (timeFilter === "7days") {
      return complaintsArray.slice(-7)
    } else if (timeFilter === "30days") {
      return complaintsArray
    } else if (timeFilter === "month") {
      return complaintsArray.filter(
        (item) => item.month === selectedMonth && item.year === selectedYear
      )
    }
    return complaintsArray
  }, [timeFilter, selectedMonth, selectedYear, complaintsArray])


  const totalDailyComplaints = filteredData.reduce((sum, item) => sum + item.complaints, 0)
  const averageDailyComplaints =
    filteredData.length > 0 ? Math.round(totalDailyComplaints / filteredData.length) : 0

  // let this be for now
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
  ]

  const currentYear = new Date().getFullYear()
  const years = [currentYear - 2, currentYear - 1, currentYear]

  return (
    <DashboardLayout>
      <main className="py-8">
        {error && <p>{error}</p>}
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{dashboardData.title}</h1>
            <p className="text-gray-600">{dashboardData.description}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCards
                title="Total Complaints"
                value={totalComplaints}
                icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
                color="bg-blue-100"
            />
            <SummaryCards
                title="Pending"
                value={45}
                icon={<Hand className="h-6 w-6 text-yellow-600" />}
                color="bg-yellow-100"
            />
            <SummaryCards
                title="Filtered"
                value={32}
                icon={<FileInput className="h-6 w-6 text-orange-600" />}
                color="bg-orange-100"
            />
            <SummaryCards
                title="Approved"
                value={24}
                icon={<FileCheck className="h-6 w-6 text-purple-600" />}
                color="bg-purple-100"
            />
            <SummaryCards
                title="In Progress"
                value={39}
                icon={<Pickaxe className="h-6 w-6 text-cyan-600" />}
                color="bg-cyan-100"
            />
            <SummaryCards
                title="Resolved"
                value={12}
                icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                color="bg-green-100"
            />
          </div>

          {/* Complaints Over Time Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Complaints Over Time</h2>
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
                      onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value))}
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
                      onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
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
                <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="formattedDate" stroke="#6b7280" fontSize={12} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: "#374151" }}
                  />
                  <Bar dataKey="complaints" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Complaints" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Complaint Status Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Complaint Status Distribution</h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
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

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Status Breakdown</h2>

              <div className="space-y-4">
                {statusData.map((status, index) => {
                  const percentage = Math.round((status.value / totalComplaints) * 100)
                  return (
                    <div key={status.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: status.color }}></div>
                        <span className="text-sm font-medium text-gray-700">{status.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{percentage}%</span>
                        <span className="text-sm font-bold text-gray-900">{status.value}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Complaints</span>
                  <span className="text-lg font-bold text-gray-900">{totalComplaints}</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Resolution Rate</h3>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round(((statusData[2].value + statusData[3].value) / totalComplaints) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {Math.round(((statusData[2].value + statusData[3].value) / totalComplaints) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}
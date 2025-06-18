import { useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { useEffect } from "react"
import Loading from "@/components/Loading"
import { backendURL } from "@/utils/env"
import { getUserFromToken } from "@/utils/extractUserFromToken"
import PendingProjectsTable from "@/components/MaintenanceProjectTable/pendingProjectsTable"
import InProgressProjectsTable from "@/components/MaintenanceProjectTable/inProgressProjectsTables"
import AccessControl from "@/components/AccessControl"

export default function AdminInvitePage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [isLoading, setIsLoading] = useState(true)
  const [pendingProjects, setPendingProjects] = useState([])
  const [inProgressProjects, setInProgressProjects] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const user_id = "b15ed534-ad32-418d-82bc-020b9e0a6122"
    // const user = getUserFromToken()

    const fetchMaintenanceProjects = async () => {
      try {
        const response = await fetch(`${backendURL}/maintenance/company/${user_id}`)
        const data = await response.json()
        setPendingProjects(data.pending_projects || [])
        setInProgressProjects(data.in_progress_projects || [])
      } catch (error) {
        console.error("Error fetching maintenance projects:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMaintenanceProjects()
  }, [])

  if (isLoading) return <Loading />

  return (
      <DashboardLayout>
        <AccessControl allowedRole="maintenance_company">
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Maintenance Project</h1>
            <p className="text-gray-600">Manage your maintenance projects effectively.</p>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-4 px-2 font-medium ${
                  activeTab === "pending"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Pending Projects
              </button>
              <button
                onClick={() => setActiveTab("in-progress")}
                className={`pb-4 px-2 font-medium ${
                  activeTab === "in-progress"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                In Progress Projects
              </button>
            </div>
          </div>

          {/* Pending Projects */}
          {activeTab === "pending" && (
            pendingProjects && pendingProjects.length > 0 ? (
            <PendingProjectsTable pendingProjects={pendingProjects} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending projects available.</p>
            </div>
          ) 
          )}
        </div>

        {/* In Progress Projects */}
        {activeTab === "in-progress" && (
          inProgressProjects && inProgressProjects.length > 0 ? (
            <InProgressProjectsTable inProgressProjects={inProgressProjects} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No in-progress projects available.</p>
            </div>
          ) 
          )}
          </AccessControl>
      </DashboardLayout>
  )
}
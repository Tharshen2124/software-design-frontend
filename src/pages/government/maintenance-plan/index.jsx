import { useState, useEffect } from "react"
import { backendURL } from "@/utils/env"
import DashboardLayout from "@/components/DashboardLayout"
import MaintenancePlanTable from "@/components/MaintenancePlanTable"
import PlanDetailsModal from "@/components/PlanDetailsModal"
import Loading from "@/components/Loading"
import AccessControl from "@/components/AccessControl"

export default function MaintenancePlansView() {
  const [maintenanceProjects, setMaintenanceProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from your API
  useEffect(() => {
    const fetchMaintenanceProjects = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${backendURL}/maintenance/all/`)
        const data = await response.json()
        console.log("API Response:", data) // For debugging
        setMaintenanceProjects(data.maintenance_projects)
      } catch (error) {
        console.error("Error fetching maintenance projects:", error)
        setError(`Failed to load maintenance projects: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchMaintenanceProjects()
  }, [])

  const formatStatus = (status) => {
    switch (status) {
      case "in_progress":
        return "In Progress"
      case "resolved":
        return "Completed"
      case "pending":
        return "Pending"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const filteredProjects = maintenanceProjects.filter((project) => {
    const matchesSearch =
      project.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.maintenance_companies.users.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.maintenance_project_id.toString().includes(searchTerm.toLowerCase())

    const formattedStatus = formatStatus(project.status)
    const matchesStatus = statusFilter === "All" || formattedStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  const getStatusCounts = () => {
    return {
      total: maintenanceProjects.length,
      inProgress: maintenanceProjects.filter((p) => p.status === "in_progress").length,
      pending: maintenanceProjects.filter((p) => p.status === "pending").length,
      completed: maintenanceProjects.filter((p) => p.status === "resolved").length,
    }
  }

  const statusCounts = getStatusCounts()

  if (loading) return <Loading />

  if (error) {
    return (
      <DashboardLayout>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-lg font-medium mb-2">Error Loading Data</div>
              <div className="text-gray-500 mb-4">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Retry
              </button>
            </div>
          </div>
      </DashboardLayout>
      
    )
  }

  return (
    <DashboardLayout>
      <AccessControl allowedRole="govt_body">
      <main>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Projects</h1>
          <p className="text-gray-600 mt-1">View and manage all maintenance projects assigned to contractors</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by project title, company, or ID..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {maintenanceProjects.length > 0 ? (
            <MaintenancePlanTable projects={filteredProjects} onViewDetails={handleViewDetails} />
          ) : (
            <div className="text-center py-8 text-gray-500">No maintenance projects found.</div>
          )}
        </div>

<<<<<<< HEAD
        {/* Details Modal */}
        {selectedProject && <PlanDetailsModal project={selectedProject} onClose={handleCloseModal} />}
=======
>>>>>>> 2bedc9c57f4dbd7e2569476e9a146265fac4c477
        {/* Details Modal */}
        {selectedPlan && <PlanDetailsModal plan={selectedPlan} onClose={handleCloseModal} />}
      </main>
      </AccessControl>
<<<<<<< HEAD
=======
      {/* Details Modal */}
      {selectedProject && <PlanDetailsModal project={selectedProject} onClose={handleCloseModal} />}
>>>>>>> 2bedc9c57f4dbd7e2569476e9a146265fac4c477
    </DashboardLayout>
  )
}

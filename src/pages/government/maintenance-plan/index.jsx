import { useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import MaintenancePlanTable from "@/components/MaintenancePlanTable"
import PlanDetailsModal from "@/components/PlanDetailsModal"
import AccessControl from "@/components/AccessControl"

export default function MaintenancePlansView() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredPlans = maintenancePlans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.assignedCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || plan.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan)
  }

  const handleCloseModal = () => {
    setSelectedPlan(null)
  }

  return (
    <DashboardLayout>
      <AccessControl allowedRole="govt_body">
      <main>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Plans</h1>
          <p className="text-gray-600 mt-1">View and manage all maintenance plans assigned to contractors</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by plan title, company, or ID..."
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{maintenancePlans.length}</div>
            <div className="text-sm text-gray-600">Total Plans</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {maintenancePlans.filter((p) => p.status === "In Progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-600">
              {maintenancePlans.filter((p) => p.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">
              {maintenancePlans.filter((p) => p.status === "Completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <MaintenancePlanTable plans={filteredPlans} onViewDetails={handleViewDetails} />
        </div>

        {/* Details Modal */}
        {selectedPlan && <PlanDetailsModal plan={selectedPlan} onClose={handleCloseModal} />}
      </main>
      </AccessControl>
    </DashboardLayout>
  )
}
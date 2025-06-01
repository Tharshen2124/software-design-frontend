import { useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import MaintenancePlanTable from "@/components/MaintenancePlanTable"
import PlanDetailsModal from "@/components/PlanDetailsModal"

const maintenancePlans = [
  {
    id: "MP001",
    title: "Main Street Pothole Repairs",
    description: "Comprehensive repair of multiple potholes along Main Street corridor",
    assignedCompany: "City Works Construction",
    status: "In Progress",
    priority: "High",
    estimatedCompletion: "2025-06-15",
    createdDate: "2025-05-20",
    budget: "$15,000",
    assignedComplaints: [
      {
        id: "c1",
        title: "Pothole at Subang Jaya is Crazy",
        reportedBy: "Timothy Faige",
        date: "26th May 2025",
        location: "123 Main Street",
        description: "Large pothole causing vehicle damage",
      },
      {
        id: "c2",
        title: "Dangerous pothole near intersection",
        reportedBy: "Sarah Chen",
        date: "27th May 2025",
        location: "Main St & 1st Ave",
        description: "Deep pothole creating safety hazard",
      },
    ],
    contactPerson: "John Martinez",
    contactPhone: "+1-555-0123",
    contactEmail: "j.martinez@cityworks.com",
  },
  {
    id: "MP002",
    title: "Oak Avenue Street Light Maintenance",
    description: "Repair and replacement of malfunctioning street lights on Oak Avenue",
    assignedCompany: "Bright Light Solutions",
    status: "Pending",
    priority: "Medium",
    estimatedCompletion: "2025-06-30",
    createdDate: "2025-05-22",
    budget: "$8,500",
    assignedComplaints: [
      {
        id: "c3",
        title: "Broken street light",
        reportedBy: "Mike Johnson",
        date: "24th May 2025",
        location: "456 Oak Avenue",
        description: "Street light not working for 3 days",
      },
      {
        id: "c4",
        title: "Flickering street light",
        reportedBy: "Sarah Williams",
        date: "25th May 2025",
        location: "460 Oak Avenue",
        description: "Street light flickering causing visibility issues",
      },
    ],
    contactPerson: "Lisa Thompson",
    contactPhone: "+1-555-0456",
    contactEmail: "l.thompson@brightlight.com",
  },
  {
    id: "MP003",
    title: "Elm Street Sidewalk Repairs",
    description: "Fix cracks and uneven surfaces on Elm Street sidewalks",
    assignedCompany: "Urban Infrastructure Ltd",
    status: "Completed",
    priority: "Low",
    estimatedCompletion: "2025-05-30",
    createdDate: "2025-05-10",
    budget: "$12,000",
    assignedComplaints: [
      {
        id: "c5",
        title: "Sidewalk crack creating tripping hazard",
        reportedBy: "Robert Brown",
        date: "20th May 2025",
        location: "789 Elm Street",
        description: "Large crack in sidewalk creating safety concern",
      },
    ],
    contactPerson: "David Kim",
    contactPhone: "+1-555-0789",
    contactEmail: "d.kim@urbaninfra.com",
  },
  {
    id: "MP004",
    title: "Park Road Drainage System",
    description: "Install and repair drainage systems to prevent flooding",
    assignedCompany: "AquaFlow Engineering",
    status: "In Progress",
    priority: "High",
    estimatedCompletion: "2025-07-15",
    createdDate: "2025-05-25",
    budget: "$25,000",
    assignedComplaints: [
      {
        id: "c6",
        title: "Flooding during rain",
        reportedBy: "Maria Garcia",
        date: "28th May 2025",
        location: "Park Road",
        description: "Street floods every time it rains heavily",
      },
    ],
    contactPerson: "Alex Rodriguez",
    contactPhone: "+1-555-0321",
    contactEmail: "a.rodriguez@aquaflow.com",
  },
]

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
    </DashboardLayout>
  )
}
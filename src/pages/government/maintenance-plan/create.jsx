import { useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import ComplaintItem from "@/components/ComplaintItem"

const initialComplaints = [
  {
    id: "c1",
    title: "Pothole at Subang Jaya is Crazy",
    reportedBy: "Timothy Faige",
    date: "26th May 2025",
    selected: false,
  },
  {
    id: "c2",
    title: "Pothole at Subang Jaya is Crazy",
    reportedBy: "Timothy Faige",
    date: "26th May 2025",
    selected: false,
  },
  {
    id: "c3",
    title: "Pothole at Subang Jaya is Crazy",
    reportedBy: "Timothy Faige",
    date: "26th May 2025",
    selected: false,
  },
]

export default function CreateMaintenancePlan() {
  const [complaints, setComplaints] = useState(initialComplaints)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
  })

  const assignees = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Michael Wong" },
    { id: "4", name: "Priya Patel" },
    { id: "5", name: "David Chen" },
  ]

  const handleComplaintSelect = (id) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, selected: !complaint.selected } : complaint,
      ),
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const isFormValid = () => {
    // Check if all form fields are filled and at least one complaint is selected
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.assignee !== "" &&
      complaints.some((complaint) => complaint.selected)
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the form submission with the selected complaints
    const selectedComplaints = complaints.filter((complaint) => complaint.selected)
    console.log("Form data:", formData)
    console.log("Selected complaints:", selectedComplaints)
    // Reset form and selections after submission
    setFormData({ title: "", description: "", assignee: "" })
    setComplaints(complaints.map((c) => ({ ...c, selected: false })))
  }

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <main className="px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Maintenance Plan</h1>
        <p className="text-gray-600 mt-1 mb-8">
          Create a plan for maintenance companies to work on!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Approved Complaints */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Approved Complaints</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search complaints..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <ComplaintItem
                  key={complaint.id}
                  complaint={complaint}
                  onSelect={() => handleComplaintSelect(complaint.id)}
                />
              ))}
            </div>
          </div>

          {/* Right column - Create Plan Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Assignee:
                  </label>
                  <select
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select an assignee</option>
                    {assignees.map((assignee) => (
                      <option key={assignee.id} value={assignee.id}>
                        {assignee.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`px-6 py-3 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isFormValid()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </DashboardLayout>  
    )
}
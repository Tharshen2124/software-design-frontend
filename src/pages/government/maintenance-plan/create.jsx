import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import ComplaintItem from "@/components/ComplaintItem"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { backendURL } from "@/utils/env"
import Loading from "@/components/Loading"

export default function CreateMaintenancePlan() {
  useAuthGuard()
  const [complaints, setComplaints] = useState([])
  const [assignees, setAssignees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // retrieve approved complaints from backend
    async function fetchComplaints() {
      try {
        const response = await fetch(`${backendURL}/complaints/approved/`)
        const data = await response.json()
        console.log("Fetched complaints:", data)
        setComplaints(data.approved_complaints.map(complaint => ({ ...complaint, selected: false })))
        setAssignees(data.maintenance_companies)
      } catch (error) {
        console.error("Error fetching complaints:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const handleComplaintSelect = (complaint_id) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(c =>
        c.complaint_id === complaint_id ? { ...c, selected: !c.selected } : c
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log("handleInputChange", name, value)
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
    formData.complaint_ids = selectedComplaints.map((c) => c.complaint_id).join(",")

    console.log("maintenance company id", formData.assignee)

    const uploadFormData = new FormData()
    uploadFormData.append("project_title", formData.title)
    uploadFormData.append("project_description", formData.description)
    uploadFormData.append("maintenance_company_id", formData.assignee)
    uploadFormData.append("complaint_ids", formData.complaint_ids)
    uploadFormData.append("status", "pending")

    console.log("Submitting maintenance plan with data:", uploadFormData)

    try {
      const response = fetch(`${backendURL}/maintenance/create/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: uploadFormData
      })

      if(response.ok) {
        setFormData({
          title: "",
          description: "",
          assignee: "",
        })
        setComplaints(complaints.map(c => ({ ...c, selected: false }))) // Reset selected complaints
      }
    } catch (error) {
      console.error("Error submitting maintenance plan:", error)
      setIsError(true)
      return
    }
    alert("Maintenance plan submitted successfully")
  }
 
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.complaint_title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) return <Loading />

  if (isError) {
    return (
      <DashboardLayout>
        <main className="px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Maintenance Plan</h1>
          <p className="text-red-600 mt-2">
            Something went wrong while fetching complaints. Please try again later.
          </p>
        </main>
      </DashboardLayout>
    )
  }

  if (complaints.length === 0) {
    return (
      <DashboardLayout>
        <main className="px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Maintenance Plan</h1>
          <p className="text-gray-600 mt-1 mb-8">
            No approved complaints found. Please ensure there are approved complaints to create a maintenance plan.
          </p>
        </main>
      </DashboardLayout>
    )
  }

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
              {filteredComplaints && filteredComplaints.map((complaint) => (
                <ComplaintItem
                  key={complaint.complaint_id}
                  complaint={complaint}
                  onSelect={() => handleComplaintSelect(complaint.complaint_id)}
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
                      <option key={assignee.maintenance_company_id} value={assignee.maintenance_company_id}>
                        {assignee.users.full_name}
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
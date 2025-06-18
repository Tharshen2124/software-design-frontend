import Image from "next/image"

export default function PlanDetailsModal({ project, onClose }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    return new Date(dateString).toLocaleDateString()
  }

  const getEstimatedCompletion = () => {
    if (project.status === "resolved" && project.resolved_at) {
      return formatDate(project.resolved_at)
    }
    // Add 30 days to created date as estimated completion
    const created = new Date(project.created_at)
    const estimated = new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000)
    return estimated.toLocaleDateString()
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.project_title}</h2>
            <p className="text-gray-600">Project ID: #{project.maintenance_project_id}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                    >
                      {formatStatus(project.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{formatDate(project.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. Completion:</span>
                    <span>{getEstimatedCompletion()}</span>
                  </div>
                  {project.resolved_at && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resolved:</span>
                      <span>{formatDate(project.resolved_at)}</span>
                    </div>
                  )}
                  {project.follow_up && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Follow-up:</span>
                      <span>{project.follow_up}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contractor Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    {project.maintenance_companies.users.profile_picture && (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={project.maintenance_companies.users.profile_picture || "/placeholder.svg"}
                        alt=""
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{project.maintenance_companies.users.full_name}</div>
                      <div className="text-sm text-gray-600">{project.maintenance_companies.users.role}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <div className="font-medium text-blue-600">{project.maintenance_companies.users.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Company ID:</span>
                    <div className="font-medium text-sm text-gray-700">{project.maintenance_company_id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{project.project_description}</p>
            </div>
          </div>

          {/* Project Image */}
          {project.project_image_url && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Image</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <Image
                  src={project.project_image_url || "/placeholder.svg"}
                  alt="Project"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            </div>
          )}

          {/* Assigned Complaints */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assigned Complaints ({project.complaints.length})
            </h3>
            <div className="space-y-4">
              {project.complaints.map((complaint) => (
                <div key={complaint.complaint_id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{complaint.complaint_title}</h4>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)}`}
                      >
                        {formatStatus(complaint.status)}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(complaint.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{complaint.complaint_description}</p>
                  {complaint.complaint_image_url && (
                    <div className="mb-2">
                      <img
                        src={complaint.complaint_image_url || "/placeholder.svg"}
                        alt="Complaint"
                        className="max-w-xs h-auto rounded-md"
                      />
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Complaint ID: #{complaint.complaint_id}</span>
                    <span>Citizen ID: {complaint.citizen_id}</span>
                  </div>
                  {complaint.resolved_at && (
                    <div className="text-sm text-green-600 mt-1">Resolved: {formatDate(complaint.resolved_at)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

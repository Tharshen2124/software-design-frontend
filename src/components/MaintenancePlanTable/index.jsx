import Image from "next/image"

export default function MaintenancePlanTable({ projects, onViewDetails }) {
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
    return new Date(dateString).toLocaleDateString()
  }

  const getEstimatedCompletion = (createdAt, status) => {
    if (status === "resolved") {
      return "Completed"
    }
    // Add 30 days to created date as estimated completion
    const created = new Date(createdAt)
    const estimated = new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000)
    return estimated.toLocaleDateString()
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Complaints
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Est. Completion
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.maintenance_project_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{project.maintenance_project_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{project.project_title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {project.maintenance_companies.users.profile_picture && (
                    <Image
                      className="h-8 w-8 rounded-full mr-2"
                      src={project.maintenance_companies.users.profile_picture || "/placeholder.svg"}
                      alt="profile image"
                      width={32}
                      height={32}
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {project.maintenance_companies.users.full_name}
                    </div>
                    <div className="text-sm text-gray-500">{project.maintenance_companies.users.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                >
                  {formatStatus(project.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {project.complaints.length} complaint{project.complaints.length !== 1 ? "s" : ""}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(project.created_at)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getEstimatedCompletion(project.created_at, project.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onViewDetails(project)}
                  className="border border-blue-600 hover:bg-blue-500 hover:text-white text-blue-600 px-3 py-2 font-semibold rounded-md text-sm transition-colors"
                >
                  More Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">No maintenance projects found matching your criteria.</div>
      )}
    </div>
  )
}
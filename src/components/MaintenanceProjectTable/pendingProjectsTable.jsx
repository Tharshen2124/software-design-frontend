import { backendURL } from "@/utils/env";
import { truncateText } from "@/utils/truncateText";
import { useRouter } from "next/router";

export default function PendingProjectsTable({ pendingProjects }) {
    const router = useRouter();
    function handleViewDetails(projectId) {
        // Logic to view project details
        console.log("View details for project ID:", projectId);
    }

    async function handleInProgress(projectId) {
        const formData = new FormData();
        formData.append('maintenance_project_id', projectId)
        formData.append('status', 'in_progress')
        
        try {
            const response = await fetch(`${backendURL}/maintenance/update/`, {
                method: 'POST',
                headers: { 
                    "Accept": "application/json",
                },
                body: formData
            })

            if (response.ok) {
                alert("Project status updated to In Progress successfully.")
                router.reload()
            }

        } catch (error) {
            console.error("Error updating project status:", error);
            alert("Failed to update project status. Please try again later.");
        }
    }
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
            <thead>
                <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Project Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Project Description</th>
                <th className="text-left py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {pendingProjects && pendingProjects.map((pendingProjects) => (
                <tr key={pendingProjects.maintenance_project_id} className="border-b border-gray-200">
                    <td className="py-4 px-4">{pendingProjects.project_title}</td>
                    <td className="py-4 px-4">{truncateText(pendingProjects.project_description, 40)}</td>
                    <td className="py-4 px-4">
                    <button 
                        onClick={() => router.push(`/maintenance-company/project/${pendingProjects.maintenance_project_id}`)} 
                        className="text-blue-600 hover:underline">
                        More Details
                    </button>
                    </td>
                    <td className="py-4 px-2">
                    <button
                        onClick={() => handleInProgress(pendingProjects.maintenance_project_id)}
                        className="py-2 px-4 bg-yellow-300 hover:bg-yellow-400 active:outline-2 active:outline-yellow-200 text-black font-semibold rounded transition-colors"
                    >
                        Set as In-Progress
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

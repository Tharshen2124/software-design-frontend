import { truncateText } from '@/utils/truncateText'
import { useRouter } from 'next/router';

export default function InProgressProjectsTable({ inProgressProjects }) {
    const router = useRouter()

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
                {inProgressProjects.map((inProgressProject) => (
                <tr key={inProgressProject.maintenance_project_id} className="border-b border-gray-200">
                    <td className="py-4 px-4">{inProgressProject.project_title}</td>
                    <td className="py-4 px-4">{truncateText(inProgressProject.project_description, 40)}</td>
                    <td className="py-4 px-4">
                    <button 
                        onClick={() => router.push(`/maintenance-company/project/${inProgressProject.maintenance_project_id}`)} 
                        className="text-blue-600 hover:underline">
                        More Details      
                    </button>
                    </td>
                    <td className="py-4 px-2">
                    <button
                        onClick={() => router.push(`/maintenance-company/project-update/${inProgressProject.maintenance_project_id}`)}
                        className="py-2 px-4 bg-green-600 hover:bg-green-600 active:outline-2 active:outline-green-300 text-white font-semibold rounded transition-colors"
                    >
                        Set as Completed
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

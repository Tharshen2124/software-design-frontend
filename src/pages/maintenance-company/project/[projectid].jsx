import DashboardLayout from "@/components/DashboardLayout"
import Loading from "@/components/Loading"
import { backendURL } from "@/utils/env"
import { formatDate } from "@/utils/formatDate"
import { ArrowLeft, Calendar, ImageIcon, LetterText, LetterTextIcon, Link, Speech } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ComplaintDetails() {
  const router = useRouter()
  const { projectid } = router.query
  const [complaints, setComplaints] = useState()
  const [project, setProject] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      try {
        const response = await fetch(`${backendURL}/maintenance/project/${projectid}`)
        const data = await response.json()
        
        if(data) {
          setProject(data.maintenance_project)
          setComplaints(data.maintenance_project.complaints)
        }
      } catch (error) {
        alert("Failed to fetch post data. Please try again later.")
        router.back()
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (projectid) {
      getData()
    }
  }, [projectid])

  const handleBack = () => {
    router.back()
  }

  if(isLoading) return <Loading />

  if (!project) {
    return (
        <DashboardLayout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Complaint Not Found</h1>
            <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist or has been removed.</p>
            <Link href="/admin/complaint-approval" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Back to Complaints
            </Link>
          </div>
        </DashboardLayout>
    )
  }
  
  return (
      <DashboardLayout>
        <button onClick={handleBack} className="flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Project Details</h1>

          <div className="flex items-center mb-6 text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              Submitted on: <span className="text-gray-500">{formatDate(project.created_at)}</span>
            </span>
          </div>

          <hr className="border-gray-200 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{project.project_title}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {project.project_description}
          </p>
        </div>
        {complaints && complaints.length > 0 ? (
          <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Complaints</h2>
            <ul className="space-y-4">
              {complaints.map((complaint) => (
                <li key={complaint.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex items-center mb-4">
                    <Speech className="w-6 h-6 text-blue-600 mr-3" />
                    <span className="text-lg font-semibold">{complaint.complaint_title}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{complaint.complaint_description}</p>
                    {complaint.complaint_image_url && (
                      // Show "Attached Image" as a link that opens in a new tab
                      <div className="mb-4">
                        <a
                          href={complaint.complaint_image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <ImageIcon className="w-5 h-5 mr-2" />
                          Attached Image
                        </a>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-8 text-center text-gray-500">
            <p>No complaints found for this project.</p>
          </div>
        )}
        <div>

        </div>
    </DashboardLayout>
  )
}

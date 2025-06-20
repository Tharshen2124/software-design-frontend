import DashboardLayout from "@/components/DashboardLayout"
import Loading from "@/components/Loading"
import { backendURL } from "@/utils/env"
import { formatDate } from "@/utils/formatDate"
import { ArrowLeft, Calendar, ImageIcon, Link } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ComplaintDetails() {
  const router = useRouter()
  const { complaintID } = router.query
  const [complaint, setComplaint] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      try {
        const response = await fetch(`${backendURL}/complaints/custom-admin/${complaintID}`)
        const data = await response.json()
        
        if(data) {
          setComplaint(data.complaint)
        }
      } catch (error) {
        alert("Failed to fetch post data. Please try again later.")
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (complaintID) {
      getData()
    }
  }, [complaintID])

  const handleBack = () => {
    router.back()
  }

  if(isLoading) return <Loading />

  if (!complaint) {
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
          <h1 className="text-3xl font-bold mb-6">Complaint Details</h1>

          <div className="flex items-center mb-4">
            <Image src={`${complaint.citizens.users.profile_picture}` } alt="profile image" width="30" height="30" className="rounded-full mr-2" />
            <span className="font-medium text-md">{complaint.citizens.users.full_name}</span>
          </div>

          <div className="flex items-center mb-6 text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              Submitted on: <span className="text-gray-500">{formatDate(complaint.created_at)}</span>
            </span>
          </div>

          <hr className="border-gray-200 mb-6" />

          <div className={`px-4 py-2 rounded-full mb-6 w-32 text-center font-semibold 
            ${
              complaint.status === 'pending' ? 'bg-yellow-300 text-black' : 
              complaint.status === 'filtered' ? 'bg-orange-600 text-white' :
              complaint.status === 'approved' ? 'bg-blue-500 text-white' : 
              complaint.status === 'in_progress' ? 'bg-indigo-600 text-white' :
              complaint.status === 'resolved' ? 'bg-green-600 text-white' :
              'bg-red-500 text-white'}`}>
            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{complaint.complaint_title}</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            {complaint.complaint_description}
          </p>

          <a href={`${complaint.complaint_image_url}`} target="_blank" className="flex items-center text-blue-600 hover:underline">
            <ImageIcon className="w-5 h-5 mr-2" />
            Attached Image
          </a>
        </div>
    </DashboardLayout>
  )
}

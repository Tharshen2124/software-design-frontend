import DashboardLayout from "@/components/DashboardLayout"
import { backendURL } from "@/utils/env"
import { formatDate } from "@/utils/formatDate"
import { ArrowLeft, Calendar, Link } from "lucide-react"
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

  const handleApprove = async (id) => {
    const formData = new FormData
    formData.append("status", "filtered")

    try {
      const response = await fetch(`${backendURL}/complaints/update-status/${id}/`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      })
      
      if(!response.ok) {
        console.error("error during fetching but not caught", await response.json())
      }
      
      router.push('/admin/complaint-approval')
    } catch(error) {
      alert("Something went wrong! Please try again.")
      console.error('error during fetching', error)
    }
  }

  const handleReject = async (id) => {
    const formData = new FormData
    formData.append("status", "rejected")

    try {
      const response = await fetch(`${backendURL}/complaints/update-status/${id}/`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      })
      
      if(!response.ok) {
        console.error("error during fetching but not caught")
      }
      router.push('/admin/complaint-approval')
    } catch(error) {
      alert("Something went wrong! Please try again.")
      console.error('error during fetching', error)
    }
  }

  if(isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading complaint...</p>
          </div>
        </div>
      </DashboardLayout>    
    )
  }

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
            <Image src={`${complaint.citizens.users.profile_picture}` } alt="profile image" width="40" height="40" className="rounded-full mr-2" />
            <span className="font-medium text-lg">{complaint.citizens.users.full_name}</span>
          </div>

          <div className="flex items-center mb-6 text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              Submitted on: <span className="text-gray-500">{formatDate(complaint.created_at)}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleApprove(complaint.complaint_id)}
              className="py-3 bg-green-600 hover:bg-green-700 active:outline-2 active:outline-green-400 text-white font-semibold rounded transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(complaint.complaint_id)}
              className="py-3 bg-red-600 hover:bg-red-700 active:outline-2 active:outline-red-400 text-white font-semibold rounded transition-colors"
            >
              Reject
            </button>
          </div>

          <hr className="border-gray-200 mb-6" />

          <h2 className="text-2xl font-bold text-gray-800 mb-4">{complaint.complaint_title}</h2>

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

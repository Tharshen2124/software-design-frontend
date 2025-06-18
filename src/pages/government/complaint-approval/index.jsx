import DashboardLayout from "@/components/DashboardLayout"
import { backendURL } from "@/utils/env"
import { truncateText } from "@/utils/truncateText"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AccessControl from "@/components/AccessControl"

export default function ComplaintApproval() {
  const [complaints, setComplaints] = useState()
  const router = useRouter()

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${backendURL}/complaints/government/`)
      const data = await response.json()
      setComplaints(data.filtered_complaints)
    }
    getData()
  }, [])

    const handleApprove = async (id) => {
      const formData = new FormData
      formData.append("status", "approved")

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
        
        router.reload()
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
        router.reload()
      } catch(error) {
        alert("Something went wrong! Please try again.")
        console.error('error during fetching', error)
      }
    }

    const handleViewDetails = (id) => {
      router.push(`complaint-approval/${id}`)
    }

  return (
    <DashboardLayout>
    <AccessControl allowedRole="govt_body">
    <main className="">
        <h1 className="text-3xl font-bold mb-2">Complaints Approval</h1>
        <p className="text-gray-600 mb-8">
          Check out some of our citizen's latest post! Discuss, share and let us know how we can help!
        </p>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Report Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Report Description</th>
                <th className="text-center py-3 px-4"></th>
                <th className="text-center py-3 px-4" colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {complaints && complaints.map((complaint) => (
                <tr key={complaint.complaint_id} className="border-b border-gray-200">
                  <td className="py-4 px-4">{complaint.complaint_title}</td>
                  <td className="py-4 px-4">{truncateText(complaint.complaint_description, 40)}</td>
                  <td className="py-4 px-4 text-center">
                    <button onClick={() => handleViewDetails(complaint.complaint_id)} className="text-blue-600 hover:underline">
                      More Details
                    </button>
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => handleApprove(complaint.complaint_id)}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 active:outline-2 active:outline-green-400 text-white font-semibold rounded transition-colors"
                    >
                      Approve
                    </button>
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => handleReject(complaint.complaint_id)}
                      className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 active:outline-2 active:outline-red-400  text-white font-semibold rounded transition-colors"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AccessControl>
    </DashboardLayout>
  )
}

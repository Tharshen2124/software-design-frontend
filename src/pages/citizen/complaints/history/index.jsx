import DashboardLayout from "@/components/DashboardLayout"
import { backendURL } from "@/utils/env"
import { getUserFromToken } from "@/utils/extractUserFromToken"
import { truncateText } from "@/utils/truncateText"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState()
  const router = useRouter()
  const [user, setUser] = useState(null)

  // Step 1: Ensure we're on client and get user from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = getUserFromToken()
      setUser(u)
    }
  }, [])

  // Step 2: Once user is loaded, fetch complaint data
  useEffect(() => {
    if (!user) return

    async function getData() {
      try {
        const response = await fetch(`${backendURL}/complaints/citizen-data/${user.id}/`)
        const data = await response.json()
        setComplaints(data.complaints || [])
      } catch (err) {
        console.error("Failed to fetch complaints:", err)
      }
    }

    getData()
  }, [user])

    const handleViewDetails = (id) => {
      router.push(`/citizen/complaints/history/${id}`)
    }

  return (
    <DashboardLayout>
    <main className="">
        <h1 className="text-3xl font-bold mb-2">Complaints History</h1>
        <p className="text-gray-600 mb-8">
            Look back at the history of complaints that you have submitted and know their status. 
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
                  <td className="py-4 px-4">{truncateText(complaint.complaint_description, 80)}</td>
                  <td className="py-4 px-4 text-center">
                    <button onClick={() => handleViewDetails(complaint.complaint_id)} className="text-blue-600 hover:underline">
                      More Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardLayout>
  )
}

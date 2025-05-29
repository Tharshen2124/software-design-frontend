import DashboardLayout from "@/components/DashboardLayout"
import { MapPin } from "lucide-react"

export default function ComplaintApproval() {
    
    // Sample data for complaints
    const complaints = [
        {
            id: 1,
            title: "MRT Feeder Bus Delay....",
            description: "The MRT feeder buses at Kajang station have been show...",
        },
        {
            id: 2,
            title: "MRT Feeder Bus Delay....",
            description: "The MRT feeder buses at Kajang station have been show...",
        },
        {
            id: 3,
            title: "MRT Feeder Bus Delay....",
            description: "The MRT feeder buses at Kajang station have been show...",
        },
        {
            id: 4,
            title: "MRT Feeder Bus Delay....",
            description: "The MRT feeder buses at Kajang station have been show...",
        },
        {
            id: 5,
            title: "MRT Feeder Bus Delay....",
            description: "The MRT feeder buses at Kajang station have been show...",
        },
    ]

    const handleApprove = (id) => {
        console.log(`Approved complaint ${id}`)
    }

    const handleReject = (id) => {
        console.log(`Rejected complaint ${id}`)
    }

    const handleViewDetails = (id) => {
        console.log(`Viewing details for complaint ${id}`)
    }

  return (
    <DashboardLayout>
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
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="border-b border-gray-200">
                  <td className="py-4 px-4">{complaint.title}</td>
                  <td className="py-4 px-4">{complaint.description}</td>
                  <td className="py-4 px-4 text-center">
                    <button onClick={() => handleViewDetails(complaint.id)} className="text-blue-600 hover:underline">
                      More Details
                    </button>
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => handleApprove(complaint.id)}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 active:outline-2 active:outline-green-400 text-white font-semibold rounded transition-colors"
                    >
                      Approved
                    </button>
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => handleReject(complaint.id)}
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
    </DashboardLayout>
  )
}

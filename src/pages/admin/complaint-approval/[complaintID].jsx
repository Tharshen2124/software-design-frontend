import DashboardLayout from "@/components/DashboardLayout"
import { ArrowLeft, Calendar, ImageIcon } from "lucide-react"
import { useRouter } from "next/router"

export default function ComplaintDetails() {
  const router = useRouter()
  const { complaintID } = router.query
  
  const handleBack = () => {
    router.back()
  }

  const handleApprove = () => {
    console.log("Complaint approved")
    // Add logic to approve complaint
  }

  const handleReject = () => {
    console.log("Complaint rejected")
    // Add logic to reject complaint
  }

  return (
      <DashboardLayout>
        <button onClick={handleBack} className="flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        {/* Complaint Details Card */}
        <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Complaint Details</h1>

          {/* User Info */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-medium mr-3">
              T
            </div>
            <span className="font-medium">Timothy Faige</span>
          </div>

          {/* Submission Date */}
          <div className="flex items-center mb-6 text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              Submitted on: <span className="text-gray-500">29th May 2025, 6:00 pm</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleApprove}
              className="py-3 bg-green-600 hover:bg-green-700 active:outline-2 active:outline-green-400 text-white font-semibold rounded transition-colors"
            >
              Approved
            </button>
            <button
              onClick={handleReject}
              className="py-3 bg-red-600 hover:bg-red-700 active:outline-2 active:outline-red-400 text-white font-semibold rounded transition-colors"
            >
              Reject
            </button>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Complaint Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">MRT Feeder Bus Delay by 2 hours everyday</h2>

          {/* Complaint Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            The MRT feeder buses at Kajang station have been showing signs of strain lately, with long waiting times and
            overcrowded conditions becoming more frequent, especially during peak hours. Commuters have expressed
            frustration over inconsistent schedules and limited seating, often resulting in delays and discomfort during
            their daily travel. Despite efforts to streamline the service, including the introduction of additional
            buses during rush hours, the growing demand has outpaced these improvements. Regular users are calling for
            better coordination between train arrivals and feeder bus departures, as well as clearer real-time updates
            to help manage expectations and travel plans more effectively.
          </p>

          {/* Attached Image */}
          <a href="#" className="flex items-center text-blue-600 hover:underline">
            <ImageIcon className="w-5 h-5 mr-2" />
            Attached Image
          </a>
        </div>
    </DashboardLayout>
  )
}

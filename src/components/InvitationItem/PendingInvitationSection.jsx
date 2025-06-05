import { backendURL } from "@/utils/env"
import { useEffect, useState } from "react"

export default function PendingInvitationSection() {
  const [invitations, setInvitations] = useState()

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${backendURL}/invitation/list/`)
      const data = await response.json()
      setInvitations(data.invitations)
    }
    getData()
  }, [])

  const getInvitationStatus = (createdAt, userId, isExpired) => {
    const createdDate = new Date(createdAt)
    const now = new Date()
    const timeDiff = now.getTime() - createdDate.getTime()
    const oneDayInMs = 24 * 60 * 60 * 1000

    if (timeDiff > oneDayInMs && userId === null) {
      return "Expired"
    } else if (isExpired && userId !== null) {
      return "Completed"
    } else {
      return "Pending"
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Expired":
        return "text-red-700 bg-red-100 border-red-300"
      case "Completed":
        return "text-green-700 bg-green-100 border-green-300"
      case "Pending":
      default:
        return "text-yellow-700 bg-yellow-100 border-yellow-300"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const day = date.getDate()
    const suffix =
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" : "th"

    const options = { month: "long", year: "numeric" }
    const formattedDate = date.toLocaleDateString("en-US", options)

    return `${day}${suffix} ${formattedDate}`
  }

  return (
    <div className="mt-6">
      <div className="mt-6 space-y-4">
        {/* Header */}
        <div className="grid grid-cols-4 font-semibold text-gray-700 px-4">
          <div>Email</div>
          <div>User Type</div>
          <div>Date Sent</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        {invitations && invitations.map((invitation) => {
          const status = getInvitationStatus(invitation.created_at, invitation.user_id, invitation.isexpired)
          return (
            <div
              key={invitation.invitation_id}
              className="grid grid-cols-4 rounded-lg px-4 py-4 shadow-sm border border-gray-200"
            >
              <div>{invitation.email}</div>
              <div>{invitation.role}</div>
              <div>{formatDate(invitation.created_at)}</div>
              <div className={`w-24 text-center px-3 py-1 text-sm font-medium border rounded-full ${getStatusClass(status)}`}>
                {status}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, Hand, FileInput, FileCheck, Pickaxe } from "lucide-react"

export const summaryConfig = {
  total: {
    label: "Total Complaints",
    icon: TrendingUp,
    className: "text-blue-600",
    color: "bg-blue-100",
  },
  pending: {
    label: "Pending",
    icon: Hand,
    className: "bg-yellow-100",
    color: "bg-yellow-100",
  },
  filtered: {
    label: "Filtered",
    icon: FileInput,
    className: "text-orange-600",
    color: "bg-orange-100",
  },
  approved: {
    label: "Approved",
    icon: FileCheck,
    className: "text-purple-600",
    color: "bg-purple-100",
  },
  in_progress: {
    label: "In Progress",
    icon: Pickaxe,
    className: "text-cyan-600",
    color: "bg-cyan-100",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle,
    className: "text-green-600",
    color: "bg-green-100",
  },
}
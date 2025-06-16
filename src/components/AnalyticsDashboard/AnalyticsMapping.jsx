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

export const statusColorMap = {
  pending: {
    name: "Pending",
    color: "#4299E1", // blue-500
  },
  filtered: {
    name: "Filtered",
    color: "#ED8936", // orange-500
  },
  approved: {
    name: "Approved",
    color: "#9F7AEA", // purple-500
  },
  in_progress: {
    name: "In Progress",
    color: "#38B2AC", // teal-500
  },
  rejected: {
    name: "Rejected",
    color: "#E53E3E", // red-600
  },
};

export const summaryProject = {
  assigned: {
    label: "Assigned",
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

export const ProjectsStatusColorMap = {
  assigned: {
    label: "Assigned",
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

export const GovtProjectsStatusColorMap = {
  assigned: {
    name: "Pending Task",
    color: "#9F7AEA", // purple-500
  },
  approved: {
    label: "Approved",
    icon: FileCheck,
    className: "text-purple-600",
    color: "bg-purple-100",
  },
  in_progress: {
    name: "In Progress",
    color: "#38B2AC", // teal-500
  }
};
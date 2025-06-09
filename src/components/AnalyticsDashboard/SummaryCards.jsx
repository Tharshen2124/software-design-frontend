export default function SummaryCards({ 
    title,
    value,
    icon,
    color,
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center">
        <div className={`p-2 rounded-lg ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        </div>
    </div>
  )
}

export default function ComplaintItem({ complaint, onSelect }) {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={complaint.selected}
          onChange={onSelect}
          className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <div className="flex-grow">
          <h3 className="font-medium text-gray-800">{complaint.title}</h3>
          <p className="text-sm text-gray-600">{complaint.reportedBy}</p>

          <div className="flex items-center justify-between mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              More Info
            </button>

            <div className="flex items-center text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {complaint.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

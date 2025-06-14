import { useState } from "react"
import { backendURL } from "@/utils/env"
import DashboardLayout from "@/components/DashboardLayout"
import { getUserFromToken } from "@/utils/extractUserFromToken"
import { useRouter } from "next/router"
import { ImagePlus } from "lucide-react"

export default function CreateBlogPage() {
//   useAuthGuard()
  const router = useRouter()
  const { projectid } = router.query
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [followUp, setFollowUp] = useState("")

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview URL
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setImage(null)
    setPreviewUrl(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const uploadFormData = new FormData()
    
    uploadFormData.append("follow_up", followUp)
    uploadFormData.append("maintenance_project_id", projectid)
    uploadFormData.append("project_image", image)
    uploadFormData.append("status", "resolved")

    console.log("test", uploadFormData.get("follow_up"))
    console.log("test", uploadFormData.get("maintenance_project_id"))
    console.log("test", uploadFormData.get("project_image"))
    console.log("test", uploadFormData.get("status"))

    try {
        // make a call to backendURL/posts/posts/ along with the formData
        const response = await fetch(`${backendURL}/maintenance/update/`, {
            method: "POST",
            body: uploadFormData,
            headers: {
              "Accept": "application/json",
            },
        })

        console.log("Response:", await response.json())
        
        if (response.ok) { 
          alert("Project status updated successfully")
          router.back()
        }

    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit the project update. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Update Project Status</h1>
            <p className="text-gray-600">Share your update with the team.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Follow up <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                rows={8}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the issue or share your experience in detail..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                {!previewUrl ? (
                  <>
                    <ImagePlus className="text-blue-600/80"/>
                    <div className="flex text-sm text-gray-600 mt-2">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </>
                ) : (
                  <div className="relative">
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-64 rounded-md" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/blogs")}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (!image || !followUp)}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitting || (!image || !followUp) ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Post"}
              </button>
            </div>
          </form>
    </DashboardLayout>
  )
}

import Image from "next/image"
import DashboardLayout from "@/components/DashboardLayout"
import { useEffect, useState } from "react"
import { backendURL } from "@/utils/env"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/router"
import { formatDate } from "@/utils/formatDate"
import { truncateText } from "@/utils/truncateText"
import AccessControl from "@/components/AccessControl"


export default function BlogsPage() {
  useAuthGuard()
  const [blogs, setBlogs] = useState([])
  const router = useRouter()  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${backendURL}/posts/posts/`)
      const data = await response.json()
      setBlogs(data.posts)
      console.log(data)
    }
    fetchData()
  }
  , [])

  return (
    <DashboardLayout>
      <AccessControl allowedRole={["citizen", "administrator", "govt_body", "maintenance_company"]}>
        <h1 className="text-4xl font-bold text-center mb-2">Blogs</h1>
        <div className="flex flex-col justify-between items-center gap-y-4 mb-5">
          <p className="text-gray-600">
            Check out some of our citizen's latest post! Discuss, share and let us know how we can help!
          </p>
          <div className="mb-4">
            <button onClick={() => router.push('/create-blog')} className="bg-blue-600 text-white py-2 px-6 flex items-center rounded-md hover:bg-blue-700 transition">
              <PlusCircle className="mr-2 size-5" />
              New Blog
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs && blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        </AccessControl>
    </DashboardLayout>
  )
}

function BlogCard({ post }) {
  const router = useRouter()
  return (
    <div className="border border-[#e0e0e0] rounded-lg overflow-hidden flex flex-col">
      <div className="relative h-48">
        <Image src={post.image_url || "/vercel.svg"} alt="interesting photo" fill className="object-cover" />
      </div>
    <div className="py-4 flex-1 flex flex-col">
        <div className="px-4 flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{formatDate(post.created_at) || "N/A"}</span>
        </div>
        <h2 className="px-4 text-lg font-bold mb-2">{truncateText(post.title,60) || "N/A"}</h2>
        <p className="px-4 text-gray-600 text-sm mb-4 flex-1">{truncateText(post.content, 120) || "N/A"}</p>
        <div className="px-4">
            <button onClick={() => router.push(`/blog/${post.id}/`)} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                View More
            </button>
        </div>
        <div className="px-4 flex items-center mt-4 border-t border-[#e0e0e0] pt-4">
          <Image src={post.users.profile_picture} className="rounded-full" width="35" height="35" alt="This is the profile picture"/>
          <span className="ml-3 text-sm ">{post.users.full_name || "N/A"}</span>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import DashboardLayout from "@/components/DashboardLayout"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { backendURL } from "@/utils/env"
import { formatDate } from "@/utils/formatDate"
import { getUserFromToken } from "@/utils/extractUserFromToken"

export default function BlogPostPage() {
  useAuthGuard()
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchPost = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch from an API
        // For now, we'll use our mock data
        const response = await fetch(`${backendURL}/posts/posts/${id}`)
        const data = await response.json()

        console.log(data)
  
        if (data) {
          setPost(data)
          setComments(data.comments || [])
        }
      } catch (error) {
        alert("Failed to fetch post data. Please try again later.")
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user = getUserFromToken();
    
    const formData = new FormData();
    formData.append('comment_description', newComment); 
    formData.append('user_id', user.id);     
    
    try {
      const response = await fetch(`${backendURL}/posts/posts/${id}/comments/`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error submitting comment:", errorText);
        alert("Failed to submit comment. Please try again later.");
        return;
      }      
      
      router.reload();      
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again later.");
      setNewComment("");
    }
  };

  if (loading) {
    return (
        <DashboardLayout>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading post...</p>
            </div>
          </div>
        </DashboardLayout>    
    )
  }

  if (!post) {
    return (
        <DashboardLayout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Back to Blogs
            </Link>
          </div>
        </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
          {/* Back button */}
          <div className="mb-6">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Blogs
            </Link>
          </div>

          {/* Blog header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center">
              <Image src={post.users.profile_picture || "/vercel.svg"} alt="interesting photo" width="40" height="40" className="rounded-full"/>
              <span className="ml-2">{post.users.full_name}</span>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={post.image_url || "/klphoto.jpg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Blog content */}
          <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }}></div>

          {/* Comments section */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            {/* Comment form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="mb-4">
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Add your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments list */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-[#d9d9d9] pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Image src={comment.users.profile_picture} alt={post.title} width="40" height="40" className="rounded-full"/>
                        <div className="ml-2">
                          <div className="font-medium">{comment.users.full_name}</div>
                          <div className="text-xs text-gray-500">{formatDate(comment.created_at)}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2">{comment.comment_description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
    </DashboardLayout>
  )
}

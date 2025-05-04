import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import DashboardLayout from "@/components/DashboardLayout"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { backendURL } from "@/utils/env"
import { formatDate } from "@/utils/formatDate"
import { getUserFromToken } from "@/utils/extractUserFromToken"

// Mock data for blog posts
const blogPostsData = {
  1: {
    id: 1,
    title: "Pothole at Subang Jaya is Crazy",
    content: `
      <p>Persistent potholes riddle the streets of Subang Jaya, leaving drivers swerving and commuters enduring bumpy rides. The situation has become increasingly dangerous, with several accidents reported in the past month alone.</p>
      
      <p>Local residents have expressed frustration over the lack of action from authorities despite numerous complaints filed through official channels. "I've reported the same pothole three times in the last two months," says Sarah, a resident of SS15. "My car's suspension is damaged because of these roads."</p>
      
      <p>The worst affected areas include Jalan SS15/4 and Jalan Subang Utama, where some potholes measure up to 30cm in diameter and 10cm in depth. During rainy seasons, these potholes fill with water, making them harder to spot and even more hazardous.</p>
      
      <p>Local business owners have also reported a decline in customer visits due to the poor road conditions. "People avoid driving here if they can help it," says Ahmad, who runs a restaurant in the area. "It's affecting our livelihood."</p>
      
      <p>The Subang Jaya City Council (MBSJ) has been contacted for comment but has yet to provide a timeline for repairs. According to their website, road maintenance is scheduled quarterly, but residents claim no significant improvements have been made in over six months.</p>
    `,
    date: "8th April 2024",
    image: "/dog-image.jpg",
    author: "Timothy Faige",
    authorInitial: "T",
    location: "Subang Jaya, SS15",
    category: "Infrastructure",
    tags: ["pothole", "road safety", "infrastructure"],
    hasVoting: false,
    comments: [
      {
        id: 1,
        author: "Jane Cooper",
        authorInitial: "J",
        date: "10th April 2024",
        content: "I live nearby and it's absolutely terrible. My car's suspension is damaged because of these roads.",
      },
      {
        id: 2,
        author: "Robert Chen",
        authorInitial: "R",
        date: "11th April 2024",
        content: "I've reported this to MBSJ three times already. They keep saying they'll fix it but nothing happens.",
      },
      {
        id: 3,
        author: "Sarah Ahmad",
        authorInitial: "S",
        date: "12th April 2024",
        content: "We should organize a community effort to highlight this issue. Maybe get local media involved?",
      },
    ],
  },
  2: {
    id: 2,
    title: "Putra Heights Fire Victims",
    content: `
      <p>A ruptured gas pipeline in Putra Heights sparked a fierce blaze earlier this month, injuring more than 100 residents and causing extensive property damage. The fire, which started around 2 AM on December 1st, quickly spread through several blocks of homes in the residential area.</p>
      
      <p>Emergency services responded promptly, with 15 fire engines and over 60 firefighters battling the flames for nearly six hours before bringing the situation under control. The local hospital reported treating 112 people for injuries ranging from minor burns to smoke inhalation, with 23 patients still in critical condition.</p>
      
      <p>"It was terrifying," recounts Mei Lin, a resident who escaped with her family. "We woke up to explosions and saw flames everywhere. We barely had time to grab our documents before running out."</p>
      
      <p>Preliminary investigations suggest that aging infrastructure may have contributed to the pipeline rupture. The gas line was reportedly installed over 30 years ago and was scheduled for maintenance next year.</p>
      
      <p>Local authorities have set up temporary shelters at nearby schools for the displaced families. Relief efforts are underway, with various organizations collecting donations of food, clothing, and essential items.</p>
      
      <p>The gas company responsible for the pipeline has issued a statement expressing regret over the incident and promising a thorough investigation. They have also pledged financial assistance to affected residents for immediate relief.</p>
    `,
    date: "9th December 2024",
    image: "/fire-image.jpg",
    author: "Timothy Faige",
    authorInitial: "T",
    location: "Putra Heights",
    category: "Safety & Security",
    tags: ["fire", "emergency", "gas leak"],
    hasVoting: true,
    comments: [
      {
        id: 1,
        author: "David Wong",
        authorInitial: "D",
        date: "10th December 2024",
        content:
          "My family lives in the affected area. The community response has been amazing, but we need more support from authorities.",
      },
      {
        id: 2,
        author: "Priya Sharma",
        authorInitial: "P",
        date: "11th December 2024",
        content:
          "I'm organizing a donation drive at my office. Please DM me if you want to contribute or know families who need help.",
      },
      {
        id: 3,
        author: "Michael Tan",
        authorInitial: "M",
        date: "12th December 2024",
        content:
          "This is unacceptable. The gas company knew these pipes were old and still delayed maintenance. They should be held accountable.",
      },
      {
        id: 4,
        author: "Lisa Abdullah",
        authorInitial: "L",
        date: "13th December 2024",
        content:
          "Does anyone know if the temporary shelters are accepting volunteers? I'd like to help out this weekend.",
      },
    ],
  },
}

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

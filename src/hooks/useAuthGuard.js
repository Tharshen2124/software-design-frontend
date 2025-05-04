// hooks/useAuthGuard.ts
import { useEffect } from "react"
import { useRouter } from "next/router"
import { jwtDecode } from "jwt-decode";

export function useAuthGuard() {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("access_token")
    if (!token) {
        router.replace("/login")
        alert("You are not logged in! Please login to continue.")
        return
    }

    try {
      const decoded = jwtDecode(token)
      const isExpired = decoded.exp * 1000 < Date.now()
      
      if (isExpired) {
        sessionStorage.removeItem("access_token")
        router.replace("/login")
      }
    } catch (err) {
      console.error("Token decoding failed:", err)
      router.replace("/login")
      alert("Your session has expired. Please login again.")
    }
  }, [router])
}

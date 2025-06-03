import { useEffect } from "react"
import { useRouter } from "next/router"
import { jwtDecode } from "jwt-decode";

export function useAuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const { token, error, invitation_id } = router.query

    if (error) {
      console.error("OAuth Error:", error)
      router.replace(`/login?error=${encodeURIComponent(String(error))}`)
      return
    }

    if (token && typeof token === "string") {
      try {
        // Save raw token
        sessionStorage.setItem("access_token", token)

        // Decode and save user info
        const decoded = jwtDecode(token)
        const isExpired = decoded.exp * 1000 < Date.now()
        if (isExpired) {
          console.warn("Token is expired")
          return
        }

        const user = {
          id: decoded.sub,
          name: decoded.user_metadata.name,
          picture: decoded.user_metadata.picture,
          email: decoded.email,
          invitation_id: typeof invitation_id === "string" ? invitation_id : null,
        }

        sessionStorage.setItem("user", JSON.stringify(user))

        router.replace("/blog")
      } catch (err) {
        console.error("Failed to decode token:", err)
        router.replace("/login?error=invalid_token")
      }
    }
  }, [router])
}

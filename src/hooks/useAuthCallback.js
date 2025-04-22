import { useEffect } from "react"
import { useRouter } from "next/router"

export function useAuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const { token, error } = router.query

    if (error) {
      console.error("OAuth Error:", error)
      router.replace(`/login?error=${encodeURIComponent(String(error))}`)
      return
    }

    if (token && typeof token === "string") {
      sessionStorage.setItem("access_token", token)
      router.replace("/dashboard")
    }
  }, [router])
}

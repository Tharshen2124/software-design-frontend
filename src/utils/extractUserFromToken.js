import { jwtDecode } from "jwt-decode"

// extracts user information from the JWT token stored in sessionStorage
export function getUserFromToken() {
  const token = sessionStorage.getItem("access_token")
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    const isExpired = decoded.exp * 1000 < Date.now()
    if (isExpired) return null

    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.user_metadata?.name,
      picture: decoded.user_metadata?.picture,
    }
  } catch (err) {
    console.error("Failed to decode token", err)
    return null
  }
}

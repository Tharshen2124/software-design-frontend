import { useAuthCallback } from "@/hooks/useAuthCallback"

export default function CallbackPage() {
    useAuthCallback()

    return (
        <p>Processing login...</p>
    ) 
}
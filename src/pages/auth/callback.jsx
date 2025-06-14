import Loading from "@/components/Loading"
import { useAuthCallback } from "@/hooks/useAuthCallback"

export default function CallbackPage() {
    useAuthCallback()

    return (
        <Loading />
    ) 
}
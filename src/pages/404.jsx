import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, Home, MapPin, MessageSquare, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter()

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
                <div className="relative">
                {/* Large 404 Text */}
                <div className="text-8xl md:text-9xl font-bold text-gray-200 select-none">404</div>

                {/* City Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-blue-100 rounded-full p-6">
                    <MapPin className="h-16 w-16 text-blue-600" />
                    </div>
                </div>
                </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-2">
                The page you're looking for seems to have gone missing from our city map.
                </p>
                <p className="text-gray-500">Don't worry, we'll help you find your way back to fixing your city!</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                    onClick={() => router.back()}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                >
                Go Back
                </button>
            </div>         
            </div>
        </main>
 )
}
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Sidebar } from "./Sidebar";

export default function NavigationBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    function handleLogout() {
        router.push("/");
    }
    
    return (
        <>
            <nav className="border-b border-[#e0e0e0] w-full h-[70px] flex items-center">
                <div className="container w-[95%] mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src="/next.svg"
                        alt="logo"
                        className="md:w-12 md:h-12"
                        width={40}
                        height={40}
                        priority
                    />
                </div>
                <div className="hidden lg:flex items-center lg:gap-x-10">
                    <Link href="/dashboard" className="hover:text-blue-400">
                    Dashboard
                    </Link>
                    <Link href="/members" className=" hover:text-blue-400">
                    Reports
                    </Link>
                    <Link href="/meetups" className=" hover:text-blue-400">
                    History
                    </Link>
                </div>
                <div className="hidden lg:flex items-center">
                    <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 dark:bg-white text-white bg-gray-800 font-semibold px-8 py-3 rounded-full"
                    >
                    Logout
                    </button>
                </div>
                <div className="hidden lg:flex items-center">
                    <p className="mr-6">Admin Mode</p>
                    <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 dark:bg-white dark:text-black text-white bg-gray-800 font-semibold px-8 py-3 rounded-full"
                    >
                    Logout
                    </button>
                </div>
                <div className="block lg:hidden">
                    
                    <button
                    onClick={toggleSidebar}
                    className="flex items-center gap-2 dark:bg-white text-white bg-gray-800 font-semibold px-2 py-2 rounded-md"
                    >
                    {isSidebarOpen ? <X size="20" /> : <Menu size="20" />}
                    </button>
                </div>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
  );
}

import { useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

export default function NavigationBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="border-b border-[#e0e0e0] w-full h-[70px] flex items-center">
        <div className="container w-[95%] mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 " />
              <span className="ml-2 text-xl font-bold">FixMyCity</span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center">
            <Link href="/complaints" className="hover:text-blue-400">
              Complaints
            </Link>
            <Link href="/history" className="ml-4 hover:text-blue-400">
              History
            </Link>
            <Link href="/blog" className="ml-4 hover:text-blue-400">
              Blogs
            </Link>
          </div>
            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold">
              T
            </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}


import { useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { backendURL } from "@/utils/env";
import { useRouter } from "next/router";
import AccessControl from "../AccessControl";

export default function NavigationBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  async function handleLogout() {
    try {
      const response = await fetch(`${backendURL}/auth/logout`, {
        headers: {
          "Accept": "application/json",
        },
      })

      if(response.ok) {
        alert("Successfully logged out!")
        router.push('/')
      }
    } catch(error) {
      console.log("Error", error)
      alert("error occured during logout")
    }
   

  }

  return (
    <>
      <nav className="border-b border-gray-200 w-full h-[70px] flex items-center">
        <div className="container w-[95%] mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 " />
              <span className="ml-2 text-xl font-bold">FixMyCity</span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center">
            <Link href="/dashboard" className="ml-4 hover:text-blue-400">Dashboard</Link>
            

            <AccessControl allowedRole="citizen">
              <Link href="/citizen/complaints/create" className="ml-4 hover:text-blue-400">Complaint</Link>
              <Link href="/citizen/complaints/history" className="ml-4 hover:text-blue-400">History</Link>
            </AccessControl>

            <AccessControl allowedRole="administrator">
              <Link href="/admin/complaint-approval" className="ml-4 hover:text-blue-400">Complaints Approval</Link>
              <Link href="/admin/user-management" className="ml-4 hover:text-blue-400">User Management</Link>
            </AccessControl>

            <AccessControl allowedRole="govt_body">
              <Link href="/government/complaint-approval" className="ml-4 hover:text-blue-400">Complaints Approval</Link>
              <Link href="/government/maintenance-plan" className="ml-4 hover:text-blue-400">Maintenance Plan</Link>
            </AccessControl>

            <AccessControl allowedRole="maintenance_company">
              <Link href="/maintenance-company" className="ml-4 hover:text-blue-400">Maintenance Project</Link>
            </AccessControl>

            <Link href="/blog" className="ml-4 hover:text-blue-400">Blogs</Link>
            
          </div>
           <button onClick={() => handleLogout()} className="w-24 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-semibold">
              Logout
            </button>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}


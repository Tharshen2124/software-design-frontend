import { useState } from "react";
import { backendURL } from "@/utils/env"
import RoleSelector from "@/components/InvitationItem/RoleSelector";

export default function InviteNewUserSection() {
    const [role, setRole] = useState("administrator"); // default
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (!email) {
            alert("Email is required.");
            return;
        }

        const payload = {
            email,
            role,
        };

        console.log("Submitting to API:", payload);

        // send to backend
        fetch(`${backendURL}/invitation/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }) 
        .then((res) => res.json())
        .then((data) => {
            alert("Invitation sent!");
            setEmail(""); // reset
        })
        .catch((err) => {
            console.error("Failed to send:", err);
            alert("Error sending invitation.");
        });
    };

    return (
        <div className="mt-6">
            <p className="text-gray-700 leading-relaxed mb-6">
                User Type <span className="text-red-600">*</span>
            </p>

            <RoleSelector activeRole={role} setActiveRole={setRole} />

            <p className="text-gray-700 leading-relaxed mb-6">
                Email Address <span className="text-red-600">*</span>
            </p>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-300"
            />

            {/* Button aligned left */}
            <div className="mt-6 text-right">
                <button 
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Send Invitation
                </button>
            </div>
            
        </div>
    );
}
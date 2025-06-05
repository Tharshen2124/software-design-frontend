import DashboardLayout from "@/components/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import InviteNewUserSection from "@/components/InvitationItem/InviteNewUserSection";
import PendingInvitationSection from "@/components/InvitationItem/PendingInvitationSection";

export default function InviteNewUser() {
  const [active, setActive] = useState("invite");
  const inviteRef = useRef(null);
  const pendingRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const ref = active === "invite" ? inviteRef : pendingRef;
    if (ref.current) {
      const { offsetLeft, offsetWidth } = ref.current;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [active]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-2">User Management</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Invite new users to the FixMyCity platform and manage existing
        invitations.
      </p>

      <div className="relative ml-4">
        {/* Base gray line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300" />

        {/* Blue indicator */}
        <div
          className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        <div className="flex gap-4 mb-3">
          <button
            ref={inviteRef}
            onClick={() => setActive("invite")}
            className={`leading-relaxed pb-2 ${
              active === "invite"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Invite New User
          </button>

          <button
            ref={pendingRef}
            onClick={() => setActive("pending")}
            className={`leading-relaxed pb-2 ${
              active === "pending"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Pending Invitation
          </button>
        </div>
      </div>

      {/* Render tab content based on active */}
      {active === "invite" && <InviteNewUserSection />}
      {active === "pending" && <PendingInvitationSection />}
    </DashboardLayout>
  );
}

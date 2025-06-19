import { createContext, useContext, useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { getUserFromToken } from "@/utils/extractUserFromToken";

const UserRoleContext = createContext();

export function UserRoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async () => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }
    const user = getUserFromToken();
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const accessToken = window.sessionStorage.getItem("access_token");
      const res = await fetch(`${backendURL}/auth/get-role?user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setRole(data.role);
    } catch (err) {
      console.error("Error fetching user role:", err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      fetchRole();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserRoleContext.Provider value={{ role, loading, refetchRole: fetchRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const useUserRole = () => useContext(UserRoleContext);
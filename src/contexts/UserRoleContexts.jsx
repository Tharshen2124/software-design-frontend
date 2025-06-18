// context/UserRoleContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { backendURL } from "@/utils/env";
import { getUserFromToken } from "@/utils/extractUserFromToken";

const UserRoleContext = createContext();

export function UserRoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await fetch(`${backendURL}/auth/get-role?user_id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
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

    fetchRole();
  }, []);

  return (
    <UserRoleContext.Provider value={{ role, loading }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const useUserRole = () => useContext(UserRoleContext);

import { useEffect, useState } from 'react';
import { backendURL } from "@/utils/env";
import { getUserFromToken } from "@/utils/extractUserFromToken";

export default function AccessControl({ allowedRole, children }) {

    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getUserFromToken();

        const fetchRole = async () => {
        try {
            const response = await fetch(`${backendURL}/auth/get-role?user_id=${user.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                },
            });

            if (!response.ok) {
            throw new Error('Failed to fetch role');
            }

            const data = await response.json();
            setUserRole(data.role);
        } catch (error) {
            console.error('Error fetching role:', error);
            setUserRole(null);
        } finally {
            setLoading(false);
        }
        };

        fetchRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (userRole !== allowedRole) {
        return <div>Access Denied</div>;
    }

    return <>{children}</>;
}

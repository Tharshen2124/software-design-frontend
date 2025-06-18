import { useUserRole } from "@/contexts/UserRoleContexts";

export default function AccessControl({ allowedRole, children }) {
  const { role, loading } = useUserRole();

  if (loading) return null;

  const allowedRoles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
  if (!allowedRoles.includes(role)) return null;

  return <>{children}</>;
}

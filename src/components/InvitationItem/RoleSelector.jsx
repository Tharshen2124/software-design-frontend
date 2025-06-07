import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faHammer, faUsersGear } from "@fortawesome/free-solid-svg-icons";

export default function RoleSelector({ activeRole, setActiveRole }) {
  const roles = [
    {
      id: "administrator",
      title: "Administrator",
      description: "Full platform access",
      icon: faUsersGear,
    },
    {
      id: "maintenance_company",
      title: "Maintenance Company",
      description: "Manage maintenance tasks",
      icon: faHammer,
    },
    {
      id: "govt_body",
      title: "Government Body",
      description: "Official oversight access",
      icon: faUserTie,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {roles.map(({ id, title, description, icon }) => {
        const isActive = activeRole === id;
        const colorClass = isActive ? "text-blue-700" : "text-gray-400";
        const borderClass = isActive ? "border-blue-700" : "border-gray-200";

        return (
          <div
            key={id}
            onClick={() => setActiveRole(id)}
            className={`cursor-pointer border rounded-lg p-8 flex flex-col items-center ${borderClass} transition-colors duration-300`}
          >
            <FontAwesomeIcon
              icon={icon}
              size="4x"
              className={`${colorClass} transition-colors duration-300`}
            />
            <p className={`mt-4 font-semibold text-xl ${colorClass}`}>{title}</p>
            <p className={`text-sm ${colorClass}`}>{description}</p>
          </div>
        );
      })}
    </div>
  );
}

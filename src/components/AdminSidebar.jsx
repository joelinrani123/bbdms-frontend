import { NavLink } from "react-router-dom";

const items = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/add-donor", label: "Add Donor" },
  { to: "/admin/donor-list", label: "Donor List" },
  { to: "/admin/contact-queries", label: "Check Contactus Query" },
  { to: "/admin/manage-pages", label: "Manage Pages" },
  { to: "/admin/contact-info", label: "Update Contact Info" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}

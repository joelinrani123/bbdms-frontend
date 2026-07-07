import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminTopbar />
      <div className="admin-body">
        <AdminSidebar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

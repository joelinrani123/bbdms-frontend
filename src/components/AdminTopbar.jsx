import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <header className="admin-topbar">
      <div className="brand">Blood Bank &amp; Donation Admin Panel</div>
      <div className="admin-user-menu">
        <button className="admin-user-btn" onClick={() => setOpen((o) => !o)}>
          👤 Hello {username || "admin"} ▾
        </button>
        {open && (
          <div className="admin-user-dropdown">
            <button onClick={() => { setOpen(false); navigate("/admin/change-password"); }}>
              Change Password
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

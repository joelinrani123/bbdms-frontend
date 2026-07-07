import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/about", label: "About Us" },
  { to: "/why-donate", label: "Why Donate Blood" },
  { to: "/become-donor", label: "Become A Donor" },
  { to: "/need-blood", label: "Need Blood" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="site-navbar">
        <div className="container site-navbar-row">
          <NavLink to="/" className="site-brand" onClick={() => setOpen(false)}>
            Blood Bank &amp; Donation
          </NavLink>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`site-nav-links ${open ? "open" : ""}`}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/admin/login" className="admin-link-btn" onClick={() => setOpen(false)}>
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="site-ticker">
        <div className="ticker-label">Latest Updates</div>
        <div className="ticker-text">
          First blood donation camp to be organised in coimbatore by Joelin in collaboration with Blood Bank
        </div>
      </div>
    </>
  );
}

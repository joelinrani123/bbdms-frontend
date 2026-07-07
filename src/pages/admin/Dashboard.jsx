import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({ donorsAvailable: 0, userQueries: 0, pendingQueries: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <hr className="page-hr" />
      <div className="dash-cards">
        <div className="dash-card blue">
          <h2>{stats.donorsAvailable}</h2>
          <p>BLOOD DONORS AVAILABLE</p>
          <button className="dash-btn" onClick={() => navigate("/admin/donor-list")}>Full Detail</button>
        </div>
        <div className="dash-card green">
          <h2>{stats.userQueries}</h2>
          <p>USER QUERIES</p>
          <button className="dash-btn" onClick={() => navigate("/admin/contact-queries")}>Full Detail</button>
        </div>
        <div className="dash-card purple">
          <h2>{stats.pendingQueries}</h2>
          <p>PENDING QUERIES</p>
          <button className="dash-btn" onClick={() => navigate("/admin/contact-queries")}>Full Detail</button>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import api from "../api/axios";
import DonorCard from "../components/DonorCard";
import Pagination from "../components/Pagination";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function NeedBlood() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [reason, setReason] = useState("");
  const [donors, setDonors] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const runSearch = async (targetPage = 0) => {
    if (!bloodGroup) {
      setError("Please select a blood group.");
      return;
    }
    setError(null);
    try {
      const res = await api.get(`/donors?bloodGroup=${encodeURIComponent(bloodGroup)}&page=${targetPage}&size=6`);
      setDonors(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(targetPage);
      setSearched(true);
    } catch {
      setError("Could not fetch donors. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(0);
  };

  return (
    <div className="container page-section">
      <h1 className="page-title">Need Blood</h1>
      <hr className="page-hr" />

      {error && <div className="error-banner">{error}</div>}

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Blood Group<span className="required">*</span></label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
            <option value="">Select</option>
            {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Reason, why do you need blood?<span className="required">*</span></label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <div className="form-actions" style={{ gridColumn: "1 / span 1" }}>
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>

      {searched && (
        <>
          <div className="donor-grid" style={{ marginTop: 30 }}>
            {donors.length === 0 && <p>No donors found for this blood group yet.</p>}
            {donors.map((d) => (
              <DonorCard key={d.id} donor={d} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={runSearch} />
        </>
      )}
    </div>
  );
}

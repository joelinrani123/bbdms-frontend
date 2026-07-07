import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/Pagination";

export default function ContactQueries() {
  const [queries, setQueries] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const load = (targetPage = 0) => {
    api.get(`/admin/contact-queries?page=${targetPage}&size=10`).then((res) => {
      setQueries(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(targetPage);
    });
  };

  useEffect(() => { load(0); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this query?")) return;
    await api.delete(`/admin/contact-queries/${id}`);
    load(page);
  };

  const toggleStatus = async (q) => {
    const nextStatus = q.status === "Pending" ? "Read" : "Pending";
    await api.put(`/admin/contact-queries/${q.id}/status`, { status: nextStatus });
    load(page);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <>
      <h1 className="page-title">User Query</h1>
      <hr className="page-hr" />
      <table className="data-table">
        <thead>
          <tr>
            <th>S.no</th><th>Name</th><th>Email Id</th><th>Mobile Number</th>
            <th>Message</th><th>Posting Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q, i) => (
            <tr key={q.id}>
              <td>{page * 10 + i + 1}</td>
              <td>{q.name}</td>
              <td>{q.emailId}</td>
              <td>{q.mobileNumber}</td>
              <td>{q.message}</td>
              <td>{formatDate(q.postingDate)}</td>
              <td>
                <button
                  className={`status-badge ${q.status === "Pending" ? "pending" : "read"}`}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => toggleStatus(q)}
                  title="Click to toggle status"
                >
                  {q.status}
                </button>
              </td>
              <td><button className="link-btn" onClick={() => handleDelete(q.id)}>DELETE</button></td>
            </tr>
          ))}
          {queries.length === 0 && (
            <tr><td colSpan={8} style={{ textAlign: "center" }}>No queries found.</td></tr>
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onChange={load} />
    </>
  );
}

import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/Pagination";

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editing, setEditing] = useState(null); // page object being edited
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState(null);

  const load = (targetPage = 0) => {
    api.get(`/admin/pages?page=${targetPage}&size=3`).then((res) => {
      setPages(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(targetPage);
    });
  };

  useEffect(() => { load(0); }, []);

  const startEdit = (p) => {
    setEditing(p);
    setDraft(p.pageData);
    setMessage(null);
  };

  const handleUpdate = async () => {
    await api.put(`/admin/pages/${editing.id}`, { pageData: draft });
    setMessage("Page updated successfully.");
    setEditing(null);
    load(page);
  };

  if (editing) {
    return (
      <>
        <h1 className="page-title">Update Page Details</h1>
        <hr className="page-hr" />
        <div className="form-field" style={{ marginBottom: 8 }}>
          <label><b>Selected Page :</b> {editing.pageName}</label>
        </div>
        <div className="form-field">
          <label>Page Details:</label>
          <textarea
            className="page-editor"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          <button className="btn" style={{ background: "#ddd" }} onClick={() => setEditing(null)}>Cancel</button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">Manage Page Data</h1>
      <hr className="page-hr" />
      {message && <div className="success-banner">{message}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>S.no</th><th>Page Name</th><th>Page Type</th><th>Page Data</th><th>Edit Page</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p, i) => (
            <tr key={p.id}>
              <td>{page * 3 + i + 1}</td>
              <td>{p.pageName}</td>
              <td>{p.pageType}</td>
              <td style={{ maxWidth: 500 }}>
                <div style={{ maxHeight: 90, overflowY: "auto" }}>{p.pageData}</div>
              </td>
              <td><button className="link-btn" onClick={() => startEdit(p)}>EDIT</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onChange={load} />
    </>
  );
}

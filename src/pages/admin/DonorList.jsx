import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/Pagination";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const load = (targetPage = 0) => {
    api.get(`/admin/donors?page=${targetPage}&size=10`).then((res) => {
      setDonors(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(targetPage);
    });
  };

  useEffect(() => { load(0); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donor?")) return;
    await api.delete(`/admin/donors/${id}`);
    load(page);
  };

  return (
    <>
      <h1 className="page-title">Donor List</h1>
      <hr className="page-hr" />
      <table className="data-table">
        <thead>
          <tr>
            <th>S.no</th><th>Name</th><th>Mobile Number</th><th>Email Id</th>
            <th>Age</th><th>Gender</th><th>Blood Group</th><th>Address</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d, i) => (
            <tr key={d.id}>
              <td>{page * 10 + i + 1}</td>
              <td>{d.fullName}</td>
              <td>{d.mobileNumber}</td>
              <td>{d.emailId}</td>
              <td>{d.age}</td>
              <td>{d.gender}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.address}</td>
              <td><button className="link-btn" onClick={() => handleDelete(d.id)}>DELETE</button></td>
            </tr>
          ))}
          {donors.length === 0 && (
            <tr><td colSpan={9} style={{ textAlign: "center" }}>No donors found.</td></tr>
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onChange={load} />
    </>
  );
}

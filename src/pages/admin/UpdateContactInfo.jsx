import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UpdateContactInfo() {
  const [form, setForm] = useState({ address: "", emailId: "", contactNumber: "" });
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/admin/contact-info").then((res) => setForm(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await api.put("/admin/contact-info", form);
      setMessage("Contact info updated successfully.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="page-title">Update Contact Info</h1>
      <hr className="page-hr" />
      {message && <div className="success-banner">{message}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Address</label>
          <textarea name="address" value={form.address || ""} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Email Id</label>
          <input name="emailId" value={form.emailId || ""} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Contact Number</label>
          <input name="contactNumber" value={form.contactNumber || ""} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Updating..." : "Update"}
        </button>
      </form>
    </>
  );
}

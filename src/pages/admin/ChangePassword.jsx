import { useState } from "react";
import api from "../../api/axios";

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setSubmitting(true);
    try {
      const res = await api.put("/admin/change-password", form);
      setMessage(res.data.message || "Password changed successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="page-title">Change Password</h1>
      <hr className="page-hr" />
      {message && <div className="success-banner">{message}</div>}
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Current Password</label>
          <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>New Password</label>
          <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save changes"}
        </button>
      </form>
    </>
  );
}

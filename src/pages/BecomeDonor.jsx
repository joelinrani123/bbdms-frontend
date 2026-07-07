import { useState } from "react";
import api from "../api/axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const emptyForm = {
  fullName: "",
  mobileNumber: "",
  emailId: "",
  age: "",
  gender: "",
  bloodGroup: "",
  address: "",
};

export default function BecomeDonor() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!form.fullName || !form.mobileNumber || !form.age || !form.gender || !form.bloodGroup || !form.address) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/donors", { ...form, age: Number(form.age) });
      setMessage("Thank you! You have been registered as a donor.");
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-section">
      <h1 className="page-title">Donate Blood</h1>
      <hr className="page-hr" />

      {message && <div className="success-banner">{message}</div>}
      {error && <div className="error-banner">{error}</div>}

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Full Name<span className="required">*</span></label>
          <input name="fullName" value={form.fullName} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Mobile Number<span className="required">*</span></label>
          <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Email Id</label>
          <input name="emailId" type="email" value={form.emailId} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Age<span className="required">*</span></label>
          <input name="age" type="number" min="1" value={form.age} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Gender<span className="required">*</span></label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label>Blood Group<span className="required">*</span></label>
          <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
            <option value="">Select</option>
            {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>

        <div className="form-field" style={{ gridColumn: "1 / span 2" }}>
          <label>Address<span className="required">*</span></label>
          <textarea name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

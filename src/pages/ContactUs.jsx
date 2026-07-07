import { useEffect, useState } from "react";
import api from "../api/axios";

const emptyForm = { name: "", mobileNumber: "", emailId: "", message: "" };

export default function ContactUs() {
  const [form, setForm] = useState(emptyForm);
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/contact-info").then((res) => setInfo(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.message) {
      setStatus({ type: "error", text: "Please enter your name and a message." });
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      setStatus({ type: "success", text: "Your message has been sent. Thank you!" });
      setForm(emptyForm);
    } catch (err) {
      setStatus({ type: "error", text: err.response?.data?.message || "Failed to send message." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-section">
      <h1 className="page-title">Contact Us</h1>
      <hr className="page-hr" />

      <div className="contact-grid">
        <div>
          <h3>Send us a Message</h3>
          {status && (
            <div className={status.type === "success" ? "success-banner" : "error-banner"}>
              {status.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-field" style={{ marginBottom: 16 }}>
              <label>Full Name:</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-field" style={{ marginBottom: 16 }}>
              <label>Phone Number:</label>
              <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
            </div>
            <div className="form-field" style={{ marginBottom: 16 }}>
              <label>Email Address:</label>
              <input name="emailId" type="email" value={form.emailId} onChange={handleChange} />
            </div>
            <div className="form-field" style={{ marginBottom: 16 }}>
              <label>Message:</label>
              <textarea name="message" rows={6} value={form.message} onChange={handleChange} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-details">
          <h3>Contact Details</h3>
          <h4>Address :</h4>
          <p>{info.address}</p>
          <h4>Contact Number :</h4>
          <p>{info.contactNumber}</p>
          <h4>Email :</h4>
          <a href={`mailto:${info.emailId}`}>{info.emailId}</a>
        </div>
      </div>
    </div>
  );
}

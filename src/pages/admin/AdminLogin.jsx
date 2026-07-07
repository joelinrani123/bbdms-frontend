import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2>Blood Bank &amp; Management<br />Admin Login Portal</h2>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Username<span className="required">*</span></label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
          </div>
          <div className="form-field">
            <label>Password<span className="required">*</span></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

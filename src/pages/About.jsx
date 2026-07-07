import { useEffect, useState } from "react";
import api from "../api/axios";

export default function About() {
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/pages/aboutus").then((res) => setText(res.data.pageData));
  }, []);

  return (
    <div className="container page-section">
      <div className="about-grid">
        <div>
          <h1 className="page-title">About Us</h1>
          <hr className="page-hr" />
          <p style={{ lineHeight: 1.7, fontSize: 15 }}>{text}</p>
        </div>
        <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: 320 }}>
          <path
            d="M150 40 C 100 120, 80 160, 80 200 A 70 70 0 0 0 220 200 C220 160, 200 120, 150 40 Z"
            fill="#e02424"
          />
          <rect x="105" y="150" width="90" height="20" fill="#fff" />
          <rect x="140" y="115" width="20" height="90" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}

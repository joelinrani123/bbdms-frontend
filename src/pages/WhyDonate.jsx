import { useEffect, useState } from "react";
import api from "../api/axios";

export default function WhyDonate() {
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/pages/whydonate").then((res) => setText(res.data.pageData));
  }, []);

  const stats = [
    { pct: "2%", label: "Trauma and Road Accidents" },
    { pct: "4%", label: "Obstetrics" },
    { pct: "10%", label: "Orthopaedic" },
    { pct: "13%", label: "Other Medical Problems (Heart, Liver, Kidney)" },
    { pct: "18%", label: "Surgical" },
    { pct: "19%", label: "Patients with Anemia" },
    { pct: "34%", label: "Cancer Patients and Blood Diseases" },
  ];

  return (
    <div className="container page-section">
      <div className="why-donate-grid">
        <div>
          <h1 className="page-title">Why Should I Donate Blood ?</h1>
          <hr className="page-hr" />
          <p style={{ lineHeight: 1.7, fontSize: 15 }}>{text}</p>
        </div>
        <div>
          <h3 style={{ textAlign: "center", color: "#c62828" }}>What is Donated Blood Used For?</h3>
          {stats.map((s) => (
            <div key={s.label} className="why-donate-stat-row">
              <div className="why-donate-stat-pct">{s.pct}</div>
              <div className="why-donate-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
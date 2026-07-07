import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import DonorCard from "../components/DonorCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [pages, setPages] = useState({});
  const [donors, setDonors] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    Promise.all([
      api.get("/pages/needforblood"),
      api.get("/pages/whydonate"),
    ]).then(([needRes, whyRes]) => {
      setPages({ need: needRes.data.pageData, why: whyRes.data.pageData });
    });
  }, []);

  useEffect(() => {
    api.get(`/donors?page=${page}&size=6`).then((res) => {
      setDonors(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">Blood Bank &amp; Donor Management</div>
            <h1 className="hero-headline">
              Every drop counts.<br />Your donation can save three lives.
            </h1>
            <p className="hero-subtext">
              Join a growing community of donors and help patients get the blood
              they need, when they need it most.
            </p>
            <div className="hero-actions">
              <Link to="/become-donor" className="btn btn-primary">Become A Donor</Link>
              <Link to="/need-blood" className="btn btn-outline">Need Blood</Link>
            </div>
          </div>

          <div className="hero-visual">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="315" cy="95" r="14" fill="#fdeceb" />
              <circle cx="70" cy="300" r="20" fill="#fdeceb" />

              <path
                d="M200 305
                   C 120 255, 78 205, 78 155
                   C 78 112, 112 82, 150 82
                   C 172 82, 190 93, 200 110
                   C 210 93, 228 82, 250 82
                   C 288 82, 322 112, 322 155
                   C 322 205, 280 255, 200 305 Z"
                fill="#e02424"
              />
              <path
                d="M110 160 h48 l16 -34 22 62 18 -40 14 12 h58"
                fill="none"
                stroke="#ffffff"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="hero-visual-caption">
              <strong>3 lives</strong> saved by a single blood donation
            </div>
          </div>
        </div>
      </div>

      <div className="container page-section">
        <h2 className="page-title">Welcome to BloodBank &amp; Donor Management System</h2>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-header">The need for blood</div>
            <div className="info-card-body">
              {pages.need || "There are many reasons patients need blood..."}
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-header">Blood Tips</div>
            <div className="info-card-body">
              1) You must be in good health.<br />
              2) Hydrate and eat a healthy meal before your donation.<br />
              3) You're never too old to donate blood.
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-header">Who you could Help</div>
            <div className="info-card-body">
              {pages.why || "Every 2 seconds, someone in the World needs blood..."}
            </div>
          </div>
        </div>

        <h2 className="section-heading">Blood Donor Names</h2>
        {donors.length === 0 ? (
          <p>No donors registered yet.</p>
        ) : (
          <div className="donor-grid">
            {donors.map((d) => (
              <DonorCard key={d.id} donor={d} />
            ))}
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </>
  );
}
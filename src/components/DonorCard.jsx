export default function DonorCard({ donor }) {
  const initial = donor.fullName ? donor.fullName.trim().charAt(0).toUpperCase() : "?";

  return (
    <div className="donor-card">
      <div className="donor-card-top">
        <div className="donor-avatar">{initial}</div>
        <div>
          <h3>{donor.fullName}</h3>
          <span className="donor-location">{donor.address}</span>
        </div>
        <div className="donor-bg-badge">{donor.bloodGroup}</div>
      </div>
      <div className="donor-card-body">
        <p><b>Mobile No.</b><span>{donor.mobileNumber}</span></p>
        <p><b>Gender</b><span>{donor.gender}</span></p>
        <p><b>Age</b><span>{donor.age}</span></p>
      </div>
    </div>
  );
}

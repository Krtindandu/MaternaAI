import { useContext, useState } from "react";
import { PatientContext } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { patients } = useContext(PatientContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.motherName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedPatients = [...filteredPatients].sort(
    (a, b) => b.riskScore - a.riskScore
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Doctor Dashboard

        <button
  onClick={() => {
    localStorage.removeItem("patients");
    window.location.reload();
  }}
  className="bg-red-600 text-white px-4 py-2 rounded-lg mb-4"
>
  Clear History
</button>
      </h1>

      <input
        type="text"
        placeholder="Search patient by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="font-bold">
            Total Patients
          </h3>
          <p className="text-3xl">{patients.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="font-bold text-red-600">
            High Risk
          </h3>
          <p className="text-3xl">
            {patients.filter((p) => p.riskScore >= 70).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="font-bold text-yellow-600">
            Medium Risk
          </h3>
          <p className="text-3xl">
            {
              patients.filter(
                (p) =>
                  p.riskScore >= 40 &&
                  p.riskScore < 70
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="font-bold text-green-600">
            Low Risk
          </h3>
          <p className="text-3xl">
            {patients.filter((p) => p.riskScore < 40).length}
          </p>
        </div>

      </div>

      {/* Patient Cards */}
      <div className="space-y-6">
        {sortedPatients.map((patient, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow cursor-pointer"
            onClick={() => navigate(`/patient/${index}`)}
          >
            <div className="flex items-center gap-4 mb-4">

  {patient.image ? (
    <img
      src={patient.image}
      alt="Mother"
      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
    />
  ) : (
    <div className="w-16 h-16 rounded-full bg-slate-300"></div>
  )}

  <div>
    <h2 className="text-2xl font-bold">
      {patient.motherName}
    </h2>

    <p className="text-gray-500">
      {patient.village}
    </p>
  </div>

</div>

            <p>Age: {patient.age}</p>
            <p>Type: {patient.patientType}</p>

            {patient.patientType === "pregnant" ? (
              <p>
                Pregnancy Week: {patient.pregnancyWeek}
              </p>
            ) : (
              <p>
                Postpartum Day: {patient.postpartumDays}
              </p>
            )}

            <p>Village: {patient.village}</p>
            <p>Phone: {patient.phone}</p>

<div className="mt-3">

  <span
    className={`px-3 py-1 rounded-full text-white font-bold ${
      patient.riskScore >= 70
        ? "bg-red-600"
        : patient.riskScore >= 40
        ? "bg-yellow-500"
        : "bg-green-600"
    }`}
  >
    {patient.riskLevel}
  </span>

</div>
            <p
              className={`font-bold mt-2 ${
                patient.riskScore >= 70
                  ? "text-red-600"
                  : patient.riskScore >= 40
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              Risk Score: {patient.riskScore}

              {patient.riskScore >= 70 && (
  <div className="mt-2">

    <p className="text-red-600 font-bold">
      Status:
      Pending Doctor Review
    </p>

  </div>
)}
            </p>
          </div>
        ))}
      </div>

      {/* Alert Button */}
      {patients.some((p) => p.riskScore >= 70) && (
        <button
          onClick={() => navigate("/alert")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mt-6"
        >
          View Alerts
        </button>
      )}

    </div>
  );
}

export default Dashboard;
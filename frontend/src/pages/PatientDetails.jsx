import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { patients } = useContext(PatientContext);

  const patient = patients[id];

  if (!patient) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Patient Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="bg-white p-8 rounded-xl shadow">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            {patient.motherName}
          </h1>

          <span
            className={`px-4 py-2 rounded-full text-white font-bold ${
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

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <h2 className="text-xl font-bold mb-3">
              Personal Details
            </h2>

            <p><strong>Age:</strong> {patient.age}</p>

            <p>
              <strong>Type:</strong>{" "}
              {patient.patientType === "pregnant"
                ? "Pregnant Woman"
                : "Postpartum Mother"}
            </p>

            {patient.patientType === "pregnant" ? (
              <p>
                <strong>Pregnancy Week:</strong>{" "}
                {patient.pregnancyWeek}
              </p>
            ) : (
              <p>
                <strong>Postpartum Day:</strong>{" "}
                {patient.postpartumDays}
              </p>
            )}

            <p>
              <strong>Village:</strong>{" "}
              {patient.village}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {patient.phone}
            </p>

            <p>
              <strong>Language:</strong>{" "}
              {patient.language}
            </p>

          </div>

          <div>

            <h2 className="text-xl font-bold mb-3">
              Screening Result
            </h2>

            <p>
              <strong>Disease:</strong>{" "}
              {patient.disease}
            </p>

            <p>
              <strong>Risk Score:</strong>{" "}
              {patient.riskScore}
            </p>

            <p>
              <strong>Risk Level:</strong>{" "}
              {patient.riskLevel}
            </p>

          </div>

        </div>

        <div className="mt-8">

  <h2 className="text-xl font-bold mb-3">
    Maternal Photo
  </h2>

  {patient.image ? (
    <img
      src={patient.image}
      alt="Mother"
      className="w-64 rounded-xl border shadow"
    />
  ) : (
    <div className="border-2 border-dashed p-10 rounded-lg text-center text-gray-500">
      No Photo Available
    </div>
  )}

</div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/alert")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            View Alerts
          </button>

        </div>

      </div>

    </div>
  );
}

export default PatientDetails;
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";

function Alert() {
  const navigate = useNavigate();

  const { patients } = useContext(PatientContext);

  const highRiskPatients = patients.filter(
    (patient) => patient.riskScore >= 70
  );

  return (
    <div className="min-h-screen bg-red-50 p-8">

      <h1 className="text-4xl font-bold text-red-600 mb-2">
        🚨 Emergency Alerts
      </h1>

      <p className="text-lg mb-6">
        High-risk maternal cases requiring attention
      </p>

      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold">
          Total High Risk Cases:
          <span className="text-red-600 ml-2">
            {highRiskPatients.length}
          </span>
        </h2>
      </div>

      <div className="space-y-6">

        {highRiskPatients.map((patient) => (

          <div
            key={patient.phone}
            className="bg-white p-6 rounded-xl shadow border-l-8 border-red-600"
          >

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              🚨 CRITICAL CASE
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <p>
                  <strong>Mother:</strong>{" "}
                  {patient.motherName}
                </p>

                <p>
                  <strong>Age:</strong>{" "}
                  {patient.age}
                </p>

                <p>
                  <strong>Village:</strong>{" "}
                  {patient.village}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {patient.phone}
                </p>
              </div>

              <div>
                <p>
                  <strong>Risk Score:</strong>{" "}
                  <span className="text-red-600 font-bold">
                    {patient.riskScore}
                  </span>
                </p>

                <p>
                  <strong>Condition:</strong>{" "}
                  {patient.patientType === "pregnant"
                    ? "Pre-eclampsia Risk Assessment"
                    : "Postpartum Depression Assessment"}
                </p>

                <p>
  <strong>Recommended Doctor:</strong>{" "}
  {
    patient.patientType === "pregnant"
      ? "Obstetrician / Gynecologist"
      : "Psychiatrist / Mental Health Specialist"
  }
</p>

<p>
  <strong>Recommended Action:</strong>{" "}
  Immediate Medical Review
</p>

                <p>
                  <strong>Status:</strong>
                  Pending
                </p>
              </div>

            </div>

            <div className="mt-5 bg-red-100 p-4 rounded-lg">

  <p className="font-bold">
    🚑 Case Forwarded to PHC Doctor
  </p>

  <p className="mt-2">
    Status: Pending Doctor Response
  </p>

  <p>
    Escalation Level: 1
  </p>

  <p className="text-sm text-gray-600 mt-2">
    If no response is received,
    MaternaAI automatically escalates
    the case to another doctor or
    a higher-level healthcare facility.
  </p>

</div>

            <div className="flex gap-3 mt-5 flex-wrap">

              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                📞 Call Patient
              </button>

<button
  className="bg-green-700 text-white px-4 py-2 rounded-lg"
>
  🩺 Accept Case
</button>

<button
  className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
>
  🔄 Transfer Doctor
</button>

<button
  className="bg-red-700 text-white px-4 py-2 rounded-lg"
>
  🏥 Refer Hospital
</button>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                ✅ Mark Reviewed
              </button>

              <button
                onClick={() => {
  const patientIndex =
    patients.findIndex(
      (p) =>
        p.phone === patient.phone
    );

  navigate(`/patient/${patientIndex}`);
}}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg"
              >
                👁 View Details
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="bg-white p-5 rounded-xl shadow mt-8">

        <h3 className="font-bold text-xl mb-3">
          Risk Color Guide
        </h3>

        <p className="text-red-600 font-bold">
          🔴 High Risk
        </p>

        <p className="text-yellow-600 font-bold">
          🟡 Medium Risk
        </p>

        <p className="text-green-600 font-bold">
          🟢 Low Risk
        </p>

      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-slate-800 text-white px-8 py-3 rounded-lg mt-8"
      >
        Back to Dashboard
      </button>

    </div>
  );
}

export default Alert;
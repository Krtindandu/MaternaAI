import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PatientContext } from "../context/PatientContext";

function Analysis() {
  const navigate = useNavigate();

  const {
    patientData,
    patients,
    setPatients,
  } = useContext(PatientContext);

  const totalScore = Object.values(
  patientData.answers || {}
).reduce((sum, value) => sum + value, 0);

const riskScore = Math.round(
  (totalScore / 150) * 100
);

  let riskLevel = "";

  if (riskScore >= 70) {
  riskLevel = "HIGH";
}
else if (riskScore >= 35) {
  riskLevel = "MEDIUM";
}
else {
  riskLevel = "LOW";
}

  const disease =
    patientData.patientType === "pregnant"
      ? "Pre-eclampsia"
      : "Postpartum Depression";

  useEffect(() => {
  const updatedPatient = {
    ...patientData,
    riskScore,
    riskLevel,
    disease,
  };

  const alreadyExists = patients.find(
    (p) =>
      p.motherName === updatedPatient.motherName &&
      p.phone === updatedPatient.phone
  );

  if (
    updatedPatient.motherName &&
    updatedPatient.phone &&
    !alreadyExists
  ) {
    setPatients((prevPatients) => [
      ...prevPatients,
      updatedPatient,
    ]);
  }
}, [patientData]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          AI Risk Analysis
        </h1>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          
{patientData.image && (
  <div className="flex justify-center mb-4">
    <img
      src={patientData.image}
      alt="Mother"
      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
    />
  </div>
)}
          <h2 className="text-xl font-bold">
            {patientData.motherName}
          </h2>

          <p>Age: {patientData.age}</p>

          <p>
            Type:{" "}
            {patientData.patientType === "pregnant"
              ? "Pregnant Woman"
              : "Postpartum Mother"}
          </p>

          {patientData.patientType === "pregnant" ? (
            <p>
              Pregnancy Week: {patientData.pregnancyWeek}
            </p>
          ) : (
            <p>
              Postpartum Day: {patientData.postpartumDays}
            </p>
          )}

          <p>Village: {patientData.village}</p>

          <div className="mt-2">
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
    {patientData.language}
  </span>
</div>

          <p>Phone: {patientData.phone}</p>
          <p>
  Assessment Time:
  {new Date().toLocaleString()}
</p>

        </div>

        <div className="flex justify-center mb-8">

          <div
            className={`w-48 h-48 rounded-full flex items-center justify-center border-8 ${
              riskLevel === "HIGH"
                ? "bg-red-100 border-red-500"
                : riskLevel === "MEDIUM"
                ? "bg-yellow-100 border-yellow-500"
                : "bg-green-100 border-green-500"
            }`}
          >

            <div className="text-center">

              <h2
                className={`text-5xl font-bold ${
                  riskLevel === "HIGH"
                    ? "text-red-600"
                    : riskLevel === "MEDIUM"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {riskScore}
              </h2>

              <p className="text-lg">
                Risk Score
              </p>

            </div>

          </div>

        </div>

        <div
          className={`border-l-4 p-5 rounded-lg mb-6 ${
            riskLevel === "HIGH"
              ? "bg-red-50 border-red-500"
              : riskLevel === "MEDIUM"
              ? "bg-yellow-50 border-yellow-500"
              : "bg-green-50 border-green-500"
          }`}
        >

          <h2
            className={`text-2xl font-bold ${
              riskLevel === "HIGH"
                ? "text-red-700"
                : riskLevel === "MEDIUM"
                ? "text-yellow-700"
                : "text-green-700"
            }`}
          >
            {riskLevel} RISK
          </h2>

          <p className="mt-2">
  Screening Category:
<b>
  {patientData.patientType === "pregnant"
    ? "Pre-eclampsia Risk Assessment"
    : "Postpartum Depression Assessment"}
</b>
</p>

          <p className="mt-2">

            {riskLevel === "HIGH"
              ? "Immediate medical consultation recommended."
              : riskLevel === "MEDIUM"
              ? "Follow-up assessment and monitoring advised."
              : "Continue routine monitoring."}

          </p>

        </div>

        <div className="bg-slate-100 p-5 rounded-lg mb-6">

          <h3 className="font-bold text-xl mb-3">
            AI Recommendation
          </h3>

          {riskLevel === "HIGH" && (
            <ul className="space-y-2">
              <li>🚨 Immediate doctor review required</li>
              <li>🚨 Alert generated for ASHA Worker</li>
              <li>🚨 Schedule consultation within 24 hours</li>
            </ul>
          )}

          {riskLevel === "MEDIUM" && (
            <ul className="space-y-2">
              <li>⚠ Follow-up assessment recommended</li>
              <li>⚠ Monitor symptoms regularly</li>
              <li>⚠ Reassess within 7 days</li>
            </ul>
          )}

          {riskLevel === "LOW" && (
            <ul className="space-y-2">
              <li>✅ No major risk indicators detected</li>
              <li>✅ Continue routine monitoring</li>
              <li>✅ Maintain regular healthcare visits</li>
            </ul>
          )}

        </div>
     <div className="bg-yellow-50 border border-yellow-400 p-4 rounded-lg mb-4">
  <p className="text-sm">
    This is an AI-assisted screening tool.
    Results support ASHA workers and
    healthcare professionals and do not
    replace clinical diagnosis.
  </p>
</div>

<button
  onClick={() => navigate("/dashboard")}
  className="w-full bg-blue-600 text-white p-3 rounded-lg"
>
  View Doctor Dashboard →
</button>

      </div>

    </div>
  );
}

export default Analysis;
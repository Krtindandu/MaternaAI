import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import CameraCapture from "../components/CameraCapture";

function Assessment() {
  const navigate = useNavigate();
  const { setPatientData } = useContext(PatientContext);

  const [formData, setFormData] = useState({
    motherName: "",
    age: "",
    patientType: "",
    pregnancyWeek: "",
    postpartumDays: "",
    village: "",
    language: "",
    phone: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageCapture = (imageData) => {
    setFormData({
      ...formData,
      image: imageData,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.motherName ||
      !formData.age ||
      !formData.patientType ||
      !formData.language
    ) {
      alert("Please fill all required fields");
      return;
    }

    setPatientData(formData);

    navigate("/questions");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Maternal Assessment
        </h1>

        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          placeholder="Mother Name"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <select
          name="patientType"
          value={formData.patientType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="">Select Patient Type</option>
          <option value="pregnant">Pregnant Woman</option>
          <option value="postpartum">Postpartum Mother</option>
        </select>

        {formData.patientType === "pregnant" && (
          <input
            type="number"
            name="pregnancyWeek"
            value={formData.pregnancyWeek}
            onChange={handleChange}
            placeholder="Pregnancy Week"
            className="w-full p-3 border rounded-lg mb-4"
          />
        )}

        {formData.patientType === "postpartum" && (
          <input
            type="number"
            name="postpartumDays"
            value={formData.postpartumDays}
            onChange={handleChange}
            placeholder="Postpartum Days"
            className="w-full p-3 border rounded-lg mb-4"
          />
        )}

        <input
          type="text"
          name="village"
          value={formData.village}
          onChange={handleChange}
          placeholder="Village"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
        </select>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg mb-6"
        />

        {/* CAMERA SECTION */}

        <div className="mb-6">
          <CameraCapture
            onImageCapture={handleImageCapture}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Begin Screening →
        </button>

      </div>
    </div>
  );
}

export default Assessment;
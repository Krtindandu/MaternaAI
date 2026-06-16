import { createContext, useState, useEffect } from "react";

export const PatientContext = createContext();

export const PatientProvider = ({
  children,
}) => {
  const [patientData, setPatientData] =
    useState({
      riskScore: 0,
    });

  const [patients, setPatients] =
    useState(() => {
      const savedPatients =
        localStorage.getItem("patients");

      return savedPatients
        ? JSON.parse(savedPatients)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );
  }, [patients]);

  return (
    <PatientContext.Provider
      value={{
        patientData,
        setPatientData,
        patients,
        setPatients,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
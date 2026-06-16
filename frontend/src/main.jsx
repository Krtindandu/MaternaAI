import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { PatientProvider } from "./context/PatientContext";

createRoot(document.getElementById("root")).render(
  <PatientProvider>
    <App />
  </PatientProvider>
);
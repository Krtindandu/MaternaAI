import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Assessment from "../pages/Assessment";
import Analysis from "../pages/Analysis";
import Dashboard from "../pages/Dashboard";
import Alert from "../pages/Alert";
import Questions from "../pages/Questions";
import PatientDetails from "../pages/PatientDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/questions" element={<Questions />} />
        <Route
  path="/patient/:id"
  element={<PatientDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
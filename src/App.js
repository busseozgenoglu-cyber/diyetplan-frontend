import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuestionFlow from "./pages/QuestionFlow";
import AnalysisScreen from "./pages/AnalysisScreen";
import ContactForm from "./pages/ContactForm";
import PaymentScreen from "./pages/PaymentScreen";
import SuccessPage from "./pages/SuccessPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function AdminRoute({ children }) {
  const token = localStorage.getItem("admin_token");
  return token ? children : <Navigate to="/admin/giris" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sorular" element={<QuestionFlow />} />
        <Route path="/analiz" element={<AnalysisScreen />} />
        <Route path="/iletisim" element={<ContactForm />} />
        <Route path="/odeme" element={<PaymentScreen />} />
        <Route path="/basari" element={<SuccessPage />} />
        <Route path="/admin/giris" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

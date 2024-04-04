import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import VRPage from "./pages/VRPage";

import Layout from "./components/Layout";

import ProtectedRoutes from "./hooks/protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="vr" element={<VRPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

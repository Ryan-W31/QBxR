import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";

import Layout from "./components/Layout";

import ProtectedRoutes from "./hooks/protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="home" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

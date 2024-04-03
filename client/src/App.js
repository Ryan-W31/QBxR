import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";

import ProtectedRoutes from "./hooks/protectedRoutes/ProtectedRoutes";

const ROLES = {
  Player: "Player",
  NonPlayer: "NonPlayer",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

        <Route
          element={<ProtectedRoutes allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

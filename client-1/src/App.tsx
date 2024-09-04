// Main App component
import { Routes, Route } from "react-router-dom";

// Import the pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailInterceptPage from "./pages/EmailInterceptPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import VRPage from "./pages/VRPage";
import WebTestPage from "./pages/WebTestPage";

// Import the Layout, Prefetch, and PersistLogin components
import Prefetch from "./components/Prefetch";

import ProtectedRoutes from "./hooks/auth/ProtectedRoutes";
import RoleAuth from "./hooks/auth/RoleAuth";

// Main App component
function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot" element={<ForgotPasswordPage />} />
        <Route path="reset" element={<ResetPasswordPage />} />
        {/*Begin Protected Routes*/}
        <Route path="email" element={<EmailInterceptPage />} />
        <Route path="verify" element={<VerifyEmailPage />} />
        {/* <Route element={<ProtectedRoutes />}> */}
        {/* <Route element={<Prefetch />}> */}
        <Route path="home" element={<HomePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="profile/:userId?" element={<ProfilePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route element={<RoleAuth />}>
          <Route path="vr" element={<VRPage />} />
          <Route path="web" element={<WebTestPage />} />
        </Route>
        {/* </Route>
        </Route> */}
        {/*End Protected Routes*/}
      </Route>
    </Routes>
  );
}

export default App;

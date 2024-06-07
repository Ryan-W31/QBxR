// Main App component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import VRPage from "./pages/VRPage";
import WebTestPage from "./pages/WebTestPage";

// Import the Layout, Prefetch, and PersistLogin components
import Layout from "./components/Layout";
import Prefetch from "./components/Prefetch";
import PersistLogin from "./components/PersistLogin";

import ProtectedRoutes from "./hooks/protectedRoutes/ProtectedRoutes";

// Import the ToastProvider and Redux Provider components
import { ToastProvider } from "./components/Toast";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Main App component
function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="vr" element={<VRPage />} />
              <Route path="web" element={<WebTestPage />} />

              {/*Begin Protected Routes*/}
              <Route element={<PersistLogin />}>
                {/* <Route element={<ProtectedRoutes />}> */}
                <Route element={<Prefetch />}>
                  <Route path="home" element={<HomePage />} />
                  <Route path="leaderboard" element={<LeaderboardPage />} />
                  <Route path="profile/:id?" element={<ProfilePage />} />
                  <Route path="search" element={<SearchPage />} />
                </Route>
              </Route>
              {/*End Protected Routes*/}
            </Route>
            {/* </Route> */}
          </Routes>
        </ToastProvider>
      </Router>
    </Provider>
  );
}

export default App;

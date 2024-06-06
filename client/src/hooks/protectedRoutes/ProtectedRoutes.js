import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

// ProtectedRoutes component. This component protects the routes that require authentication.
const ProtectedRoutes = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (token === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  // If the user is authenticated, display the protected routes. Otherwise, navigate to the login page.
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;

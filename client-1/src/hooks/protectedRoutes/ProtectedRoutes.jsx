import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/authSlice";

// ProtectedRoutes component. This component protects the routes that require authentication.
const ProtectedRoutes = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (token === undefined || user === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  // If the user is authenticated, display the protected routes. Otherwise, navigate to the login page.
  return token ? (
    <>
      {user?.isVerified ? (
        <Outlet />
      ) : (
        <Navigate to="/verify" state={{ from: location }} replace />
      )}
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;

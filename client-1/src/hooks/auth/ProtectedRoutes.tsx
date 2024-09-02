import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Loader2 } from "lucide-react";

// ProtectedRoutes component. This component protects the routes that require authentication.
const ProtectedRoutes = () => {
  const accessToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (accessToken === undefined || user === undefined) {
    <div className="h-screen flex justify-center items-center">
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
    </div>;
  }

  // If the user is authenticated, display the protected routes. Otherwise, navigate to the login page.
  return user ? (
    <>{user.isVerified ? <Outlet /> : <Navigate to="/email" state={{ from: location }} replace />}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;

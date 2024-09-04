import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGetUserQuery } from "../users/userApiSlice";

// ProtectedRoutes component. This component protects the routes that require authentication.
const ProtectedRoutes = () => {
  const { data: response, isLoading } = useGetUserQuery();
  const location = useLocation();

  const user = response?.user;

  // If the user is authenticated, display the protected routes. Otherwise, navigate to the login page.
  return isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
    </div>
  ) : user ? (
    <>{user.isVerified ? <Outlet /> : <Navigate to="/email" state={{ from: location }} replace />}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;

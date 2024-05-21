import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

const ProtectedRoutes = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (token === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;

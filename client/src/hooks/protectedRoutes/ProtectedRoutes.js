import { useLocation, Navigate, Outlet } from "react-router-dom";
import useRoles from "../auth/roles";

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useRoles();

  if (!roles) {
    const content = <Navigate to="/login" state={{ from: location }} replace />;
    return content;
  } else {
    const content = roles.some((role) => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
    return content;
  }
};

export default ProtectedRoutes;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const RoleAuth = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser?.role === "PLAYER") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RoleAuth;

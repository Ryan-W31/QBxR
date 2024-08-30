import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import React from "react";

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

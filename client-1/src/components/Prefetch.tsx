import { useAppDispatch } from "@/hooks/auth/authSlice";
import { userApiSlice } from "../hooks/users/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

// Prefetch component. This component prefetches the leaderboard data.
const Prefetch = () => {
  const dispatch = useAppDispatch();
  // Prefetch the leaderboard data when the component mounts
  useEffect(() => {
    const users = dispatch(userApiSlice.endpoints.getLeaderboard.initiate());
    return () => {
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;

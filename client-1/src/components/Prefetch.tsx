import { store } from "../app/store";
import { userApiSlice } from "../hooks/users/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

// Prefetch component. This component prefetches the leaderboard data.
const Prefetch = () => {
  // Prefetch the leaderboard data when the component mounts
  useEffect(() => {
    const users = store.dispatch(userApiSlice.endpoints.getLeaderboard.initiate());
    return () => {
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;

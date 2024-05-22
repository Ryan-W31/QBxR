import { store } from "../app/store";
import { userApiSlice } from "../hooks/users/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import React from "react";

const Prefetch = () => {
  useEffect(() => {
    // console.log("Prefetching leaderboard data");
    const users = store.dispatch(
      userApiSlice.endpoints.getLeaderboard.initiate()
    );
    return () => {
      // console.log("Unsubscribing from leaderboard data");
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;

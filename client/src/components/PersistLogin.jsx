import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../hooks/auth/authApiSlice";
import usePersist from "../hooks/auth/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../hooks/auth/authSlice";

// PersistLogin component. This component persists the login state of the user.
const PersistLogin = () => {
  // Get the persist state, token, and refresh mutation from the auth slice
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  // Verify the refresh token when the component mounts
  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    };

    // If the token exists and the persist state is true, verify the refresh token
    if (!token && persist) verifyRefreshToken();

    return;
    //eslint-disable-next-line
  }, []);

  // Display the content based on the state of the refresh mutation
  let content;

  if (!persist) {
    // If the persist state is false, display the login page
    content = <Outlet />;
  } else if (isLoading) {
    // If the refresh mutation is loading, display a loading message
    content = <p className="text-light-primary">Loading...</p>;
  } else if (isError) {
    // If the refresh mutation has an error, display an error message
    content = (
      <p className="text-light-primary">
        {error.data?.message}
        <Link
          to="/login"
          className="mx-2 px-6 py-2 font-Audiowide bg-green-primary text-light-primary rounded-full"
        >
          Please login again
        </Link>
        .
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // If the refresh mutation is successful and the trueSuccess state is true, display the application
    console.log("true success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // If the token exists and the refresh mutation is uninitialized, display the application
    console.log("token exists");
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;

import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../hooks/auth/authApiSlice";
import usePersist from "../hooks/auth/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../hooks/auth/authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

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

    if (!token && persist) verifyRefreshToken();

    return;
    //eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p className="text-light-primary">Loading...</p>;
  } else if (isError) {
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
    console.log("true success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token exists");
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;

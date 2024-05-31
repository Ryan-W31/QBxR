import React from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import { classNames } from "../utils/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { selectCurrentId } from "../hooks/auth/authSlice";
import {
  useUpdateUserInfoMutation,
  useGetUserByIdQuery,
} from "../hooks/users/userApiSlice";

const ProfilePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [status, setStatus] = useState(true);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserByIdQuery(useSelector(selectCurrentId), {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  function checkData() {
    if (webData === null && vrData === null) {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the Web and VR Tests
        </p>
      );
    } else if (webData === null) {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the Web Test
        </p>
      );
    } else {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the VR Test
        </p>
      );
    }
  }

  function getInitials(name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }

  function getAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleStatusChange = (e) => {
    e.preventDefault();

    var str2bool = (value) => {
      if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
      }
      return value;
    };

    setStatus(str2bool(e.target.value));
    updateUserInfo({ id: user.id, status: str2bool(e.target.value) });
  };

  const webData = null;
  const vrData = null;
  let content = null;

  console.log(user);

  if (error) {
    content = (
      <div className="flex flex-row jusitfy-center">
        <p className="text-light-primary">
          An error occurred: {error.data?.message}.
        </p>
        <Link
          to="/login"
          className="mx-2 px-6 py-2 font-Audiowide bg-green-primary text-light-primary rounded-full"
        >
          Please login again
        </Link>
      </div>
    );
  } else if (isLoading) {
    content = <p className="text-light-primary font-Audiowide">Loading...</p>;
  } else {
    content = (
      <div>
        <ScrollToTop showMenu={showMenu} />
        <NavBar
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="profile"
        />
        <MobileMenu
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="profile"
        />

        <div className={showMenu ? "blur-lg pointer-events-none" : ""}>
          <div class="mx-auto flex flex-col md:flex-row my-5 p-5">
            <div class="md:w-1/3 w-full flex-col bg-dark-secondary/80 p-3 border-t-4 border-green-primary rounded-lg text-center font-Audiowide">
              <div class="image overflow-hidden p-3">
                <div className="h-60 w-60 text-light-primary bg-green-primary border border-light-primary rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                  {getInitials(`${user?.firstname} ${user?.lastname}`)}
                </div>
              </div>
              <h1 class="text-light-primary font-bold text-xl leading-8 my-1">
                {user?.firstname} {user?.lastname}
              </h1>
              <h3 class="text-light-secondary font-lg text-semibold leading-6">
                {user?.school_organization}
              </h3>
              <div>
                {user?.bio !== undefined ? (
                  <p class="text-sm text-light-secondary leading-6">
                    {user?.bio}
                  </p>
                ) : null}
              </div>
              <ul class="bg-dark-secondary text-light-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-green-primary">
                <li class="flex items-center py-3">
                  <span>Status</span>
                  <span class="ml-auto">
                    <select
                      className={classNames(
                        user.status && status
                          ? "bg-green-primary"
                          : "bg-red-600",
                        "text-light-primary py-1 px-2 rounded text-sm"
                      )}
                      onChange={handleStatusChange}
                    >
                      {user.status && status ? (
                        <option selected>Active</option>
                      ) : (
                        <option selected>Inactive</option>
                      )}
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </span>
                </li>
                <li class="flex items-center py-3">
                  <span>Age</span>
                  {user?.birthday !== undefined ? (
                    <span class="ml-auto">
                      {getAge(user.birthday)} years old
                    </span>
                  ) : (
                    <span class="ml-auto">N/A</span>
                  )}
                </li>
              </ul>
              <div class="my-4"></div>
            </div>
            <div class="w-full md:w-9/12 my-4 md:my-0 md:mx-2 border-t-4 border-green-primary">
              <div class="bg-dark-secondary/80 p-3 rounded-lg font-Audiowide">
                <div class="flex justify-center text-center space-x-2 font-semibold text-light-primary">
                  <span class="tracking-wide text-3xl">About</span>
                </div>
                <div class="text-light-secondary">
                  <div class="grid md:grid-cols-2 text-lg">
                    <div class="grid grid-cols-2">
                      <div class="px-2 py-2 font-semibold">Name</div>
                      <div class="px-2 py-2">
                        {user?.firstname} {user?.lastname}
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-2 py-2 font-semibold">Email</div>
                      <a
                        class=" px-2 py-2 text-light-primary hover:text-green-primary"
                        href={"mailto:" + user?.email}
                      >
                        {user?.email}
                      </a>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-2 py-2 font-semibold">Phone No.</div>
                      {user?.phone_number !== undefined ? (
                        <div class="px-2 py-2">{user.phone_number}</div>
                      ) : (
                        <div class="px-2 py-2">N/A</div>
                      )}
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-2 py-2 font-semibold">Birthday</div>
                      {user?.birthday !== undefined ? (
                        <div class="px-2 py-2">{user.birthday}</div>
                      ) : (
                        <div class="px-2 py-2">N/A</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="my-4"></div>

              <div className="bg-dark-secondary/80 p-4 rounded-lg border-t-4 border-green-primary">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-light-primary font-Audiowide m-2">
                    Your QBxR Score
                  </h1>
                  {webData !== null && vrData !== null ? (
                    <SkeletonTheme
                      baseColor="#0C0C0C"
                      highlightColor="#AAAAAA"
                      duration={1.5}
                      borderRadius="0.5rem"
                    >
                      {webData?.length === 0 || vrData?.length === 0 ? (
                        <Skeleton width={75} height={75} />
                      ) : (
                        <p className="mx-5 text-5xl font-Audiowide text-green-primary">
                          85
                        </p>
                      )}
                    </SkeletonTheme>
                  ) : (
                    <div>
                      <p className="m-4 text-3xl font-Audiowide text-light-primary">
                        No Data
                      </p>
                      {checkData()}
                    </div>
                  )}

                  <p className="text-light-secondary font-Audiowide">
                    Your QBxR score is calculated by taking the average of your
                    Web and VR test scores.
                  </p>
                </div>
                <div className="flex md:flex-row flex-col justify-evenly md:space-x-4 font-Audiowide">
                  <div className="flex flex-col">
                    <ScoreCard
                      title={"Your Web Test Scores"}
                      errMessage={"Take The Web Test"}
                      size="3"
                      data={webData}
                    />
                    {webData === null ? (
                      <Link
                        to="/web"
                        className="py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center"
                      >
                        Take The Web Test
                      </Link>
                    ) : null}
                  </div>
                  <div class="my-4 md:my-0"></div>
                  <div className="flex flex-col">
                    <ScoreCard
                      title={"Your VR Test Scores"}
                      errMessage={"Take The VR Test"}
                      size="3"
                      data={vrData}
                    />
                    {vrData === null ? (
                      <Link
                        to="/vr"
                        className="py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center"
                      >
                        Take The VR Test
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default ProfilePage;

import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import EditProfileCard from "../components/EditProfileCard";
import { classNames } from "../utils/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { differenceInYears } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
  useUpdateUserInfoMutation,
  useGetUserByIdQuery,
  useGetUserFavoritesQuery,
} from "../hooks/users/userApiSlice";
import {
  useGetVRScoreQuery,
  useGetWebScoreQuery,
  useGetQBxRScoreQuery,
} from "../hooks/users/scoreApiSlice";
import { FiEdit } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa6";

const ProfilePage = () => {
  const [showBlur, setShowBlur] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [status, setStatus] = useState(true);
  const [myProfile, setMyProfile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState("");

  const { id } = useParams();
  const myId = useSelector(selectCurrentId);

  useEffect(() => {
    if (id !== undefined && id !== myId) {
      setUserId(id);
    } else {
      setUserId(myId);
      setMyProfile(true);
    }
  }, [id, myId]);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserByIdQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: !userId,
  });

  const { data: vrData, isLoading: isLoadingVRScore } = useGetVRScoreQuery(
    userId,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      skip: !userId,
    }
  );
  const { data: webData, isLoading: isLoadingWebScore } = useGetWebScoreQuery(
    userId,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      skip: !userId,
    }
  );

  const { data: qbxrData, isLoading: isLoadingQBxRData } = useGetQBxRScoreQuery(
    userId,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      skip: !userId,
    }
  );

  const { data: isFavoriteData, isLoading: isLoadingFavoriteData } =
    useGetUserFavoritesQuery(myId, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  useEffect(() => {
    if (!isLoadingFavoriteData && isFavoriteData !== undefined) {
      if (isFavoriteData.favorites.includes(id)) {
        setIsFavorite(true);
      }
    }
  }, [isFavoriteData, id]);

  function checkData() {
    if (
      (webData === undefined || webData?.length === 0) &&
      (vrData === undefined || vrData?.length === 0)
    ) {
      return (
        <p className="text-xl font-Audiowide text-light-primary">
          Take the Web and VR Tests
        </p>
      );
    } else if (webData === undefined || webData?.length === 0) {
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

  function getAge(dob) {
    const date = new Date(dob);
    const age = differenceInYears(new Date(), date);
    return age;
  }

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  const toggleBlur = () => {
    setShowBlur((prevState) => !prevState);
  };

  const handleEditProfile = () => {
    setShowEditProfile((prevState) => !prevState);
    toggleBlur();
  };

  const handleClose = () => {
    setShowEditProfile(false);
    toggleBlur();
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();

    var str2bool = (value) => {
      if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
      }
      return value;
    };

    setStatus(str2bool(e.target.value));
    await updateUserInfo({ id: user.id, status: str2bool(e.target.value) });
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    setIsFavorite((prevState) => !prevState);
    await updateUserInfo({ id: myId, favorite: id });
    window.location.reload();
  };

  let content = null;

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
  } else if (isLoading || !user) {
    content = <p className="text-light-primary font-Audiowide">Loading...</p>;
  } else {
    content = (
      <div>
        <MobileMenu
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          isLandingPage={false}
          currentPage="profile"
        />

        <div className={showBlur ? "blur-lg pointer-events-none" : ""}>
          <ScrollToTop showMenu={showMenu} />
          <NavBar
            showMenu={showMenu}
            toggleMenu={toggleMenu}
            isLandingPage={false}
            currentPage="profile"
          />
          <div class="mx-auto flex flex-col md:flex-row my-5 p-5">
            <div class="md:w-1/3 w-full flex-col bg-dark-secondary/80 p-3 border-t-4 border-green-primary rounded-lg text-center font-Audiowide relative">
              {!myProfile ? (
                <div class="absolute top-3 right-3">
                  {isFavorite ? (
                    <FaStar
                      className="cursor-pointer text-2xl text-[#DBAC34]/80"
                      onClick={handleFavorite}
                    />
                  ) : (
                    <FaRegStar
                      className="cursor-pointer text-2xl text-light-primary"
                      onClick={handleFavorite}
                    />
                  )}
                </div>
              ) : null}
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
                    {myProfile ? (
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
                    ) : (
                      <div
                        className={classNames(
                          user.status ? "bg-green-primary" : "bg-red-600",
                          "text-light-primary py-1 px-2 rounded text-sm"
                        )}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </div>
                    )}
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
            <div class="w-full md:w-9/12 my-4 md:my-0 md:mx-2 font-Audiowide">
              <div class="bg-dark-secondary/80 p-4 rounded-lg border-t-4 border-green-primary">
                <div className="w-full relative">
                  <div class="flex justify-center text-center space-x-2 font-semibold text-light-primary">
                    <span class="tracking-wide text-3xl">About</span>
                  </div>
                  {myProfile ? (
                    <FiEdit
                      className="cursor-pointer text-xl text-light-primary hover:text-green-primary absolute top-0 right-0"
                      onClick={handleEditProfile}
                    />
                  ) : null}
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
                        <div class="px-2 py-2">
                          {formatPhoneNumberIntl(user.phone_number)}
                        </div>
                      ) : (
                        <div class="px-2 py-2">N/A</div>
                      )}
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-2 py-2 font-semibold">Birthday</div>
                      {user?.birthday !== undefined ? (
                        <div class="px-2 py-2">
                          {formatInTimeZone(
                            new Date(user.birthday),
                            "UTC",
                            "PP"
                          )}
                        </div>
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
                  <h1 className="text-3xl font-bold text-light-primary e m-2">
                    Your QBxR Score
                  </h1>
                  {qbxrData?.qbxr_score !== undefined ? (
                    <SkeletonTheme
                      baseColor="#0C0C0C"
                      highlightColor="#AAAAAA"
                      duration={1.5}
                      borderRadius="0.5rem"
                    >
                      {isLoadingQBxRData ? (
                        <Skeleton width={75} height={75} />
                      ) : (
                        <p className="mx-5 text-5xl text-green-primary">
                          {qbxrData.qbxr_score}
                        </p>
                      )}
                    </SkeletonTheme>
                  ) : (
                    <div>
                      <p className="m-4 text-3xl text-light-primary">No Data</p>
                      {checkData()}
                    </div>
                  )}

                  <p className="text-light-secondary">
                    Your QBxR score is calculated by taking the average of your
                    Web and VR test scores.
                  </p>
                </div>
                <div className="flex md:flex-row flex-col justify-evenly md:space-x-4">
                  <div className="flex flex-col">
                    <ScoreCard
                      title={"Your Web Test Scores"}
                      errMessage={"Take The Web Test"}
                      size="3"
                      isLoading={isLoadingWebScore}
                      data={webData}
                    />
                    {myProfile ? (
                      <Link
                        to="/web"
                        className="py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center"
                      >
                        {webData === undefined || webData?.length === 0
                          ? "Take The Web Test"
                          : "Retake The Web Test"}
                      </Link>
                    ) : null}
                  </div>
                  <div class="my-4 md:my-0"></div>
                  <div className="flex flex-col justify-center">
                    <ScoreCard
                      title={"Your VR Test Scores"}
                      errMessage={"Take The VR Test"}
                      size="3"
                      isLoading={isLoadingVRScore}
                      data={vrData}
                    />
                    {myProfile ? (
                      <Link
                        to="/vr"
                        className="py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center w-full"
                      >
                        {vrData === undefined || vrData?.length === 0
                          ? "Take The VR Test"
                          : "Retake The VR Test"}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditProfileCard
          isVisible={showEditProfile}
          user={user}
          onClose={handleClose}
        />
      </div>
    );
  }
  return content;
};

export default ProfilePage;

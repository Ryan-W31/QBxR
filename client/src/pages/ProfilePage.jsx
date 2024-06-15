import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MobileMenu from "../components/MobileMenu";
import ScrollToTop from "../components/ScrollToTop";
import ScoreCard from "../components/ScoreCard";
import ProfileCard from "../components/ProfileCard";
import EditProfileCard from "../components/EditProfileCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  selectCurrentId,
  selectCurrentScores,
  selectCurrentUser,
} from "../hooks/auth/authSlice";
import {
  updateUserInfoAndRefresh,
  useGetUserByIdQuery,
} from "../hooks/users/userApiSlice";
import {
  useGetVRScoreQuery,
  useGetWebScoreQuery,
  useGetQBxRScoreQuery,
} from "../hooks/scores/scoreApiSlice";
import { classNames, checkData, getInitials, getAge } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { formatInTimeZone } from "date-fns-tz";
import { FiEdit } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";
import FavoritesCard from "../components/FavoritesCard";
import { set } from "date-fns";

// ProfilePage component. This component displays the user's profile page with the user's name, school, status, bio, and test scores.
const ProfilePage = () => {
  const [showBlur, setShowBlur] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [profileScores, setProfileScores] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const myId = useSelector(selectCurrentId);
  const isMyProfile = !id || myId === id;

  const primaryUser = useSelector(selectCurrentUser);
  const primaryUserScores = useSelector(selectCurrentScores);

  const {
    data: user,
    error,
    isLoadingUser,
  } = useGetUserByIdQuery(id, { skip: !id });

  // Get the user's VR and Web test scores
  const { data: vrData, isLoading: isLoadingVRScore } = useGetVRScoreQuery(id, {
    skip: !id,
  });
  const { data: webData, isLoading: isLoadingWebScore } = useGetWebScoreQuery(
    id,
    {
      skip: !id,
    }
  );
  const { data: qbxrData, isLoading: isLoadingQBxRData } = useGetQBxRScoreQuery(
    id,
    {
      skip: !id,
    }
  );

  // Check if the profile is the user's profile
  useEffect(() => {
    if (isMyProfile) {
      setProfileData(primaryUser);
      setProfileScores(primaryUserScores);
    } else {
      setProfileData(user);
      setProfileScores({ qbxr: qbxrData, web: webData, vr: vrData });
    }

    if (
      !isLoadingUser &&
      !isLoadingQBxRData &&
      !isLoadingVRScore &&
      !isLoadingWebScore
    ) {
      setIsLoading(false);
    }
  }, [
    isMyProfile,
    primaryUser,
    primaryUserScores,
    user,
    qbxrData,
    webData,
    vrData,
    profileData,
    isLoadingUser,
    isLoadingQBxRData,
    isLoadingVRScore,
    isLoadingWebScore,
  ]);

  // If not logged in user's profile, get the user data by id

  // Check if the user is in the logged in user's favorites
  useEffect(() => {
    if (primaryUser?.favorites?.includes(id)) {
      setIsFavorite(true);
    }
  }, [primaryUser, id]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    toggleBlur();
  };

  // Toggle the blur effect
  const toggleBlur = () => setShowBlur((prevState) => !prevState);

  // Toggle the edit profile card
  const handleEditProfile = () => {
    setShowEditProfile((prevState) => !prevState);
    toggleBlur();
  };

  // Close the edit profile card
  const handleClose = () => {
    setShowEditProfile(false);
    setShowProfile(null);
    toggleBlur();
  };

  // Handle the status change event
  const handleStatusChange = async (e) => {
    e.preventDefault();
    const status = e.target.value.toLowerCase() === "true";

    await dispatch(
      updateUserInfoAndRefresh({ id: myId, status: status })
    ).unwrap();
  };

  // Handle the favorite event
  const handleFavorite = async (e) => {
    e.preventDefault();
    setIsFavorite((prevState) => !prevState);
    await dispatch(
      updateUserInfoAndRefresh({ id: myId, favorite: id })
    ).unwrap();
  };

  let content = null;

  // Display the user's profile page
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
          <div className="fade-in mx-auto flex flex-col md:flex-row my-5 p-5">
            <Card className="md:w-1/3 w-full flex-col bg-dark-secondary/80 p-3 border-t-4 border-green-primary rounded-lg text-center font-Audiowide relative">
              {!isMyProfile && (
                <IconButton
                  variant="text"
                  ripple={false}
                  className="absolute top-3 right-3 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center"
                  onClick={handleFavorite}
                >
                  {isFavorite ? (
                    <FaStar className="text-2xl text-[#DBAC34]/80" />
                  ) : (
                    <FaRegStar className="text-2xl text-light-primary" />
                  )}
                </IconButton>
              )}
              <div className="image overflow-hidden p-3">
                <div className="h-60 w-60 text-light-primary bg-green-primary border border-light-primary rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                  {getInitials(
                    `${profileData?.firstname} ${profileData?.lastname}`
                  )}
                </div>
              </div>
              <CardHeader className="mt-2 bg-transparent shadow-none">
                <h1 className="text-light-primary font-bold text-xl leading-8 my-1">
                  {profileData?.firstname + " " + profileData?.lastname}
                </h1>
              </CardHeader>
              <CardBody className="p-2">
                <h3 className="text-light-secondary font-lg text-semibold leading-6">
                  {profileData?.school_organization}
                </h3>
                <div>
                  {profileData?.bio !== undefined && (
                    <p className="text-sm text-light-secondary leading-6">
                      {profileData?.bio}
                    </p>
                  )}
                </div>
                <ul className="bg-dark-secondary text-light-secondary py-2 px-3 mt-3 divide-y rounded border-2 border-green-primary">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {isMyProfile ? (
                        <select
                          className={classNames(
                            profileData?.status
                              ? "bg-green-primary"
                              : "bg-red-600",
                            "text-light-primary py-1 px-2 rounded text-sm"
                          )}
                          onChange={handleStatusChange}
                        >
                          {profileData.status ? (
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
                            profileData?.status
                              ? "bg-green-primary"
                              : "bg-red-600",
                            "text-light-primary py-1 px-2 rounded text-sm"
                          )}
                        >
                          {profileData?.status ? "Active" : "Inactive"}
                        </div>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Age</span>
                    {profileData?.birthday !== undefined ? (
                      <span className="ml-auto">
                        {getAge(profileData?.birthday)} years old
                      </span>
                    ) : (
                      <span className="ml-auto">N/A</span>
                    )}
                  </li>
                </ul>
              </CardBody>
            </Card>
            <div className="w-full md:w-9/12 my-4 md:my-0 md:mx-2 font-Audiowide">
              <Card className="bg-dark-secondary/80 p-4 rounded-lg border-t-4 border-green-primary">
                {isMyProfile && (
                  <IconButton
                    variant="text"
                    ripple={false}
                    className="absolute top-0 right-0 text-xl text-light-primary hover:text-green-primary"
                    onClick={handleEditProfile}
                  >
                    <FiEdit />
                  </IconButton>
                )}
                <CardHeader className="bg-tranparent shadow-none text-3xl font-bold text-light-primary mt-0 text-center relative overflow-visible">
                  About
                </CardHeader>
                <CardBody className="text-light-secondary">
                  <div className="grid md:grid-cols-2 text-lg">
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 font-semibold">Name</div>
                      <div className="px-2 py-2">
                        {profileData?.firstname + " " + profileData?.lastname}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 font-semibold">Email</div>
                      <a
                        className="px-2 py-2 text-light-primary hover:text-green-primary whitespace-nowrap overflow-hidden text-ellipsis block"
                        href={"mailto:" + profileData?.email}
                      >
                        {profileData?.email}
                      </a>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 font-semibold">Phone No.</div>
                      {profileData?.phone_number !== undefined ? (
                        <div className="px-2 py-2">
                          {formatPhoneNumberIntl(profileData?.phone_number)}
                        </div>
                      ) : (
                        <div className="px-2 py-2">N/A</div>
                      )}
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 font-semibold">Birthday</div>
                      {profileData?.birthday !== undefined ? (
                        <div className="px-2 py-2">
                          {formatInTimeZone(
                            new Date(profileData?.birthday),
                            "UTC",
                            "PP"
                          )}
                        </div>
                      ) : (
                        <div className="px-2 py-2">N/A</div>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="my-4"></div>

              <Card className="bg-dark-secondary/80 p-4 rounded-lg border-t-4 border-green-primary">
                {profileData?.role === "player" && (
                  <>
                    <div className="text-center mb-6">
                      <CardHeader className="bg-tranparent shadow-none text-3xl font-bold text-light-primary m-2">
                        Your QBxR Score
                      </CardHeader>
                      <CardBody className="p-2">
                        {!isLoadingQBxRData ? (
                          <>
                            {profileScores?.qbxr?.qbxr_score ? (
                              <p className="mx-5 text-5xl text-green-primary">
                                {profileScores?.qbxr?.qbxr_score}
                              </p>
                            ) : (
                              <div>
                                <p className="m-4 text-3xl text-light-primary">
                                  No Data
                                </p>
                                {checkData(
                                  profileScores?.web,
                                  profileScores?.vr
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <SkeletonTheme
                            baseColor="#0C0C0C"
                            highlightColor="#AAAAAA"
                            duration={1.5}
                            borderRadius="0.5rem"
                          >
                            <Skeleton width={75} height={75} />
                          </SkeletonTheme>
                        )}

                        <p className="text-light-secondary">
                          Your QBxR score is calculated by taking the average of
                          your Web and VR test scores.
                        </p>
                      </CardBody>
                    </div>
                    <CardBody className="flex md:flex-row flex-col justify-evenly md:space-x-4 p-2">
                      <div className="flex flex-col">
                        <ScoreCard
                          title={"Your Web Test Scores"}
                          errMessage={"Take The Web Test"}
                          size="3"
                          isLoading={false}
                          data={profileScores?.web}
                        />
                        {isMyProfile && (
                          <Link to="/web">
                            <Button className="w-full py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center !font-Audiowide">
                              {profileScores?.web === undefined ||
                              profileScores?.web?.length === 0
                                ? "Take The Web Test"
                                : "Retake The Web Test"}
                            </Button>
                          </Link>
                        )}
                      </div>
                      <div className="my-4 md:my-0"></div>
                      <div className="flex flex-col justify-center">
                        <ScoreCard
                          title={"Your VR Test Scores"}
                          errMessage={"Take The VR Test"}
                          size="3"
                          isLoading={false}
                          data={profileScores?.vr}
                        />
                        {isMyProfile && (
                          <Link to="/vr">
                            <Button className="w-full py-2 bg-green-primary hover:bg-green-secondary text-light-primary rounded-full font-semibold text-lg mt-4 text-center !font-Audiowide">
                              {profileScores?.vr === undefined ||
                              profileScores?.vr?.length === 0
                                ? "Take The VR Test"
                                : "Retake The VR Test"}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardBody>
                  </>
                )}
                {profileData?.role === "nonplayer" && (
                  <FavoritesCard
                    userId={profileData?.id || profileData?._id}
                    toggleBlur={toggleBlur}
                    setShowProfile={setShowProfile}
                  />
                )}
              </Card>
            </div>
          </div>
        </div>
        <ProfileCard
          myId={myId}
          id={showProfile?.id}
          name={showProfile?.name}
          school={showProfile?.school}
          score={showProfile?.score}
          isVisible={showProfile !== null}
          onClose={handleClose}
        />
        <EditProfileCard
          isVisible={showEditProfile}
          id={myId}
          user={profileData}
          onClose={handleClose}
        />
      </div>
    );
  }
  return content;
};

export default ProfilePage;

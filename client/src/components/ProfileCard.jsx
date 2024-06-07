import React, { useState, useEffect } from "react";
import ScoreCard from "./ScoreCard";
import { classNames, getInitials, scoreColor } from "../utils/utils";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { updateUserInfoAndRefresh } from "../hooks/users/userApiSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../hooks/auth/authSlice";
import {
  useGetWebScoreQuery,
  useGetVRScoreQuery,
} from "../hooks/scores/scoreApiSlice";

// ProfileCard component. This component displays a profile card with the user's name, school, score, and test scores.
const ProfileCard = ({ myId, id, name, school, score, isVisible, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const dispatch = useDispatch();

  // Get the web and VR test scores for the user
  const { data: webData, isLoading: isLoadingWebData } = useGetWebScoreQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      skip: !id,
    }
  );
  const { data: vrData, isLoading: isLoadingVRData } = useGetVRScoreQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: !id,
  });

  // Get the current user from the redux store (cache)
  const user = useSelector(selectCurrentUser);

  // When the component mounts, check if the user is a favorite and if the profile is the user's profile
  useEffect(() => {
    if (user?.favorites !== undefined) {
      if (user.favorites.includes(id)) {
        setIsFavorite(true);
      }
    }

    if (myId === id) {
      setMyProfile(true);
    }
  }, [user, id, myId]);

  // If the profile is not visible, return null
  if (!isVisible) return null;

  // Handle the favorite event. If the user is a favorite, remove the user from the favorites list. Otherwise, add the user to the favorites list.
  const handleFavorite = async (e) => {
    e.preventDefault();
    setIsFavorite((prevState) => !prevState);
    await dispatch(
      updateUserInfoAndRefresh({ id: myId, favorite: id })
    ).unwrap();
  };

  // Return the profile card content
  const content = (
    <div
      id="profile-popup"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center m-10"
    >
      {/* Display the profile card */}
      <div className="relative p-4 w-3/4 max-h-full bg-dark-secondary rounded-lg overflow-auto">
        {/* Display the close button */}
        <button
          type="button"
          className="absolute top-3 right-2.5 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center"
          onClick={onClose}
        >
          <AiOutlineClose className="cursor-pointer text-3xl text-green-primary hover:text-green-secondary" />
          <span className="sr-only">Close modal</span>
        </button>
        {/* End Display the close button */}

        {/* Display the favorite button */}
        {!myProfile ? (
          <div class="absolute top-12 right-3">
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
        {/* End Display the favorite button */}

        {/* Display the profile details */}
        <div className="p-4 md:p-5 text-center font-Audiowide">
          <h3 className="mb-5 text-3xl font-normal text-light-primary">
            Profile Details
          </h3>
          <div class="w-full flex-col bg-dark-secondary/80 p-3 rounded-lg text-center font-Audiowide">
            {/* Profile Image */}
            <div class="image overflow-hidden">
              <div className="h-60 w-60 text-light-primary bg-green-primary border border-light-primary rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                {getInitials(name)}
              </div>
            </div>
            {/* End Profile Image */}

            {/* Profile Name */}
            <h1 class="text-light-primary font-bold text-xl mt-2">{name}</h1>
            {/* End Profile Name */}

            {/* Profile School */}
            <h3 class="text-light-secondary font-lg text-semibold mb-4">
              {school}
            </h3>
            {/* End Profile School */}

            <hr class="border-light-primary border-1 w-1/2 mx-auto" />
            {/* Profile Score */}
            {webData === undefined ||
            vrData === undefined ||
            webData.length === 0 ||
            vrData.length === 0 ? (
              <p class="text-3xl text-light-primary m-4">QBxR Score: No Data</p>
            ) : (
              <p class="text-3xl text-light-primary m-4">
                QBxR Score:{" "}
                <span className={classNames(scoreColor(score))}>{score}</span>
              </p>
            )}

            {/* End Profile Score */}

            {/* Profile Test Scores */}
            <div className="flex flex-col justify-around font-Audiowide">
              {/* Web Test Scores */}
              <ScoreCard
                title={"Web Test Scores"}
                errMessage={"No Web Data"}
                size=""
                isLoading={isLoadingWebData}
                data={webData}
              />
              {/* End Web Test Scores */}

              <div class="my-4"></div>

              {/* VR Test Scores */}
              <ScoreCard
                title={"VR Test Scores"}
                errMessage={"No VR Data"}
                size=""
                isLoading={isLoadingVRData}
                data={vrData}
              />
              {/* End VR Test Scores */}
            </div>
            {/* End Profile Test Scores */}

            {/* Go To Profile Button */}
            <Link
              reloadDocument
              className="mt-4 text-white bg-green-primary hover:bg-green-secondary font-medium font-Audiowide rounded-full text-md inline-flex items-center px-6 py-2 text-center"
              to={`/profile/${id}`}
            >
              Go To Profile
            </Link>
            {/* End Go To Profile Button */}
          </div>
        </div>
      </div>
      {/* End Display the profile card */}
    </div>
  );
  return content;
};

export default ProfileCard;

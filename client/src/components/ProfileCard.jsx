import React, { useState } from "react";
import ScoreCard from "./ScoreCard";
import {
  useGetWebScoreQuery,
  useGetVRScoreQuery,
} from "../hooks/users/scoreApiSlice";
import { classNames } from "../utils/utils";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ id, name, school, score, isVisible, onClose }) => {
  const { data: webData, isLoading: isLoadingWebData } =
    useGetWebScoreQuery(id);
  const { data: vrData, isLoading: isLoadingVRData } = useGetVRScoreQuery(id);

  const navigate = useNavigate();

  if (!isVisible) return null;

  function getInitials(name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }

  function scoreColor(scoreColor) {
    if (scoreColor < 50) {
      return "text-red-500";
    } else if (scoreColor < 70) {
      return "text-yellow-600";
    } else {
      return "text-green-primary";
    }
  }

  const handleGoToProfile = () => {
    navigate(`/profile/${id}`);
  };

  const content = (
    <div
      id="profile-popup"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center m-10"
    >
      <div className="relative p-4 w-3/4 max-h-full bg-dark-secondary rounded-lg overflow-auto">
        <button
          type="button"
          className="absolute top-3 right-2.5 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center justify-center"
          onClick={onClose}
        >
          <AiOutlineClose className="cursor-pointer text-3xl text-green-primary hover:text-green-secondary" />
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center font-Audiowide">
          <h3 className="mb-5 text-3xl font-normal text-light-primary">
            Profile Details
          </h3>
          <div class="w-full flex-col bg-dark-secondary/80 p-3 rounded-lg text-center font-Audiowide">
            <div class="image overflow-hidden">
              <div className="h-60 w-60 text-light-primary bg-green-primary border border-light-primary rounded-full inline-flex items-center justify-center text-md md:text-4xl">
                {getInitials(name)}
              </div>
            </div>
            <h1 class="text-light-primary font-bold text-xl mt-2">{name}</h1>
            <h3 class="text-light-secondary font-lg text-semibold mb-4">
              {school}
            </h3>
            <hr class="border-light-primary border-1 w-1/2 mx-auto" />
            <p class="text-3xl text-light-primary m-4">
              QBxR Score:{" "}
              <span className={classNames(scoreColor(score))}>{score}</span>
            </p>

            <div className="flex flex-col justify-around font-Audiowide">
              <ScoreCard
                title={"Web Test Scores"}
                errMessage={"No Web Data"}
                size=""
                isLoading={isLoadingWebData}
                data={webData}
              />
              <div class="my-4"></div>

              <ScoreCard
                title={"VR Test Scores"}
                errMessage={"No VR Data"}
                size=""
                isLoading={isLoadingVRData}
                data={vrData}
              />
            </div>
            <button
              type="button"
              className="mt-4 text-white bg-green-primary hover:bg-green-secondary font-medium font-Audiowide rounded-full text-md inline-flex items-center px-6 py-2 text-center"
              onClick={handleGoToProfile}
            >
              Go To Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default ProfileCard;

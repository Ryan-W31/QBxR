import React from "react";
import { classNames, colorPodium } from "../utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// LeaderboardCard component. This component displays a leaderboard card with the user's rank, name, school, and score.
const LeaderboardCard = ({
  rank = 0,
  name = "",
  school = "",
  score = 0,
  skeleton = false,
  onClick,
}) => {
  // If the skeleton prop is true, display a skeleton card. Otherwise, display the leaderboard card.
  let content = skeleton ? (
    <tr className="border-b">
      {/* Display a skeleton card with a rank, name, school, and score */}
      <th scope="row" className="py-3">
        <Skeleton width={50} />
      </th>
      <td className="py-3">
        <Skeleton width={100} />
      </td>
      <td className="py-3">
        <Skeleton width={300} />
      </td>
      <td className="py-3">
        <Skeleton width={50} />
      </td>
      {/* End Display a skeleton card with a rank, name, school, and score */}
    </tr>
  ) : (
    <tr
      className={classNames(
        colorPodium(rank),
        "border-b hover:bg-dark-primary cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Display the user's rank, name, school, and score */}
      <th
        scope="row"
        className="py-3 font-medium text-light-primary whitespace-nowrap"
      >
        {rank}
      </th>
      <td className="py-3 font-medium text-light-primary whitespace-nowrap">
        {name}
      </td>
      <td className="py-3 font-medium text-light-primary whitespace-nowrap">
        {school}
      </td>
      <td className="py-3 font-medium text-light-primary whitespace-nowrap">
        {score}
      </td>
      {/* End Display the user's rank, name, school, and score */}
    </tr>
  );

  return content;
};

export default LeaderboardCard;

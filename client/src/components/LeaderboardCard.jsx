import React from "react";
import { classNames } from "../utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LeaderboardCard = ({
  rank = 0,
  name = "",
  school = "",
  score = 0,
  skeleton = false,
  onClick,
}) => {
  function colorPodium(rank) {
    if (rank === 1) {
      return "bg-[#DBAC34]/80";
    } else if (rank === 2) {
      return "bg-[#A5A9B4]/80";
    } else if (rank === 3) {
      return "bg-[#CD7F32]/80";
    } else {
      return "bg-dark-secondary";
    }
  }
  let content = skeleton ? (
    <tr className="border-b">
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
    </tr>
  ) : (
    <tr
      className={classNames(
        colorPodium(rank),
        "border-b hover:bg-dark-primary cursor-pointer"
      )}
      onClick={onClick}
    >
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
    </tr>
  );

  return content;
};

export default LeaderboardCard;

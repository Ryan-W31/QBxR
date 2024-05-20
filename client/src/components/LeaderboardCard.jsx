import React from "react";
import { classNames } from "../utils/utils";

const LeaderboardCard = ({ rank, name, school, score }) => {
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
  return (
    <tr
      className={classNames(
        colorPodium(rank),
        "border-b hover:bg-dark-primary"
      )}
    >
      <th
        scope="row"
        className="px-6 py-3 font-medium text-light-primary whitespace-nowrap"
      >
        {rank}
      </th>
      <td className="px-6 py-3 font-medium text-light-primary whitespace-nowrap">
        {name}
      </td>
      <td className="px-6 py-3 font-medium text-light-primary whitespace-nowrap">
        {school}
      </td>
      <td className="px-6 py-3 font-medium text-light-primary whitespace-nowrap">
        {score}
      </td>
    </tr>
  );
};

export default LeaderboardCard;

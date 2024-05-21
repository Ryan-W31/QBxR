import React from "react";

const SearchCard = ({ name, school, score, onClick }) => {
  return (
    <tr
      className="bg-dark-secondary border-b hover:bg-dark-primary cursor-pointer"
      onClick={onClick}
    >
      <th
        scope="row"
        className="py-3 text-xs md:text-sm font-medium text-light-primary whitespace-nowrap"
      >
        {name}
      </th>
      <td className="py-3 text-xs md:text-sm font-medium text-light-primary whitespace-nowrap">
        {school}
      </td>
      <td className="py-3 text-xs md:text-sm font-medium text-light-primary whitespace-nowrap">
        {score}
      </td>
    </tr>
  );
};

export default SearchCard;

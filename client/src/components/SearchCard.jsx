import React from "react";

const SearchCard = ({ name, school, score }) => {
  return (
    <tr className="bg-dark-secondary border-b hover:bg-dark-primary">
      <th
        scope="row"
        className="px-6 py-3 font-medium text-light-primary whitespace-nowrap"
      >
        {name}
      </th>
      <td className="px-6 py-3 font-medium text-light-primary whitespace-nowrap">
        {school}
      </td>
      <td className="px-6 py-3 font-medium text-light-primary whitespace-nowrap">
        {score}
      </td>
    </tr>
  );
};

export default SearchCard;

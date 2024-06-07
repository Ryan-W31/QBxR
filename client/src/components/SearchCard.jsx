import React from "react";
import Skeleton from "react-loading-skeleton";

// SearchCard component. This component displays a search card with a name, school, and score.
const SearchCard = ({
  role = "",
  name = "",
  school = "",
  score = 0,
  skeleton = false,
  onClick,
}) => {
  let content = skeleton ? (
    <tr>
      {/* Display a skeleton card with a role, name, school, and score */}
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
      {/* End Display a skeleton card with a role, name, school, and score */}
    </tr>
  ) : (
    <tr className="hover:bg-dark-primary cursor-pointer" onClick={onClick}>
      {/* Display the user's role, name, school, and score */}
      <th
        scope="row"
        className="py-3 font-medium text-light-primary whitespace-nowrap capitalize"
      >
        {role}
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
      {/* End Display the user's role, name, school, and score */}
    </tr>
  );

  return content;
};

export default SearchCard;

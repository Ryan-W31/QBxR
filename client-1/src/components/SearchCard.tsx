import { Skeleton } from "./ui/skeleton";

type SearchCardProps = {
  role?: string;
  name?: string;
  school?: string;
  score?: number;
  skeleton?: boolean;
  onClick?: () => void;
};
// SearchCard component. This component displays a search card with a name, school, and score.
const SearchCard = ({ role = "", name = "", school = "", score = 0, skeleton = false, onClick }: SearchCardProps) => {
  let content = skeleton ? (
    <tr>
      {/* Display a skeleton card with a role, name, school, and score */}
      <th scope="row" className="py-3">
        <Skeleton className="w-[50px]" />
      </th>
      <td className="py-3">
        <Skeleton className="w-[100px]" />
      </td>
      <td className="py-3">
        <Skeleton className="w-[300px]" />
      </td>
      <td className="py-3">
        <Skeleton className="w-[50px]" />
      </td>
      {/* End Display a skeleton card with a role, name, school, and score */}
    </tr>
  ) : (
    <tr className="hover:bg-gackground cursor-pointer" onClick={onClick}>
      {/* Display the user's role, name, school, and score */}
      <th scope="row" className="py-3 font-medium text-primary whitespace-nowrap capitalize">
        {role}
      </th>
      <td className="py-3 font-medium text-primary whitespace-nowrap">{name}</td>
      <td className="py-3 font-medium text-primary whitespace-nowrap">{school}</td>
      <td className="py-3 font-medium text-primary whitespace-nowrap">{score}</td>
      {/* End Display the user's role, name, school, and score */}
    </tr>
  );

  return content;
};

export default SearchCard;

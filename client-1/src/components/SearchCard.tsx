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
    <tr className="border-b">
      {/* Display a skeleton card with a rank, name, school, and score */}
      <th scope="row" className="py-3">
        <div className="flex justify-center">
          <Skeleton className="h-[10px] w-[50px]" />
        </div>
      </th>
      <td className="py-3">
        <div className="flex justify-center">
          <Skeleton className="h-[10px] w-[100px]" />
        </div>
      </td>
      <td className="py-3">
        <div className="flex justify-center">
          <Skeleton className="h-[10px] w-[300px]" />
        </div>
      </td>
      <td className="py-3">
        <div className="flex justify-center">
          <Skeleton className="h-[10px] w-[50px]" />
        </div>
      </td>
      {/* End Display a skeleton card with a rank, name, school, and score */}
    </tr>
  ) : (
    <tr className="hover:bg-background cursor-pointer" onClick={onClick}>
      {/* Display the user's role, name, school, and score */}
      <th scope="row" className="whitespace-nowrap py-3 font-medium uppercase text-foreground">
        {role}
      </th>
      <td className="whitespace-nowrap py-3 font-medium text-foreground uppercase">{name}</td>
      <td className="whitespace-nowrap py-3 font-medium text-foreground uppercase">{school}</td>
      <td className="whitespace-nowrap py-3 font-medium text-foreground uppercase">{score}</td>
      {/* End Display the user's role, name, school, and score */}
    </tr>
  );

  return content;
};

export default SearchCard;

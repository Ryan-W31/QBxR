import { cn, colorPodium } from "../lib//utils";
import { Skeleton } from "./ui/skeleton";

type LeaderboardCardProps = {
  rank?: number;
  name?: string;
  school?: string;
  score?: number;
  skeleton?: boolean;
  onClick?: () => void;
};
// LeaderboardCard component. This component displays a leaderboard card with the user's rank, name, school, and score.
const LeaderboardCard = ({
  rank = 0,
  name = "",
  school = "",
  score = 0,
  skeleton = false,
  onClick,
}: LeaderboardCardProps) => {
  // If the skeleton prop is true, display a skeleton card. Otherwise, display the leaderboard card.
  let content = skeleton ? (
    <tr className="border-b">
      {/* Display a skeleton card with a rank, name, school, and score */}
      <th scope="row" className="py-3">
        <div className="flex justify-center">
          <Skeleton className="w-[50px] h-[10px]" />
        </div>
      </th>
      <td className="py-3">
        <div className="flex justify-center">
          <Skeleton className="w-[100px] h-[10px]" />
        </div>
      </td>
      <td className="py-3">
        <div className="flex justify-center">
          <Skeleton className="w-[300px] h-[10px]" />
        </div>
      </td>
      <td className="py-3">
        <div className="flex justify-center">
          <Skeleton className="w-[50px] h-[10px]" />
        </div>
      </td>
      {/* End Display a skeleton card with a rank, name, school, and score */}
    </tr>
  ) : (
    <tr className={cn(colorPodium(rank), "border-b hover:bg-background cursor-pointer")} onClick={onClick}>
      {/* Display the user's rank, name, school, and score */}
      <th scope="row" className="py-3 font-medium text-foreground whitespace-nowrap">
        {rank}
      </th>
      <td className="py-3 font-medium text-foreground whitespace-nowrap">{name}</td>
      <td className="py-3 font-medium text-foreground whitespace-nowrap">{school}</td>
      <td className="py-3 font-medium text-foreground whitespace-nowrap">{score}</td>
      {/* End Display the user's rank, name, school, and score */}
    </tr>
  );

  return content;
};

export default LeaderboardCard;

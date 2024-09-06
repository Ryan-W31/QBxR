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
    <tr className={cn(colorPodium(rank), "cursor-pointer border-b hover:bg-background")} onClick={onClick}>
      {/* Display the user's rank, name, school, and score */}
      <th scope="row" className="whitespace-nowrap py-3 font-medium text-foreground">
        {rank}
      </th>
      <td className="whitespace-nowrap py-3 font-medium text-foreground">{name}</td>
      <td className="whitespace-nowrap py-3 font-medium text-foreground">{school}</td>
      <td className="whitespace-nowrap py-3 font-medium text-foreground">{score}</td>
      {/* End Display the user's rank, name, school, and score */}
    </tr>
  );

  return content;
};

export default LeaderboardCard;

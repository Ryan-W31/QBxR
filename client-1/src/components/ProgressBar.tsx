import { scoreColor, barColor } from "../lib/utils";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";

// ProgressBar component. This component displays a progress bar with a title and score.
const ProgressBar = ({ title = "", score = 0, skeleton = false }) => {
  // If the skeleton prop is true, display a skeleton loading animation. Otherwise, display the progress bar with the title and score.
  let content = skeleton ? (
    <div className="mb-10">
      {/* Display the skeleton loading animation */}
      <div className="flex justify-between mb-1">
        <span className={`text-base font-medium text-light-primary`}>{title}</span>
        <Skeleton className="w-[50px]" />
      </div>
      <div>
        <Skeleton className="w-[375px]" />
      </div>
      {/* End Display the skeleton loading animation */}
    </div>
  ) : (
    <div className="w-full mb-8">
      {/* Display the progress bar with the title and score */}

      <div className="mb-1 flex items-center justify-between gap-4">
        {/* Title */}
        <span className={`text-base font-medium ${scoreColor(score)}`}>{title}</span>
        {/* End Title */}

        {/* Score */}
        <span className={`text-sm font-medium ${scoreColor(score)}`}>{score}</span>
        {/* End Score */}
      </div>

      {/* Progress Bar */}
      <Progress value={score} barColor={barColor(score)} />
      {/* End Progress Bar */}
    </div>
  );

  return content;
};

export default ProgressBar;

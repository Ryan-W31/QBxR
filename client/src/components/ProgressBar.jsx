import React from "react";
import Skeleton from "react-loading-skeleton";
import { scoreColor, barColor } from "../utils/utils";
import { Progress } from "@material-tailwind/react";

// ProgressBar component. This component displays a progress bar with a title and score.
const ProgressBar = ({ title = "", score = 0, skeleton = false }) => {
  // If the skeleton prop is true, display a skeleton loading animation. Otherwise, display the progress bar with the title and score.
  let content = skeleton ? (
    <div className="mb-10">
      {/* Display the skeleton loading animation */}
      <div className="flex justify-between mb-1">
        <span className={`text-base font-medium text-light-primary`}>
          {title}
        </span>
        <Skeleton width={50} />
      </div>
      <div>
        <Skeleton width={375} />
      </div>
      {/* End Display the skeleton loading animation */}
    </div>
  ) : (
    <div className="w-full mb-8">
      {/* Display the progress bar with the title and score */}

      <div className="mb-1 flex items-center justify-between gap-4">
        {/* Title */}
        <span className={`text-base font-medium ${scoreColor(score)}`}>
          {title}
        </span>
        {/* End Title */}

        {/* Score */}
        <span className={`text-sm font-medium ${scoreColor(score)}`}>
          {score}
        </span>
        {/* End Score */}
      </div>

      {/* Progress Bar */}
      <Progress
        value={score}
        size="lg"
        className="w-full rounded-full bg-dark-primary"
        barProps={{ className: `${barColor(score)} rounded-full` }}
      />
      {/* End Progress Bar */}
    </div>
  );

  return content;
};

export default ProgressBar;

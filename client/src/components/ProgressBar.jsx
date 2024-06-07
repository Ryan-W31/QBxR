import React from "react";
import Skeleton from "react-loading-skeleton";
import { scoreColor, barColor } from "../utils/utils";

// ProgressBar component. This component displays a progress bar with a title and score.
const ProgressBar = ({ title = "", score = 0, skeleton = false }) => {
  // If the skeleton prop is true, display a skeleton loading animation. Otherwise, display the progress bar with the title and score.
  let content = skeleton ? (
    <div className="mb-10">
      {/* Display the skeleton loading animation */}
      <div class="flex justify-between mb-1">
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
    <div className="mb-10">
      {/* Display the progress bar with the title and score */}

      <div class="flex justify-between mb-1">
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
      <div className="w-full rounded-full h-2.5 bg-dark-primary">
        <div
          className={`${barColor(score)} h-2.5 rounded-full`}
          style={{ marginRight: `${100 - score}%` }}
        ></div>
      </div>
      {/* End Progress Bar */}
    </div>
  );

  return content;
};

export default ProgressBar;

import React from "react";
import Skeleton from "react-loading-skeleton";

const ProgressBar = ({ title = "", score = 0, skeleton = false }) => {
  function textColor(scoreColor) {
    if (scoreColor < 50) {
      return "text-red-500";
    } else if (scoreColor < 70) {
      return "text-yellow-600";
    } else {
      return "text-green-primary";
    }
  }

  function barColor(scoreColor) {
    if (scoreColor < 50) {
      return "bg-red-500";
    } else if (scoreColor < 70) {
      return "bg-yellow-600";
    } else {
      return "bg-green-primary";
    }
  }

  let content = skeleton ? (
    <div className="mb-10">
      <div class="flex justify-between mb-1">
        <span className={`text-base font-medium text-light-primary`}>
          {title}
        </span>
        <Skeleton width={50} />
      </div>
      <div>
        <Skeleton width={375} />
      </div>
    </div>
  ) : (
    <div className="mb-10">
      <div class="flex justify-between mb-1">
        <span className={`text-base font-medium ${textColor(score)}`}>
          {title}
        </span>
        <span className={`text-sm font-medium ${textColor(score)}`}>
          {score}
        </span>
      </div>
      <div className="w-full rounded-full h-2.5 bg-dark-primary">
        <div
          className={`${barColor(score)} h-2.5 rounded-full`}
          style={{ marginRight: `${100 - score}%` }}
        ></div>
      </div>
    </div>
  );

  return content;
};

export default ProgressBar;

import React from "react";
import Skeleton from "react-loading-skeleton";
import { scoreColor, barColor } from "../utils/utils";

const ProgressBar = ({ title = "", score = 0, skeleton = false }) => {
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
        <span className={`text-base font-medium ${scoreColor(score)}`}>
          {title}
        </span>
        <span className={`text-sm font-medium ${scoreColor(score)}`}>
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

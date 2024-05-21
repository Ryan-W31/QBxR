import React from "react";
import ProgressBar from "./ProgressBar";
import { classNames } from "../utils/utils";

const ScoreCard = ({ title, errMessage, size, data }) => {
  const content = (
    <div className="flex flex-col text-light-secondary bg-dark-secondary rounded-lg p-4 border-2 border-green-primary">
      <p
        className={classNames(
          `text-${size}xl`,
          "mb-5 align-center text-center"
        )}
      >
        {title}
      </p>
      {data === null ? (
        <div className="text-center text-light-primary">
          <p className="text-3xl sm:text-2xl justify-center mb-4">No Data</p>
          <p className="text-xl sm:text-sm">{errMessage}</p>
        </div>
      ) : (
        <div>
          <ul>
            {data.map((item, index) => (
              <ProgressBar key={index} title={item.title} score={item.score} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  return content;
};

export default ScoreCard;

import React from "react";
import ProgressBar from "./ProgressBar";
import { classNames } from "../utils/utils";
import { SkeletonTheme } from "react-loading-skeleton";

// ScoreCard component. This component displays a score card with a title, error message, size, loading state, and data.
const ScoreCard = ({ title, errMessage, size, isLoading = false, data }) => {
  // If the data is undefined or empty, display a message indicating that there is no data
  const content = (
    <div className="flex flex-col text-light-secondary bg-dark-secondary rounded-lg p-4 border-2 border-green-primary">
      {/* Display the title */}
      <p
        className={classNames(
          `text-${size}xl`,
          "mb-5 align-center text-center"
        )}
      >
        {title}
      </p>
      {/* End Display the title */}

      {/* Display the score card */}
      {data === undefined || data?.length === 0 ? (
        <div className="text-center text-light-primary">
          <p className="text-3xl sm:text-2xl justify-center mb-4">No Data</p>
          <p className="text-xl sm:text-sm">{errMessage}</p>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <SkeletonTheme
              baseColor="#0C0C0C"
              highlightColor="#AAAAAA"
              borderRadius="0.5rem"
              duration={1.5}
            >
              <ul>
                {[...Array(4)].map((_, index) => (
                  <ProgressBar
                    key={index}
                    title={"Loading..."}
                    score={0}
                    skeleton={true}
                  />
                ))}
              </ul>
            </SkeletonTheme>
          ) : (
            <ul>
              {data.map((item, index) => (
                <ProgressBar
                  key={index}
                  title={item.title}
                  score={item.score}
                />
              ))}
            </ul>
          )}
        </div>
      )}
      {/* End Display the score card */}
    </div>
  );
  return content;
};

export default ScoreCard;

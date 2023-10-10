import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProgressBar from "../ProgressBar";

function ConfidenceSection({ isLoading, confidence }) {
  const confidenceRate = confidence ? confidence.replace('%', '') : 0
  return (
    <div className="mt-3 w-[25rem]">
      <p className="text-gray-500 mt-3 pl-10">
        Confidence
      </p>
      <div className="flex gap-3  pl-10 items-center my-5">
        <div className="w-12">
            <ProgressBar value={confidenceRate} />
        </div>
        <div>
          <p className="font-bold">
            {
              `${confidence} Confidence Level`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
export default ConfidenceSection;

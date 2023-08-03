import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SourceSection({ isLoading, sources }) {
  return (
    <div className="w-[25rem] border-l-2 border-sirp-keynotebg pl-10">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Source"}
      </p>
      <div className="flex gap-3 items-center mt-3">
        <div>
          <ul className="flex flex-wrap gap-2">
            {sources.map((source) => (
              <div key={source.id}>
                {isLoading ? (
                  <Skeleton width={70} />
                ) : (
                  <li className="border p-2 rounded-[0.7rem] text-[0.7rem] bg-sirp-keynotebg">
                    {source.key}
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default SourceSection;

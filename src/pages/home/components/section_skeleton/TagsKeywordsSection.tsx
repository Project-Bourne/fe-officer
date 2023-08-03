import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TagsKeywordsSection({ isLoading, tags }) {
  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Tags & Keywords"}
      </p>
      <div className="flex gap-3 items-center mt-3">
        <div>
          <ul className="flex flex-wrap gap-2">
            {tags.map((keyword) => (
              <div key={keyword.id}>
                {isLoading ? (
                  <Skeleton width={70} />
                ) : (
                  <li className="border p-2 rounded-[0.7rem] text-[0.7rem] bg-sirp-keynotebg">
                    {keyword.key}
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
export default TagsKeywordsSection;

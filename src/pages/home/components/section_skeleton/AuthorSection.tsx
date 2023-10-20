import React from "react";
import Image from "next/image";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AuthorSection({ isLoading, author }) {
  const authorName = author?.length > 0 ? author : ["No author"]
  return (
    <div className="mt-3 w-[25rem]">
      <p className="text-gray-500 mt-3">
        Authors
      </p>
      <div className="flex gap-3 items-center my-5 cursor-pointer">
          <Image
            src={require("../../../../../public/icons/avatarmeta.svg")}
            alt="documents"
            className="cursor-pointer"
            width={45}
          />
        <div>
          <p className="font-bold">
            {authorName.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </p>
          {/* <p className="text-gray-500 text-sm">
            {isLoading ? <Skeleton width={150} /> : 'Transcorp Hilton Abuja'}
          </p> */}
        </div>
      </div>
    </div>
  );
}
export default AuthorSection;

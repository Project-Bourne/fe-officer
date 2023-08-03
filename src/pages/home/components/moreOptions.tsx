import React from "react";
import Image from "next/image";

const moreOptions = () => {
  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <hr className="border-sirp-dashbordb1 border-t-2 border-opacity-100 w-full visible" />
      <div className="border cursor-pointer bg-sirp-dashbordb1 w-[100rem] flex text-md text-gray-500 gap-5 justify-center items-center py-3 rounded-[2rem]">
        <p className="text-md">More information</p>
        <Image
          src={require(`../../../assets/icons/down.svg`)}
          alt="upload image"
          width={20}
          height={20}
          priority
        />
      </div>
      <hr className="border-sirp-dashbordb1 border-t-2 border-opacity-100 w-full visible" />
    </div>
  );
};

export default moreOptions;

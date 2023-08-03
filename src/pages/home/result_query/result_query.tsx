import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import InputSearch from "../components/InputSearch";
import ResultData from "../components/ResultData";

const result_query = () => {
  const router = useRouter();
  return (
    <div className="mt-[8rem] h-full rounded-[1rem] bg-[#F9F9F9] mx-5 ">
      <div className="border-b-2 pb-5 pt-5 pl-10 flex flex-col">
        <Image
          className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
          src={require(`../../../assets/icons/arrow-narrow-left 1.svg`)}
          alt="upload image"
          width={20}
          height={20}
          onClick={() => {
            router.back();
          }}
        />
        <h1 className="text-2xl pt-5 font-bold">Query Results</h1>
      </div>
      <InputSearch />
      <h1 className="text-lg font-bold pl-10 mx-5 my-5">Results</h1>
      <div>
        <ResultData />
      </div>
    </div>
  );
};

export default result_query;

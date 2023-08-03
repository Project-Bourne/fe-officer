import React from "react";
import { useRouter } from "next/router";
import Interpratation from "../components/Interpratation";
import QueryCard from "../components/QueryCard";
import MoreOption from "../components/moreOptions";
import DummyText from "../components/dummyText";
import InputSearch from "../components/InputSearch";

const input_query = () => {
  const router = useRouter();

  return (
    <div className="mt-[8rem] h-full rounded-[1rem] bg-[#F9F9F9] mx-5 ">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl pl-10 pt-5 font-bold">Input Query</h1>
      </div>
      <InputSearch />
      <Interpratation />
      <QueryCard />
      <MoreOption />
      <DummyText />
    </div>
  );
};

export default input_query;

import React from "react";
import { useRouter } from "next/router";
import QueryUpload from "./components/QueryUpload";

function Home() {
  const router = useRouter();
  console.log(router, "i am router");
  return (
    <div className="mt-[8rem] h-[100vh] rounded-[1rem] bg-[#F9F9F9] mx-5">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl pl-10 pt-5 font-bold">Input Query</h1>
      </div>

      <QueryUpload />
    </div>
  );
}

export default Home;

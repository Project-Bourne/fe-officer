import React, { useState } from "react";
import MinAndMaxIcon from "./Min_Max_icon";
import MetaData from "./MetaData";
import DummyText from "./dummyText";
import MoreOptions from "./moreOptions";

function Crawled() {
  const [showMetadata, setShowMetadata] = useState(true);

  const handleMax = () => {
    setShowMetadata(true);
  };

  const handleMin = () => {
    setShowMetadata(false);
  };

  return (
    <>
      <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
        <div className="flex md:justify-between flex-wrap md:px-5">
          {/* action  buton to the right side */}
          <div className="bg-white border mt-5 rounded-[1rem] w-[100%]">
            <MinAndMaxIcon maxOnClick={handleMax} minOnClick={handleMin} />
            {/* query answer will show here  */}
            <div className="mx-5">
              <h1 className="text-lg font-bold mb-5">Answer</h1>
              <p className="text-md text-gray-500 py-2">
                {/* ... Your content here ... */}
                Redesigned Naira: CBN launches Cash Swap Programme for rural
                Development This website is operated by Web3D Media
                Incorporated, a Delaware-based corporation with a registered
                address at 651 N Broad St, New Castle, Delaware United States.
                (“Company”). This website is operated by Web3D Media
                Incorporated, a Delaware-based corporation with a registered
                address at 651 N Broad St, New Castle, Delaware United States.
                (“Company”).
              </p>
            </div>

            {showMetadata && <MetaData />}
          </div>
        </div>
      </div>
      <div className="w-full">
        <MoreOptions />
      </div>
      <DummyText />
    </>
  );
}

export default Crawled;

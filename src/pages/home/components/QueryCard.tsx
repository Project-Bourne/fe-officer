import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { useRouter } from "next/router";

const data = [
  {
    id: "1",
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
  },
  {
    id: "2",
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
  },
  {
    id: "3",
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
  },
  {
    id: "4",
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
  },
];

const QueryCard = () => {
  const router = useRouter();

  const handleUseOption = () => {
    router.push("/home/result_query/result_query");
  };
  return (
    <div className="mx-10">
      <h2 className="text-gray-500 text-md font-bold pb-5">Other Options</h2>

      {/* card sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index}>
            <div className="bg-sirp-lightGrey py-5 px-3 rounded-[1rem]">
              <p>{item.title}</p>
              <div className="flex justify-end">
                <Button
                  classNameStyle="flex border gap-x-1 bg-white items-center mt-5 justify-center rounded-[2rem] text-center"
                  size="sm"
                  onClick={handleUseOption}
                  background="bg-sirp-primary"
                  value={
                    <div className="flex gap-x-1 text-[12px] items-center py-2 px-1 justify-center">
                      <small className="text-sirp-primary text-sm text-center">
                        Use Option
                      </small>
                      <Image
                        src={require("../../../assets/icons/blueArrow.svg")}
                        alt="Blue Arrow Icon"
                        width={14}
                        height={50}
                        className="self-center"
                        style={{ alignSelf: "center" }}
                        priority
                      />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryCard;

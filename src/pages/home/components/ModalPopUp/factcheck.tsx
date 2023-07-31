import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui";


function factcheck(){
  return (
    <div>
        <div className="my-5">
            <h1 className="text-3xl font-bold ml-5 text-black">Running Fact Checker</h1>
            <div className="flex gap-5 mt-5 mx-5 items-center">
              <small className="text-sm text-gray-500  mb-5">Title:</small>
              <p className="text-1xl font-sm">
                Redesigned Naira: CBN launches Cash Swap Programme for rural
                Development
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={require("../../../../assets/icons/factmodal.svg")}
                alt="add user"
                width={90}
                height={90}
                className="self-center my-5"
                style={{ alignSelf: "center" }}
                priority
              />
              <Button
                className="flex gap-x-1 items-center mt-10 rounded-[1rem] mb-5"
                size="lg"
                background="bg-sirp-primary"
                value={
                  <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                    <Image
                      src={require("../../../../assets/icons//factbtn.svg")}
                      alt="add user"
                      width={25}
                      height={25}
                      className="self-center "
                      style={{ alignSelf: "center" }}
                      priority
                    />
                    <label className="text-white">checking fact</label>
                  </div>
                }
              />
            </div>
          </div>
    </div>
  )
}

export default factcheck
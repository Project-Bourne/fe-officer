import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui";


function collaborate(){
  return (
    <div>
        <div>
            <h1 className="text-lg font-sm border-b-2 pb-5 pl-4 text-sirp-primary border-sirp-primary w-[10rem]">
              Invite others
            </h1>
            <hr />
            <input
              type="search"
              name=""
              id=""
              className="border-b-2 w-full py-3 pl-4 outline-none"
              placeholder="Type name or email address"
            />
            <p className="py-2 font-semibold text-gray-500 pl-4 text-[1.5rem]">
              Suggestions
            </p>

            <div className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-4 rounded-[1rem]">
              <div className="ml-5 w-[25rem]">
                <div className="flex gap-3 items-center my-5 cursor-pointer">
                  <Image
                    src={require("../../../../assets/icons/Avatarmeta.svg")}
                    alt="documents"
                    className="cursor-pointer"
                    width={50}
                  />
                  <div>
                    <p className="font-bold text-black">Musba’u Wasiu</p>
                    <p className="text-gray-500 text-sm">
                      Musba’uwaasiu@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src={require("../../../../assets/icons/square-check 1.svg")}
                alt="documents"
                className="cursor-pointer mr-5"
                width={20}
              />
            </div>
            <div className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-4 rounded-[1rem]">
              <div className="ml-5 w-[25rem]">
                <div className="flex gap-3 items-center my-5 cursor-pointer">
                  <Image
                    src={require("../../../../assets/icons/Avatarmeta.svg")}
                    alt="documents"
                    className="cursor-pointer"
                    width={50}
                  />
                  <div>
                    <p className="font-bold">Musba’u Wasiu</p>
                    <p className="text-gray-500 text-sm">
                      Musba’uwaasiu@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src={require("../../../../assets/icons/square-check 1.svg")}
                alt="documents"
                className="cursor-pointer mr-5"
                width={20}
              />
            </div>
            <div className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-4 rounded-[1rem]">
              <div className="ml-5 w-[25rem]">
                <div className="flex gap-3 items-center my-5 cursor-pointer">
                  <Image
                    src={require("../../../../assets/icons/Avatarmeta.svg")}
                    alt="documents"
                    className="cursor-pointer"
                    width={50}
                  />
                  <div>
                    <p className="font-bold">Musba’u Wasiu</p>
                    <p className="text-gray-500 text-sm">
                      Musba’uwaasiu@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src={require("../../../../assets/icons/square-check 1.svg")}
                alt="documents"
                className="cursor-pointer mr-5"
                width={20}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button
                className="flex gap-x-1 items-center mt-10 mb-5 cursor-pointer rounded-[1rem]"
                size="sm"
                background="bg-sirp-primary"
                value={
                  <div className="flex gap-2 text-[1rem] items-center justify-center py-5">
                    <label className="text-white">Continue</label>
                  </div>
                }
              />
            </div>
          </div>
    </div>
  )
}

export default collaborate
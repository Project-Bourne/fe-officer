import Image from "next/image";
import React from "react";
import NavBarItem from "./NavBarItem";
import { NavBarContents } from "../../../utils/constants";
import disclaimerIcon from "../../../../public/icons/disclaimer-icon.svg";
import Link from "next/link";

function NavBar() {
  return (
    <div className="w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white px-3 py-10 md:p-10 fixed z-[20]">
      <Link
        href={
          // "https://192.81.213.226:30"
          `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}`
        }
        className="flex flex-row flex-wrap items-center cursor-pointer mb-20"
      >
        <Image
          src={require("../../../../public/svg/logo.svg")}
          alt="IRP Logo"
          width={50}
          height={50}
          className="md:mr-[20px]"
          priority
        />
        <h1 className="text-sirp-primary font-semibold text-[27px] hidden md:block">
          Deep soul
        </h1>
      </Link>
      {/* items-center justify-center py-4 md:px-5 w-[100%] flex flex-row self-center */}
      {/* <div
        className="flex py-4 px-0 md:px-3 lg:px-5 text-center justify-center border-[1.3px] border-sirp-primaryLess1 rounded-xl 
                 cursor-pointer shadow-sm shadow-sirp-primaryLess1 hover:bg-blue-50"
      >
        <Image
          src={require('../../../assets/svg/refresh.svg')}
          alt="Start/Refresh Crawler"
          width={20}
          height={20}
          className="md:mr-[20px]"
          priority
        />

        <h2 className="text-sirp-primary font-semibold text-[14px] hidden md:block">
          Start Crawler
        </h2>
      </div> */}

      <div className="w-full mt-10">
        {NavBarContents.map((item, index) => (
          <NavBarItem item={item} index={index} key={index} />
        ))}
      </div>

      <div className="absolute bottom-10 text-[10px] px-5 -left-3">
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="justify-center font-semibold flex items-center mb-2">
            <Image
              src={disclaimerIcon}
              alt="disclaimer"
              height={12}
              width={12}
            />
            &nbsp; DISCLAIMER
          </h3>
          <p>
            The information presented is intended for general informational
            purposes only. It is imperative that users independently verify and
            assess the output before making any consequential decisions. <br />
            Kindly be advised that the application's output may not
            comprehensively address individual needs and circumstances.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import React, { useState } from "react";
import Image from "next/image";
// import CustomModal from "@/components/ui/CustomModal";
// import Factcheck from "../ModalPopUp/factcheck";
// import Collaborate from "../ModalPopUp/collaborate";
// import DocumentExport from "../ModalPopUp/DocumentExport";

const ActionIcons = () => {
  const [factcheck, setFactcheck] = useState(false);
  const [collaborate, setCollaborate] = useState(false);
  const [documents, setDocuments] = useState(false);
  return (
    <>
      <div className="flex gap-1 mr-2 px-5">
        <Image
          src={require("../../../../assets/icons/H3.svg")}
          alt="documents"
          className=" cursor-pointer"
          width={50}
          onClick={() => setDocuments(true)}
        />
        <Image
          src={require("../../../../assets/icons/H2.svg")}
          alt="documents"
          className=" cursor-pointer"
          width={50}
        />
        <Image
          src={require("../../../../assets/icons/H1.svg")}
          alt="documents"
          className=" cursor-pointer"
          width={50}
        />
        <Image
          src={require("../../../../assets/icons/action.saved.svg")}
          alt="documents"
          className="cursor-pointer"
          width={50}
        />
        <Image
          src={require("../../../../assets/icons/H4.svg")}
          alt="documents"
          className="cursor-pointer"
          width={50}
          onClick={() => setCollaborate(true)}
        />
        <Image
          src={require("../../../../assets/icons/H6.svg")}
          alt="documents"
          className="cursor-pointer"
          width={50}
          onClick={() => setFactcheck(true)}
        />
      </div>
      {/* factcheck models */}
      {/* {factcheck && (
        <CustomModal
          style="bg-white md:w-[30%] w-[20%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setFactcheck(false)}
        >
          <Factcheck />
        </CustomModal>
      )} */}

      {/* collaborate models */}

      {/* {collaborate && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setCollaborate(false)}
        >
          <Collaborate />
        </CustomModal>
      )} */}
      {/* {documents && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setDocuments(false)}
        >
         <DocumentExport/>
        </CustomModal>
      )} */}
    </>
  );
};

export default ActionIcons;

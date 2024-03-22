import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import analyzer from "../../../../public/icons/action_analyzer.svg";
import collab from "../../../../public/icons/action_collab.svg";
import summarizer from "../../../../public/icons/action_summarizer.svg";
import deepchat from "../../../../public/icons/action_deepchat.svg";
import factchecker from "../../../../public/icons/action_factchecker.svg";
import translator from "../../../../public/icons/action_translator.svg";
import interrogator from "../../../../public/icons/action_interrogator.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "@/services/notification.service";

type ActionIconsProps = {
  docId?: string;
};

const ActionIcons = ({  docId, }: ActionIconsProps) => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [factcheck, setFactcheck] = useState(false);
  const [collaborate, setCollaborate] = useState(false);
  const [documents, setDocuments] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const permissions = userInfo?.role?.permissions;

  const handleRoute = (id: string, to: string) => {
    if (to === "collab") {
      router.replace(`http://192.81.213.226:36/document/${id}&interrogator`);
    }
    if (to === "analyser") {
      router.replace(`http://192.81.213.226:31/home/${id}&interrogator`);
    }
    if (to === "summarizer") {
      router.replace(`http://192.81.213.226:32/home/${id}&interrogator`);
    }
    if (to === "factcheck") {
      router.replace(`http://192.81.213.226:34/home/${id}&interrogator`);
    }
    if (to === "deepchat") {
      router.replace(`http://192.81.213.226:35/home/${id}&interrogator`);
    }
    // if (to === "interrogator") {
    //   router.replace(`http://192.81.213.226:82/home/${id}&interrogator`);
    // }
    if (to === "translator") {
      router.replace(`http://192.81.213.226:33/home/${id}&interrogator`);
    }
  };



  return (
    <>
      <div className="flex gap-2 ">

        {/* collab  */}
        {/* {permissions && permissions?.includes("collab") && ( */}
          <Tooltip title="Export to Collab">
            <Image
              src={collab}
              alt="documents"
              className=" cursor-pointer drop-shadow-md"
              width={33}
              onClick={() => handleRoute(docId, "collab")}
            />
          </Tooltip>
        {/* )} */}

        {/* Translator  */}
        {/* {permissions && permissions?.includes("translator") && ( */}
          <Tooltip title="Export to Translator">
            <Image
              src={translator}
              alt="translator"
              className="cursor-pointer drop-shadow-md"
              onClick={() => handleRoute(docId, "translator")}
              width={33}
            />
          </Tooltip>
        {/* )} */}

        {/* analyzer  */}
        {/* {permissions && permissions?.includes("analyser") && ( */}
          <Tooltip title="Export to Analyzer">
            <Image
              src={analyzer}
              alt="analyzer"
              className=" cursor-pointer drop-shadow-md"
              width={33}
              onClick={() => handleRoute(docId, "analyser")}
            />
          </Tooltip>
        {/* )} */}

        {/* factchecker  */}
        {/* {permissions && permissions?.includes("fact checker") && ( */}
          <Tooltip title="Export to Factchecker">
            <Image
              src={factchecker}
              alt="factcheck"
              className="cursor-pointer drop-shadow-md"
              width={33}
              onClick={() => handleRoute(docId, "factcheck")}
            />
          </Tooltip>
        {/* )} */}

        {/* summarizer  */}
        {/* {permissions && permissions?.includes("summarizer") && ( */}
          <Tooltip title="Export to Summarizer">
            <Image
              src={summarizer}
              alt="summarizer"
              className="cursor-pointer drop-shadow-md"
              width={33}
              onClick={() => handleRoute(docId, "summarizer")}
            />
          </Tooltip>
        {/* )} */}

        {/* deepchat  */}
        {/* {permissions && permissions?.includes("deep chat") && ( */}
          <Tooltip title="Export to Deepchat">
            <Image
              src={deepchat}
              alt="deep chat"
              className="cursor-pointer drop-shadow-md"
              width={33}
              onClick={() => handleRoute(docId, "deepchat")}
            />
          </Tooltip>
        {/* )} */}

        {/* interrogator  */}
        {/* {permissions && permissions?.includes("interrogator") && (
          <Tooltip title="Export to Interrogator">
            <Image
              src={interrogator}
              alt="interrogator"
              className="cursor-pointer"
              width={33}
              onClick={() => handleRoute(docId, "interrogator")}
            />
          </Tooltip>
        )} */}
      </div>
    </>
  );
};

export default ActionIcons;

import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import irp from "../../../../public/icons/irp.svg";
import summarizer from "../../../../public/icons/summarizer.svg";
import fact_checker from "../../../../public/icons/checker.svg";
import translator from "../../../../public/icons/translator.svg";
import collab from "../../../../public/icons/collab.svg";
import analyzer from "../../../../public/icons/analyzer.svg";
import deep_chat from "../../../../public/icons/deep.svg";

const BASE_URL = "http://192.81.213.226";

const dropdownItems = [
    {
        name: "IRP",
        to: `${BASE_URL}:30/home`, 
        key: "irp",
        icon: irp,
    },
  {
    name: "Analyzer",
    to: `${BASE_URL}:31/home`,
    key: "analyser",
    icon: analyzer,
  },
  {
    name: "Summarizer",
    to: `${BASE_URL}:32/home`,
    key: "summarizer",
    icon: summarizer,
  },
  {
    name: "Translator",
    to: `${BASE_URL}:33/home`,
    key: "translator",
    icon: translator,
  },
  {
    name: "Fact Checker",
    to: `${BASE_URL}:34/home`,
    key: "fact checker",
    icon: fact_checker,
  },
  {
    name: "Collab",
    to: `${BASE_URL}:36/home`,
    key: "collab",
    icon: collab,
  },
  {
    name: "Deep Chat",
    to: `${BASE_URL}:35/home`,
    key: "deep chat",
    icon: deep_chat,
  },
];

function DashboardDropdown() {
  const { permissions } = useSelector(
    (state: any) => state?.auth?.userInfo?.role,
  );

  return (
    <ul className="bg-sirp-lightGrey shadow absolute top-[3rem] pt-1 flex md:grid grid-cols-3 rounded z-30 w-[130px] md:w-[300px]">
      {dropdownItems.map((item, index) => {
        if (permissions.includes(item.key)) {
          return (
            <li
              key={index}
              className="py-1.5 px-2  text-black border-b-[1px] border-r-[1px] border-b-gray-200/[0.5] border-r-gray-200/[0.5] text-[12px] text-center"
            >
              <Link href={item.to} className="grid gap-x-3 items-center">
                <Image
                  src={item.icon}
                  alt={item.key}
                  className={`${
                    item.key !== "deep chat"
                      ? "h-[10px] w-[10px] md:mx-auto"
                      : "h-[20px] w-[10px] md:mx-auto"
                  } `}
                />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default DashboardDropdown;

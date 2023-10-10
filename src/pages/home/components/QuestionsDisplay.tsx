import Image from "next/image";
import { useRef } from "react";

function QuestionsDisplay({ questionText }) {

    return (
        <div className="w-full md:h-[15%] h-[10%] flex  bg-gray-100 py-3">
             <div className="w-[8%] h-fit my-auto">
                <Image 
                    src={""}
                    alt=""
                    className="h-[35px] w-[35px] m-auto flex items-start rounded"
                />
            </div>
            
            <div className="w-[92%] ">
                <div
                    className="w-full h-full resize-none text-[14px] font-bold pl-3 pr-7 pt-3 capitalize"
                >{questionText}</div>
            </div>
        </div>
    )
}

export default QuestionsDisplay;
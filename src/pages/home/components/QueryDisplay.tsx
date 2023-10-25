import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import analyzerInvert from "../../../../public/icons/analyzerInvert.svg";
import TypewriterComponent from "typewriter-effect";
import MetaData from "./MetaData";
import ActionIcons from "./ActionIcons";
import MoreVertIcon from '@mui/icons-material/MoreVert';


function QueryDisplay({
    docText,
    addedQuestion,
    questionClick,
    convoId,
    facts,
    loadingId,
    time,
    loading,
}){
    const textareaRef = useRef(null);
    const [dHeight, setDHeight] = useState('15%');
    const [iconsToggle, setIconsToggle] = useState(false);

    console.log(loadingId)

    const handleInput = () => {
        if(textareaRef?.current){
            const textarea = textareaRef?.current;
            textarea.style.height = 'auto'; // Reset the height to auto
            textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height
            setDHeight(`${textarea.scrollHeight}px`)
        }
    };

    const handleQuestionClick = (e, id, question) => {
        e.preventDefault();
        questionClick(id, question)
    }

    const text = loadingId === 'loading' ? <i>Fetching response, may take a while...</i> : <TypewriterComponent options={{ strings: docText, autoStart: true, delay: 5, loop: false }} />
    // const text = loadingId === 'loading' ? <i>Fetching response...</i> : <p>{docText}</p>
  

    return (
        <div className={`w-full h-[${dHeight}] flex bg-gray-50 pt-2 pb-5 relative`}>
            {/* <div className="flex justify-between"> */}
                <div className={`w-[8%]`}>
                    <Image 
                        src={analyzerInvert}
                        alt=""
                        className="bg-sirp-primary h-[35px] w-[35px] p-2.5 mx-auto rounded mt-2"
                    />
                </div>
                {/* {convoId !== "loading" && <ActionIcons docId={convoId} /> } */}
            {/* </div> */}

            <div  className={`w-[90%] h-[${dHeight}]`}>
                <div 
                onInput={handleInput}
                ref={textareaRef}
                className={`w-full text-[13px] overflow-y-hidden resize-none bg-gray-50  pl-3 pr-7  pt-3 h-[${dHeight}]`}> 
                    {facts?.length > 0 &&
                     <div className="mb-7">
                        <MetaData facts={facts} />
                    </div>
                    }
                    <div className="mb-5text-justify">{text}</div>
                    {loadingId !== 'loading' || docText === 'Related Questions' && <h3 className="font-semibold py-1">Related Questions</h3>}

                    <div className="flex flex-col text-justify w-fit mt-3">
                        {addedQuestion?.length > 0 &&
                            addedQuestion.map((question, index) => (
                                <p
                                key={index}
                                onClick={(e) => handleQuestionClick(e, convoId, question)}
                                className="hover:cursor-pointer hover:text-sirp-primary hover:underline"
                                ><TypewriterComponent options={{ strings: question, autoStart: true, delay: 5, loop: false }} /></p>
                            ))
                        }
                    </div>
                </div>
            </div>


            {convoId !== "loading" && 
                <div className="w-[2%] mr-3">
                    <MoreVertIcon
                    className="hover:cursor-pointer text-gray-400" 
                    onClick={() => setIconsToggle(prevState => !prevState)} />
                </div> 
            }

            {iconsToggle &&
                <div className="absolute right-2 -top-6">
                    <ActionIcons docId={loadingId} />
                </div>
            }
        </div>
    )
}
 
export default QueryDisplay
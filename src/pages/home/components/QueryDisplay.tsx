import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import analyzerInvert from "../../../../public/icons/analyzerInvert.svg";
import TypewriterComponent from "typewriter-effect";
import MetaData from "./MetaData";
import ActionIcons from "./ActionIcons";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
const analyzerInvert = require("../../../../public/icons/analyzerInvert.svg");

interface QueryDisplayProps {
    docText: string;
    addedQuestion?: string[];
    questionClick: (id: string, question: string) => void;
    convoId: string;
    facts?: any[];
    loadingId: string;
    index: number;
    time?: string;
    loading: boolean;
}

/**
 * QueryDisplay component for rendering query responses with enhanced markdown support
 * @param {QueryDisplayProps} props - Component props
 */
function QueryDisplay({
    docText,
    addedQuestion,
    questionClick,
    convoId,
    facts,
    loadingId,
    index,
    // messageID,
    time,
    loading,
}: QueryDisplayProps) {
    const textareaRef = useRef<HTMLDivElement>(null);
    const [dHeight, setDHeight] = useState('15%');
    const [iconsToggle, setIconsToggle] = useState(false);
    const [processedText, setProcessedText] = useState(docText);

    useEffect(() => {
        // Process incoming text for better markdown rendering
        if (docText) {
            let text = docText;
            
            // Handle code blocks
            text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                return `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\``;
            });

            // Handle inline code
            text = text.replace(/`([^`]+)`/g, (match, code) => {
                return `\`${code.trim()}\``;
            });

            // Handle lists
            text = text.replace(/^(\s*)-\s/gm, '$1* ');

            // Handle tables
            text = text.replace(/\|[\s-]+\|/g, '| --- |');

            setProcessedText(text);
        }
    }, [docText]);

    const handleInput = () => {
        if(textareaRef?.current){
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            setDHeight(`${textarea.scrollHeight}px`)
        }
    };

    const handleQuestionClick = (e: React.MouseEvent, id: string, question: string) => {
        e.preventDefault();
        questionClick(id, question)
    }

    // Enhanced markdown components configuration
    const markdownComponents: Partial<Components> = {
        code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return (
                <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            )
            // : (
            //     <code className="bg-gray-100 text-gray-800 px-1 rounded" {...props}>
            //         {children}
            //     </code>
            // )
        },
        a: ({ node, href, children }) => (
            <a 
                href={href} 
                className="text-sirp-primary hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
        blockquote: ({ node, children }) => (
            <blockquote className="border-l-4 border-sirp-primary pl-4 italic my-4">
                {children}
            </blockquote>
        ),
        table: ({ node, children }) => (
            <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-200">
                    {children}
                </table>
            </div>
        ),
        th: ({ node, children }) => (
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {children}
            </th>
        ),
        td: ({ node, children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {children}
            </td>
        ),
        ul: ({ node, children }) => (
            <ul className="list-disc pl-6 space-y-2">
                {children}
            </ul>
        ),
        ol: ({ node, children }) => (
            <ol className="list-decimal pl-6 space-y-2">
                {children}
            </ol>
        ),
        h1: ({ node, children }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900">
                {children}
            </h1>
        ),
        h2: ({ node, children }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3 text-gray-800">
                {children}
            </h2>
        ),
        h3: ({ node, children }) => (
            <h3 className="text-lg font-medium mt-4 mb-2 text-gray-700">
                {children}
            </h3>
        ),
    };

    // Render loading state or markdown content
    const content = loadingId === 'loading' ? (
        <i>Fetching response, may take a moment...</i>
    ) : (
        <div className="prose max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={markdownComponents}
            >{processedText}</ReactMarkdown>
        </div>
    );

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
                    <div className="mb-5 text-justify prose max-w-none text-gray-800 leading-relaxed">{content}</div>
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


            {convoId !== "loading" && index !== 0 &&
                <div className="w-[2%] mr-3">
                    <MoreVertIcon
                    className="hover:cursor-pointer text-gray-400" 
                    onClick={() => {
                        // set message ID
                        // setMessageID(``)
                        setIconsToggle(prevState => !prevState)
                    }} />
                </div> 
            }

            {iconsToggle &&
                <div className="absolute right-2 -top-6">
                    <ActionIcons docId={convoId} />
                </div>
            }
        </div>
    )
}
 
export default QueryDisplay
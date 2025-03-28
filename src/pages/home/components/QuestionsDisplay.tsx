import Image from "next/image";
import user from "../../../../public/images/user1.jpg";
import { useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function QuestionsDisplay({ questionText }) {
    const { userInfo } = useSelector((state: any) => state?.auth);

    const userName = () => userInfo?.firstName + " " + userInfo?.lastName;
    const userInitials = () => userInfo?.firstName[0] + userInfo?.lastName[0];

    return (
        <div className="w-full md:h-[15%] h-[10%] flex  bg-gray-100 py-3">
            <div className="w-[8%] h-fit pt-4">
                {/* <img
                    src={userInfo?.image ?? userInitials()}
                    alt="userImage"
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px] m-auto flex items-start rounded uppercase"
                    /> */}
                <div className="h-[32px] w-[32px] aspect-square flex items-center justify-center rounded-full bg-sirp-primary">
                    <p className="text-white text-[12px] font-extrabold">
                        {userInitials()}
                    </p>
                </div>
            </div>
            
            <div className="w-[92%]">
                <div className="w-full h-full resize-none text-[14px] font-bold pl-3 pr-7 pt-3 capitalize prose max-w-none">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                    >{questionText || ''}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default QuestionsDisplay;
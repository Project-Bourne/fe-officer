import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
// import LoaderGif from "../../../../public/icons/loader_dots.svg";

const LoaderGif = require("@/public/icons/loader_dots.svg");

function InputSearch({ QueryInputChange, handleQueryRequest, showInput, loading }) {
    return (
        <>
            {showInput && (
                <div className="md:w-[55%] w-[70%] md:pr-5 pr-3 pl-3  md:h-[8%] h-[6%] flex items-center bg-white shadow-xl rounded-lg fixed bottom-3 md:left-[33%] left-[23%]">
                    <input
                        type="text"
                        onChange={QueryInputChange}
                        placeholder="Send a query"
                        className="text-[13px] font-lighter w-full h-full px-3 bg-transparent border-none border-0 outline-none text-gray-700"
                    />
                    <button 
                        className='hover:cursor-pointer text-gray-400'
                    >
                        {loading ? 
                        <Image src={LoaderGif} alt="loader" width={25} /> :
                        <SendIcon 
                            onClick={handleQueryRequest}
                            titleAccess='send query'
                        />
                        }
                    </button>
                </div>
            )}
        </>
    )
}

export default InputSearch;
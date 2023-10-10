import { useFormatDate } from "@/components/custom-hooks"

function Content({ data }){
    return(
        <div>
            {/* table header */}
            <ul className="flex font-bold py-2.5 bg-gray-100 px-2">
                <li className="w-[5%]"></li>
                <li className="w-[80%]">Title</li>
                <li className="w-[15%]">Time</li>
            </ul>
            {/* table body  */}
            {data?.length > 0 ?
                <ul>
                { data.map((item, index) => (
                    <li key={index} className="flex hover:cursor-pointer px-3 py-1.5 text-[13px] hover:bg-sirp-primaryLess2">
                        <p className="w-[5%]"></p>
                        <p className="w-[80%]">{item?.title}</p>
                        <p className="w-[15%]">{useFormatDate(item?.updatedAt)}</p>
                    </li>
                ))}
                </ul> :
                <div className="py-2 px-7">No Query history!</div>
            }
        </div>
    )
}

export default Content
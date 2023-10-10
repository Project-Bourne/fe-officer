function Content({ data }){
    return(
        <div>
            {/* table header */}
            <ul className="flex font-bold py-2.5 bg-gray-100 px-2">
                <li className="w-[5%]"></li>
                <li className="w-[75%]">Title</li>
                <li className="w-[20%]">Time</li>
            </ul>
            {/* table body  */}
            {data?.length > 0 ?
                <ul>
                { data.map((item, index) => (
                    <li key={index} className="flex hover:bg-gray-50 p-3">
                        <p className="w-[5%]"></p>
                        <p className="w-[75%]"></p>
                        <p className="w-[20%]"></p>
                    </li>
                ))}
                </ul> :
                <div className="py-2 px-7">No Query history!</div>
            }
        </div>
    )
}

export default Content
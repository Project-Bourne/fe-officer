import { useRouter } from "next/router";
import { Table } from "@/components/ui";

/**
 * Interface for the interrogation item data structure
 */
interface InterrogationItem {
    uuid: string;
    title: string;
    updatedAt: string;
}

/**
 * Props interface for the Content component
 */
interface ContentProps {
    /** Array of interrogation items to display in the table */
    data: InterrogationItem[];
    /** Loading state for the table */
    loading?: boolean;
    /** Current page number */
    page?: number;
    /** Total number of items */
    totalItems?: number;
    /** Callback for page change */
    onPageChange?: (page: number) => void;
    /** Callback for delete action */
    onDelete?: (uuid: string) => void;
}

/**
 * Content component that displays a table of interrogation history
 * @param {ContentProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
function Content({ 
    data,
    loading = false,
    page = 0,
    totalItems = 0,
    onPageChange = () => {},
    onDelete
}: ContentProps): JSX.Element {
    /**
     * Transforms interrogation items to match table data structure
     */
    const transformedData = data.map(item => ({
        uuid: item.uuid,
        title: item.title,
        createdAt: item.updatedAt
    }));

    // return(
    //     <div>
    //         {/* table header */}
    //         <ul className="flex font-bold py-2.5 bg-gray-100 px-2">
    //             <li className="w-[5%]"></li>
    //             <li className="w-[80%]">Title</li>
    //             <li className="w-[15%]">Time</li>
    //         </ul>
    //         {/* table body  */}
    //         {data?.length > 0 ?
    //             <ul>
    //             { data.map((item, index) => (
    //                 <li key={index} onClick={() => handleRoute(item?.uuid)} className="flex items-center hover:cursor-pointer px-3 py-1.5 text-[13px] hover:bg-sirp-primaryLess2">
    //                     <p className="w-[5%]"><ChatIcon style={{ fontSize: "17px"}} className="text-gray-300" /></p>
    //                     <p className="w-[80%] first-letter:capitalize">{item?.title}</p>
    //                     <p className="w-[15%]">{useFormatDate(item?.updatedAt)}</p>
    //                 </li>
    //             ))}
    //             </ul> :
    //             <div className="py-2 px-7">No Query history!</div>
    //         }
    //     </div>
    // )

    return (
        <Table
            data={transformedData}
            loading={loading}
            page={page}
            totalItems={totalItems}
            onPageChange={onPageChange}
            // onDelete={onDelete}
        />
    );
}

export default Content;
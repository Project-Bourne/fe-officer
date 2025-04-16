import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Content from "../home/components/Content";
import InterrogatorService from "@/services/interrogator.service";
import NotificationService from "@/services/notification.service";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/redux/reducer/authReducer";
import { dummyInterrogations } from "@/utils/dummyData";

/**
 * History page component that displays a list of all interrogations
 * @returns {JSX.Element} The rendered component
 */
function History(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [allInterrogations, setAllInterrogations] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [cookies] = useCookies(['deep-access']);
  const { userInfo } = useSelector((state: any) => state.auth);
  
  const url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/token/user`;

  const interrogationService = new InterrogatorService();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Simulate API call with dummy data
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await interrogationService.getAllQueries();

        console.log('Queries', res);
        if (res?.status) {
          setAllInterrogations(res?.data.interrogations);
          setTotalItems(res?.data?.totalItems);
        
          // Calculate pagination
          // const itemsPerPage = 10;
          // const start = page * itemsPerPage;
          // const end = start + itemsPerPage;
          // setPaginationData(res?.data.interrogations.slice(start, end))
        }
        // const paginatedData = dummyInterrogations.slice(start, end);
        
        // setAllInterrogations(paginatedData);
        // setTotalItems(dummyInterrogations.length);
      } catch (err) {
        NotificationService.error({
          message: 'Failed to load data!',
          addedText: 'Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    loadData()
    if (!userInfo) {
      getUserInfo();
    }
  }, [page]); // Fetch data when page changes

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "deep-token": cookies["deep-access"] || "",
  };

  /**
   * Fetches user information from the server
   */
  const getUserInfo = async (): Promise<void> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (response?.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data?.data));
      } else {
        if (response.status === 403) {
          router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
        }
        const data = await response.json();
        NotificationService.error({
          message: "Error: failed to fetch user data",
          addedText: data?.message,
          position: "top-right",
        });
      }
    } catch (err: any) {
      NotificationService.error({
        message: "Error: failed to fetch user data ",
        addedText: err?.message,
        position: "top-right",
      });
    }
  };

  /**
   * Handles page change in the table
   * @param {number} newPage - The new page number
   */
  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  /**
   * Handles deletion of an interrogation
   * @param {string} uuid - The UUID of the interrogation to delete
   */
  // const handleDelete = async (uuid: string): Promise<void> => {
  //   try {
  //     const res = await interrogationService.deleteQuery(uuid);
  //     if (res?.status) {
  //       NotificationService.success({
  //         message: 'Query deleted successfully'
  //       });
  //       getInterrogations(); // Refresh the list
  //     } else {
  //       NotificationService.error({
  //         message: 'Failed to delete query!',
  //         addedText: res?.message
  //       });
  //     }
  //   } catch (err: any) {
  //     NotificationService.error({
  //       message: 'Failed to delete query!',
  //       addedText: err?.message
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Query History
          </h1>
          <Link
            href="/home"
            className="px-4 py-2 text-sm font-medium rounded-md bg-sirp-primary text-white hover:bg-sirp-primary/90 transition-colors duration-150"
          >
            New Query
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          <Content 
            data={allInterrogations}
            loading={loading}
            page={page}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            // onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default History;

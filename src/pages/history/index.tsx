import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QueryUpload from "../home/components/QueryUpload";
import Link from "next/link";
import Content from "../home/components/Content";
import InterrogatorService from "@/services/interrogator.service";
import NotificationService from "@/services/notification.service";
import CustomModal from "@/components/ui/CustomModal";
import { Loader } from "@/components/ui";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/redux/reducer/authReducer";

function Home() {
  const [loading, setLoading] =  useState(false);
  const [allInterrogations, setAllInterrogations] = useState([]);
  const [cookies, setCookies] = useCookies(['deep-access']);
  const { userInfo } = useSelector((state: any) => state.auth )
  const url = 'http://192.81.213.226:81/80/token/user';

  const interrogationService = new InterrogatorService();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getInterrogations();
    if(!userInfo){
      getUserInfo();
    }
  },[]);

  const getInterrogations = async() => {
    setLoading(true);
    try{
      const res = await interrogationService.getAllQueries();
      setLoading(false)
      if(res?.status){
        setAllInterrogations(res?.data?.interrogations);
      }
      else{
        setLoading(false);
        NotificationService.error({
          message: 'Failed to get interrogations!',
          addedText: res?.message
        })
      }
    }catch(err: any){
      setLoading(false);
      NotificationService.error({
        message: 'Failed to get interrogations!',
        addedText: err?.message
      })
    }
  }

  const headers: any = {
    "deep-token": cookies["deep-access"],
    "Content-Type": "application/json",
  }

  const getUserInfo = async () => {
    try {
      const response: any = await fetch(url,
        {
          method: "GET",
          headers,
        },
      );
      
      if (response?.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data?.data));
      } else {
        if(response.status === 403){
          router.push('http://192.81.213.226:30/auth/login')
        }
        const data = await response.json();
        NotificationService.error({
          message: "Error: failed to fetch user data",
          addedText: data?.message,
          position: "top-center",
        });
      }
    } catch (err: any) {
      NotificationService.error({
        message: "Error: failed to fetch user data ",
        addedText: err?.message,
        position: "top-center",
      });
    }
  };


  return (
    <div className="pb-7">
        <div>
          <h1 className="text-[20px] md:text-[28px] font-bold md:ml-10 ml-5 mb-5">
            Query History
          </h1>
        </div>



      {loading ? 
      <div className="flex justify-center items-center mt-10"><Loader /></div>
      :
      <div className="bg-sirp-listBg border h-[100%] my-5 md:mx-10  rounded-t-[1rem]">
        <div className="flex gap-x-4 items-center justify-end w-[100%] px-2 border-b-2 py-3">
          <Link 
            href="home"
            className="py-2 px-3 text-[13px] rounded-md bg-sirp-primary text-white hover:bg-sirp-primary/[0.8] relative right-7">New Query</Link>
        </div>

        <div className="w-full">
          <Content data={allInterrogations} />
        </div>
      </div>
      }

    </div>

  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QueryUpload from "./components/QueryUpload";
import Link from "next/link";
import Content from "./components/Content";
import InterrogatorService from "@/services/interrogator.service";
import NotificationService from "@/services/notification.service";

function Home() {
  const [loading, setLoading] =  useState(false);
  const [allInterrogations, setAllInterrogations] = useState([])
  const interrogationService = new InterrogatorService();

  useEffect(() => {
    getInterrogations();
  },[]);

  const getInterrogations = async() => {
    setLoading(true);
    try{
      const res = await interrogationService.getAllQueries();
      setLoading(false)
      if(res?.status){
        setAllInterrogations(res?.data);
        console.log(res?.data);
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


  return (
    <div className="pb-7">
        <div>
          <h1 className="text-[20px] md:text-[28px] font-bold md:ml-10 ml-5 mb-5">
            Query History
          </h1>
        </div>



      <div className="bg-sirp-listBg border h-[100%] my-5 md:mx-10  rounded-t-[1rem]">
        <div className="flex gap-x-4 items-center justify-end w-[100%] px-2 border-b-2 py-3">
          <Link 
            href="home/inputQuery"
            className="py-2 px-3 text-[13px] rounded-md bg-sirp-primary text-white hover:bg-sirp-primary/[0.8] relative right-7">New Query</Link>
        </div>

        <div className="w-full">
          <Content data={allInterrogations} />
        </div>
      </div>
    </div>




  );
}

export default Home;

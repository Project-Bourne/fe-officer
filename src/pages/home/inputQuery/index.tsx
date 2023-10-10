import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// import Interpratation from "../components/Interpratation";
// import QueryCard from "../components/QueryCard";
// import MoreOption from "../components/moreOptions";
// import DummyText from "../components/dummyText";
import InputSearch from "../components/InputSearch";
import QueryDisplay from "../components/QueryDisplay";
import QuestionsDisplay from "../components/QuestionsDisplay";
import InterrogatorService from "@/services/interrogator.service";
import NotificationService from "@/services/notification.service";

const QueryPage = () => {
  const [query, setQuery] = useState<any>(null);
  const [queryResponse, setQueryResponse] = useState<any[]>([]);
  const [inputFieldDisplay, setInputFieldDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false)

  const queryScreenRef = useRef(null);
  const router = useRouter();
  const interrogatorService = new InterrogatorService();

  const scrollToBottom = () => {
    queryScreenRef.current.scrollTop = queryScreenRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [queryResponse]); 


  const handleInputSearch = (e) => {
    setQuery({query: e.target.value})
  }

// handle when a question is clicked 
  const handleQuestionClick = async (id, question) => {
    if(!id || !question) return;

    setLoading(true);
    const data = { question }
    console.log('question:', data)
    const preResponseArr = queryResponse;

    preResponseArr.push({
      uuid: 'loading',
      title: question,
      response: 'fetching response...'
    });

    try{
       // Assuming interrogatorService.sendQuestion returns a promise
       const res = await interrogatorService.sendQuestion(id, data);
       setLoading(false);

      if (res?.status) {
        const quesArr = res?.data?.fivewhQuestions;
        const ques = res?.data?.question;
        const answer = res?.data?.answer;
        const uuid = res?.data?.interrogationUuid;
        const time = res?.data?.updatedAt;
        const facts = res?.data?.factCheck?.confidence;

        console.log('facts-indx2', facts)
        // Remove the 'loading' object from queryResponse
        const updatedResponseArr = preResponseArr?.filter(item => item?.uuid !== 'loading');

        updatedResponseArr.push({
          uuid,
          title: ques,
          response: answer,
          time,
          moreQuestions: quesArr,
          facts
        });

        setQueryResponse(updatedResponseArr);
      } else {
        const respArr = preResponseArr?.filter(item => item?.uuid !== 'loading');
        setQueryResponse(respArr);

        NotificationService.error({
          message: 'Query request failed!',
          addedText: res?.message,
          position: "top-center"
        });
      }
    } catch (error: any) {
      setLoading(false);
      const respArr = preResponseArr?.filter(item => item?.uuid !== 'loading');
      setQuery(respArr);

      NotificationService.error({
        message: 'Something went wrong',
        addedText: error?.message,
        position: "top-center"
      });
    }
  }



  // handle when a query is first made 
  const handleQueryRequest = async (e) => {
    e.preventDefault();

    if (query){
      setLoading(true);

      const preResponseArr = queryResponse;
      preResponseArr.push({
        uuid: 'loading',
        title: query.query,
        response: 'fetching response...'
      });

      try {
        // Assuming interrogatorService.sendQuery returns a promise
        const res = await interrogatorService.sendQuery(query);

        setLoading(false);

        if (res?.status) {
          const quesArr = res?.data?.questions;
          const ques = res?.data?.interrogation?.title;
          const answer = res?.data?.interrogation?.documentText;
          const uuid = res?.data?.interrogation?.uuid;
          const time = res?.data?.interrogation?.updatedAt;
          const facts = res?.data?.interrogation?.factCheck?.confidence;

          console.log('facts-indx1', facts)

          // Remove the 'loading' object from queryResponse
          const updatedResponseArr = preResponseArr?.filter(item => item.uuid !== 'loading');

          updatedResponseArr.push({
            uuid,
            title: ques,
            response: answer,
            time,
            moreQuestions: quesArr,
            facts
          });

          setQueryResponse(updatedResponseArr);
          setQuery(null);
          setInputFieldDisplay(false);
        } else {
          const respArr = preResponseArr?.filter(item => item?.uuid !== 'loading');
          setQueryResponse(respArr);

          NotificationService.error({
            message: 'Query request failed!',
            addedText: res?.message,
            position: "top-center"
          });
        }
      } catch (error: any) {
        setLoading(false);
        const respArr = preResponseArr?.filter(item => item?.uuid !== 'loading');
        setQueryResponse(respArr);

        NotificationService.error({
          message: 'Something went wrong',
          addedText: error?.message,
          position: "top-center"
        });
      }
    }


  };

  

  return (
    <div className="mt-[5rem] h-full mx-5 ">
      <p className="hover:cursor-pointer text-[13px] font-semibold pb-3" onClick={() => router.back()}>&larr;&nbsp;Back</p>

      <div className="border-b-[1px] py-5 rounded-t-[1rem] bg-gray-50">
        <h1 className="text-2xl pl-10 font-bold">Input Query</h1>
      </div>

      <div ref={queryScreenRef} className="lg:h-[73vh] h-[90vh] bg-gray-100 overflow-y-auto pb-[10rem]">
        { queryResponse?.length > 0 ?
          queryResponse?.map((response) => (
            <div key={response?.uuid}>
              <QuestionsDisplay 
                questionText={response?.title} 
                />
              <QueryDisplay 
                facts={response?.facts}
                addedQuestion={response?.moreQuestions}
                questionClick={handleQuestionClick}
                docText={response?.response} 
                time={response?.time}
                convoId={response?.uuid}
                loading={loading}
                questionLoading={questionLoading}
                />
            </div>
          )) : <></>
        }
        <InputSearch
          QueryInputChange={handleInputSearch}
          handleQueryRequest={handleQueryRequest}
          showInput={inputFieldDisplay}
          loading={loading}
         />
      </div>
    </div>
  );
};

export default QueryPage;

import { useRouter } from "next/router";
import QueryDisplay from "../components/QueryDisplay";
import QuestionsDisplay from "../components/QuestionsDisplay";
import { useRef, useState } from "react";
import NotificationService from "@/services/notification.service";
import InterrogatorService from "@/services/interrogator.service";

function QueryHistoryInfo() {
    const router = useRouter();
    const queryScreenRef = useRef<any>(null); 
    const interrogatorService = new InterrogatorService();
    const [loading, setLoading] = useState(false)
    const [queryResponse, setQueryResponse] = useState<any[]>([]);
    const { id } = router.query;


    const scrollToBottom = () => {
        queryScreenRef.current.scrollTop = queryScreenRef.current.scrollHeight;
    };


    // handle when a question is clicked 
  const handleQuestionClick = async (id, question) => {
    if(!id || !question) return;

    setLoading(true);
    const data = { question }
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
        const facts = [];

        // console.log('facts-indx2', facts)
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
      setQueryResponse(respArr);

      NotificationService.error({
        message: 'Something went wrong',
        addedText: error?.message,
        position: "top-center"
      });
    }
  }

  console.log('id', id)

    return (
        <div className="mt-[5rem] h-full mx-5 ">
            <p className="hover:cursor-pointer text-[13px] font-semibold pb-3" onClick={() => router.back()}>&larr;&nbsp;Back</p>

            <div className="border-b-[1px] py-5 rounded-t-[1rem] bg-gray-50">
                <h1 className="text-2xl pl-10 font-bold">Query history</h1>
            </div>

            <div ref={queryScreenRef} className="lg:h-[73vh] h-[90vh] bg-gray-100 overflow-y-auto pb-[10rem]">
                { queryResponse?.length > 0 ?
                    queryResponse?.map((response, index) => (
                        <div key={index}>
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
                            />
                        </div>
                    )) : <></>
                }
            </div>
        </div>
  );
}

export default QueryHistoryInfo
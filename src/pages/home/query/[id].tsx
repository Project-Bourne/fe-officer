import { useRouter } from "next/router";
import QueryDisplay from "../components/QueryDisplay";
import QuestionsDisplay from "../components/QuestionsDisplay";
import { useEffect, useRef, useState } from "react";
import NotificationService from "@/services/notification.service";
import InterrogatorService from "@/services/interrogator.service";
import { Loader } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setUserInfo } from "@/redux/reducer/authReducer";

function QueryHistoryInfo() {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryScreenRef = useRef<any>(null); 
    const interrogatorService = new InterrogatorService();
    const { id } = router.query;
    const { incoming } = router.query;
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [queryResponse, setQueryResponse] = useState<any[]>([]);
    const [cookies, setCookies] = useCookies(['deep-token']);
    const { userInfo } = useSelector((state: any) => state.auth )
    const url = 'http://192.81.213.226:81/80/token/user';


    const scrollToBottom = () => {
        queryScreenRef.current.scrollTop = queryScreenRef.current.scrollHeight;
    };

    useEffect(() => {
        console.log(id);
        console.log('incomung', incoming)
        if(id){ 
            getQueries();
        }
        if(incoming){
            if(typeof incoming === 'string' && incoming.includes('&')) {
                const [routeId, routeName] = incoming.split("&");
                getQueriesForImports(routeId, routeName);
            }
        }

        if(!userInfo){
            getUserInfo();
        }
    },[])


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

    // handle when a question is clicked 
    const handleQuestionClick = async (intId, question) => {
        if(!intId || !question) return;

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
        const res = await interrogatorService.sendQuestion(intId, data);
        setLoading(false);

        if (res?.status) {
            const quesArr = res?.data?.fivewhQuestions;
            const ques = res?.data?.question;
            const answer = res?.data?.answer;
            const uuid = res?.data?.interrogationUuid;
            const time = res?.data?.updatedAt;
            const facts = [];

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

    const getQueries = () => {
        setInitialLoading(true)
        try{
            interrogatorService.getInterrogationStream(id)
            .then((res) => {
                setInitialLoading(false);
                if(res?.status){
                    console.log('stream', res?.data?.messages)
                    setQueryResponse(res?.data?.messages);
                }else{
                    NotificationService.error({
                        message: 'Unable to fetch Queries!',
                        addedText: res?.message,
                        position: "top-center"
                    });
                }
            }).catch((err) => {
                setInitialLoading(false);
                NotificationService.error({
                    message: 'Unable to fetch Queries!',
                    addedText: err?.message,
                    position: "top-center"
                });
            })
        }catch(err: any){
            setInitialLoading(false);
            NotificationService.error({
                message: 'Unable to fetch Queries!',
                addedText: err?.message,
                position: "top-center"
            });
        }
    }

    const getQueriesForImports = (routeId, routeName) =>{
        try{
            switch (routeName) {
                case "summarizer":
                    getDocById(`http://192.81.213.226:81/82/summary/${routeId}`,routeName);
                    break;
                case "translator":
                    getDocById(`http://192.81.213.226:81/83/translation/${routeId}`,routeName);
                    break;
                case "factcheck":
                    getDocById(`http://192.81.213.226:81/84/fact/${routeId}`,routeName);
                    break;
                case "irp":
                    getDocById(`http://192.81.213.226:81/84/fact/${routeId}`,routeName);
                    break;
                case "deepchat":
                    getDocById(`http://192.81.213.226:81/85/deepchat/${routeId}`,routeName);
                    break;
                case "analyzer":
                    getDocById(`http://192.81.213.226:81/81/analysis/${routeId}`,routeName);
                    break;
                case "collab":
                    getDocById(`http://192.81.213.226:81/86/api/v1/doc/${routeId}`,routeName);
                    break;
                default:
                throw new Error("Invalid routeName");
            }
        }catch(err){

        }
    }

    const getDocById = async (url, name) => {
        setLoading(true);
        try{ 
            const response = await fetch(url, {
                method: "GET",
                headers: headers,
            });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        switch (name) {
            case "translator":
                getDocInterrogation(data?.data?.textTranslation);
                break;
            case "factcheck":
                getDocInterrogation(data?.data?.confidence?.content);
                break;
            case "irp":
                getDocInterrogation(data?.data?.confidence?.content5wh);
                break;
            case "summarizer":
                getDocInterrogation(data?.data?.summaryArray[0].summary);
                break;
            // case "deepchat":
            case "collab":
              const  collabData: string[] = data?.data?.data?.ops.map((el) => {
                return el.insert
              })
              getDocInterrogation(collabData.join(' '))
              break;
            default:
            break;
        }
        setLoading(false);
        } catch (error: any) {
        console.error("Error:", error);
        NotificationService.error({
            message: "Error!",
            addedText: <p>{`${error.message}, please try again`}</p>,
            position: "top-center",
        });
        } finally {
        setLoading(false);
        }
    }


    const getDocInterrogation = async(content) => {
        const data = { text: content }
        const preResponseArr = queryResponse;

        preResponseArr.push({
        uuid: 'loading',
        title: content,
        response: 'fetching response...'
        });

        try{
            const res = await interrogatorService.interrogateImportDoc(data)
            if (res?.status) {
                const quesArr = res?.data?.fivewhQuestions;
                const ques = res?.data?.question;
                const answer = res?.data?.answer;
                const uuid = res?.data?.interrogationUuid;
                const time = res?.data?.updatedAt;
                const facts = [];

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
            const respArr = preResponseArr?.filter(item => item?.uuid !== 'loading');
            setQueryResponse(respArr);

            NotificationService.error({
                message: 'Something went wrong',
                addedText: error?.message,
                position: "top-center"
            });
        }
    }
 


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
                            questionText={response?.title || response?.question} 
                            />
                        <QueryDisplay 
                            facts={response?.facts}
                            addedQuestion={response?.moreQuestions || response?.fivewhQuestions}
                            questionClick={handleQuestionClick}
                            docText={response?.response || response?.answer} 
                            time={response?.time || response?.updatedAt}
                            convoId={response?.uuid }
                            loading={loading}
                            />
                        </div>
                    )) : <></>
                }
                {initialLoading && 
                    <div className="flex justify-center items-center"><Loader /></div>
                }
            </div>
        </div>
  );
}

export default QueryHistoryInfo
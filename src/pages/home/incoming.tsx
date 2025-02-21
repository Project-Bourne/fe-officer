import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// import Interpratation from "../components/Interpratation";
// import QueryCard from "../components/QueryCard";
// import MoreOption from "../components/moreOptions";
// import DummyText from "../components/dummyText";
import InputSearch from "./components/InputSearch";
import QueryDisplay from "./components/QueryDisplay";
import QuestionsDisplay from "./components/QuestionsDisplay";
import InterrogatorService from "@/services/interrogator.service";
import NotificationService from "@/services/notification.service";
import { Button } from "@/components/ui";
import AddIcon from "@mui/icons-material/Add";
import { setUserInfo } from "@/redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const QueryPage = () => {
  const [query, setQuery] = useState<any>(null);
  const [queryResponse, setQueryResponse] = useState<any[]>([]);
  const [inputFieldDisplay, setInputFieldDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies(["deep-access"]);

  const queryScreenRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const interrogatorService = new InterrogatorService();
  const { incoming } = router.query;

  // const url = "http://192.81.213.226:81/80/token/user";
  const url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/token/user`;

  const scrollToBottom = () => {
    queryScreenRef.current.scrollTop = queryScreenRef.current.scrollHeight;
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [queryResponse]);

//   Handle import
useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (typeof incoming === 'string') {
        try {
          const [routeId, routeName] = incoming.split('&');
          console.log('routeId', routeId);
          console.log('routeName', routeName);
          let url;
          switch (routeName) {
            case 'summarizer':
              // url = `http://192.81.213.226:81/82/summary/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE}/summary/${routeId}`;
              break;
            case 'translator':
              // url = `http://192.81.213.226:81/83/translation/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE}/translation/${routeId}`;
              break;
            case 'factcheck':
              // url = `http://192.81.213.226:81/84/fact/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`;
              break;
            case 'irp':
              // url = `http://192.81.213.226:81/84/fact/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`;
              break;
            case 'deepchat':
              // url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE}/deepchat/${routeId}`;
              break;
            case 'analyser':
              // url = `http://192.81.213.226:81/86/analysis/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE}/analysis/${routeId}`;
              break;
            case 'interrogator':
              // url = `http://192.81.213.226:81/87/interrogation/message/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE}/interrogation/message/${routeId}`;
              break;
            case 'collab':
              // url = `http://192.81.213.226:81/86/api/v1/doc/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/api/v1/doc/${routeId}`;
              break;
            default:
              throw new Error('Invalid routeName');
          }

          const response = await fetch(url, {
            method: 'GET',
            headers: headers
          });

          if (!response.ok) {
          }
          const data = await response.json();
          console.log('data', data);
          switch (routeName) {
            case 'translator':
              setQuery({ query: data?.data?.textTranslation});
              break;
            case 'factcheck':
              setQuery({ query: data?.data?.confidence?.content5wh});
              break;
            case 'irp':
              setQuery({ query: data?.data?.confidence?.content5wh});
              break;
            case 'summarizer':
              setQuery({ query: data?.data?.summaryArray[0].summary});
              break;
            case 'analyser':
              setQuery({ query: data?.data?.text});
              break;
            case 'collab':
              const collabData: string[] = data?.data?.data?.ops.map(el => {
                return el.insert;
              });
              setQuery({ query: collabData.join(' ')});
              break;
            // case 'interrogator':
            //   setQuery(data?.data?.answer);
            //   break;
            case 'deepchat':
              break;
            default:
              break;
          }
          setLoading(false);
        } catch (error: any) {
          NotificationService?.error({
            message: 'Error!',
            addedText: <p>{`${error?.message}, please try again`}</p>,
            position: 'top-right'
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [incoming]);

  const headers: any = {
    "Content-Type": "application/json",
    "deep-token": cookies["deep-access"] || "",
  };

  const getUserInfo = async () => {
    try {
      const response: any = await fetch(url, {
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

  const handleInputSearch = (e) => {
    setQuery({ query: e.target.value });
  };

  // handle when a question is clicked
  const handleQuestionClick = async (id, question) => {
    if (!id || !question) return;

    setLoading(true);
    const data = { question };
    console.log("question:", data);
    const preResponseArr = queryResponse;

    preResponseArr.push({
      uuid: "loading",
      title: question,
      response: "fetching response...",
    });

    try {
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
        const updatedResponseArr = preResponseArr?.filter(
          (item) => item?.uuid !== "loading"
        );

        updatedResponseArr.push({
          uuid,
          title: ques,
          response: answer,
          time,
          moreQuestions: quesArr,
          facts,
        });

        setQueryResponse(updatedResponseArr);
      } else {
        const respArr = preResponseArr?.filter(
          (item) => item?.uuid !== "loading"
        );
        setQueryResponse(respArr);

        NotificationService.error({
          message: "Query request failed!",
          addedText: res?.message,
          position: "top-right",
        });
      }
    } catch (error: any) {
      setLoading(false);
      const respArr = preResponseArr?.filter(
        (item) => item?.uuid !== "loading"
      );
      setQueryResponse(respArr);

      NotificationService.error({
        message: "Something went wrong",
        addedText: error?.message,
        position: "top-right",
      });
    }
  };

  // handle when a query is first made
  const handleQueryRequest = async (e) => {
    e.preventDefault();

    if (query) {
      setLoading(true);

      const preResponseArr = queryResponse;
      preResponseArr.push({
        uuid: "loading",
        title: query.query,
        response: "fetching response...",
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

          // console.log('facts-indx1', facts)

          // Remove the 'loading' object from queryResponse
          const updatedResponseArr = preResponseArr?.filter(
            (item) => item.uuid !== "loading"
          );

          updatedResponseArr.push({
            uuid,
            title: ques,
            response: answer,
            time,
            moreQuestions: quesArr,
            facts,
          });

          setQueryResponse(updatedResponseArr);
          setQuery(null);
          setInputFieldDisplay(false);
        } else {
          const respArr = preResponseArr?.filter(
            (item) => item?.uuid !== "loading"
          );
          setQueryResponse(respArr);

          NotificationService.error({
            message: "Query request failed!",
            addedText: res?.message,
            position: "top-right",
          });
        }
      } catch (error: any) {
        setLoading(false);
        const respArr = preResponseArr?.filter(
          (item) => item?.uuid !== "loading"
        );
        setQueryResponse(respArr);

        NotificationService.error({
          message: "Something went wrong",
          addedText: error?.message,
          position: "top-right",
        });
      }
    }
  };

  const handleNewQuery = () => {
    setQueryResponse([]);
    setQuery(null);
    setInputFieldDisplay(true);
  };

  return (
    <div className="mt-[5rem] h-full mx-5 ">
      {/* <p className="hover:cursor-pointer text-[13px] font-semibold pb-3" onClick={() => router.back()}>&larr;&nbsp;Back</p> */}

      <div className="border-b-[1px] py-5 rounded-t-[1rem] bg-gray-50 flex justify-between">
        <h1 className="text-2xl pl-10 font-bold">Input Query</h1>

        {queryResponse?.length > 0 && (
          <div className="flex items-center w-[14%]">
            <Button
              value={
                <>
                  <AddIcon fontSize="small" />
                  &nbsp; New Query
                </>
              }
              onClick={handleNewQuery}
              background="bg-sirp-primary"
              classNameStyle="text-white bg-sirp-primary text-[13px]  py-2 mr-5"
              size="xl"
            />
          </div>
        )}
      </div>

      <div
        ref={queryScreenRef}
        className="lg:h-[73vh] h-[90vh] bg-gray-100 overflow-y-auto pb-[10rem]"
      >
        {queryResponse?.length > 0 ? (
          queryResponse?.map((response, index) => (
            <div key={index}>
              <QuestionsDisplay questionText={response?.title} />
              <QueryDisplay
                facts={response?.facts}
                addedQuestion={response?.moreQuestions}
                questionClick={handleQuestionClick}
                docText={response?.response}
                time={response?.time}
                convoId={response?.uuid}
                loadingId={response?.uuid}
                loading={loading}
                index={index}
                // messageID={response?.messages[index]?.uuid}
              />
            </div>
          ))
        ) : (
          <></>
        )}
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
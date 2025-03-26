import { useRouter } from "next/router";
import QueryDisplay from "./components/QueryDisplay";
import QuestionsDisplay from "./components/QuestionsDisplay";
import { useEffect, useRef, useState } from "react";
import NotificationService from "@/services/notification.service";
import InterrogatorService from "@/services/interrogator.service";
import { Loader } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setUserInfo } from "@/redux/reducer/authReducer";
import { request2 } from "@/hooks/api";
// import Link from "next/link";
// import InputSearch from "./components/InputSearch";

function QueryHistoryInfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryScreenRef = useRef<any>(null);
  const interrogatorService = new InterrogatorService();
  const { id } = router.query;
  // const { incoming } = router.query;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [queryResponse, setQueryResponse] = useState<any[]>([]);
  const [cookies, setCookies] = useCookies(["deep-access"]);
  const { userInfo } = useSelector((state: any) => state.auth);

  //   const url = "http://192.81.213.226:81/80/token/user";
  const url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/token/user`;

  const scrollToBottom = () => {
    queryScreenRef.current.scrollTop = queryScreenRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [queryResponse]);

  useEffect(() => {
    if (id) {
      if (typeof id === "string") {
        if (id.includes("&")) {
          const [routeId, routeName] = id.split("&");
          getQueriesForImports(routeId, routeName);
        } else {
          getQueries();
        }
      }
    }
  }, [id]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const data = await request2('80/token/user', 'GET', null, true);
      if (data) {
        dispatch(setUserInfo(data?.data));
      }
    } catch (err: any) {
      NotificationService.error({
        message: "Network Error",
        addedText: "Unable to verify authentication status",
        position: "top-right",
      });
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
    }
  };

  // handle when a question is clicked
  const handleQuestionClick = async (intId, question) => {
    console.log("Dets", intId, question);
    if (!intId || !question) return;

    if (!cookies["deep-access"]) {
      NotificationService.error({ message: "Authentication expired", position: "top-right" });
      return router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
    }

    intId = intId.split("&")[0]

    setLoading(true);
    const data = { question };
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
        const uuid =  res?.data?.interrogationUuid || res?.data?.interrogation?.uuid;
        const time = res?.data?.updatedAt;
        const facts = [];

        // Remove the 'loading' object from queryResponse
        const updatedResponseArr = preResponseArr?.filter(
          (item) => item?.uuid !== "loading"
        );

        updatedResponseArr.push({
          interrogationUuid: uuid,
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

  const getQueries = () => {
    setInitialLoading(true);
    try {
      interrogatorService
        .getInterrogationStream(id)
        .then((res) => {

          console.log('RES 1: ', res);
          setInitialLoading(false);
          if (res?.status) {
            setQueryResponse(res?.data.messages);
          } else {
            NotificationService.error({
              message: "Unable to fetch Queries!",
              addedText: res?.message,
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          setInitialLoading(false);
          NotificationService.error({
            message: "Unable to fetch Queries!",
            addedText: err?.message,
            position: "top-right",
          });
        });
    } catch (err: any) {
      setInitialLoading(false);
      NotificationService.error({
        message: "Unable to fetch Queries!",
        addedText: err?.message,
        position: "top-right",
      });
    }
  };

  const getQueriesForImports = (routeId, routeName) => {
    try {
      switch (routeName) {
        case "summarizer":
          getDocById(
            // `http://192.81.213.226:81/82/summary/${routeId}`,
            `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE}/summary/${routeId}`,
            routeName
          );
          break;
        case "translator":
          getDocById(
            // `http://192.81.213.226:81/83/translation/${routeId}`,
            `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE}/translation/${routeId}`,
            routeName
          );
          break;
        case "factcheck":
          // getDocById(`http://192.81.213.226:81/84/fact/${routeId}`, routeName);
          getDocById(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`, routeName);
          break;
        case "irp":
          // getDocById(`http://192.81.213.226:81/84/fact/${routeId}`, routeName);
          getDocById(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`, routeName);
          break;
        case "deepchat":
          // getDocById(`http://192.81.213.226:81/85/deepchat/${routeId}`, routeName);
          getDocById(
            `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE}/deepchat/${routeId}`,
            routeName
          );
          break;
        case "analyser":
          // getDocById(`http://192.81.213.226:81/81/analysis/${routeId}`, routeName);
          getDocById(
            `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE}/analysis/${routeId}`,
            routeName
          );
          break;
        case "collab":
          // getDocById(`http://192.81.213.226:81/86/collab/${routeId}`, routeName);
          getDocById(
            `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/api/v1/doc/${routeId}`,
            routeName
          );
          break;
        default:
          throw new Error("Invalid routeName");
      }
    } catch (err) {}
  };

  const getDocById = async (url: string, name: string) => {
    setLoading(true);
    try {
      const data = await request2(url, 'GET', null, true);
      
      switch (name) {
        case "analyser":
          getDocInterrogation(data?.data?.text);
          break;
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
        case "collab":
          const collabData: string[] = data?.data?.data?.ops.map((el) => {
            return el.insert;
          });
          getDocInterrogation(collabData.join(" "));
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
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDocInterrogation = async (content) => {
    const data = { text: content };
    const preResponseArr = queryResponse;

    preResponseArr.push({
      uuid: "loading",
      title: content,
      response: "fetching response...",
    });

    try {
      const res = await interrogatorService.interrogateImportDoc(data);
      if (res?.status) {
        const quesArr = res?.data?.questions;
        const ques = content;
        const answer = "Related Questions";
        const uuid = res?.data?.interrogation?.uuid;
        const time = res?.data?.interrogation?.updatedAt;
        const facts = [];

        // Remove the 'loading' object from queryResponse
        const updatedResponseArr = preResponseArr?.filter(
          (item) => item?.uuid !== "loading"
        );

        console.log('Items: ', updatedResponseArr);

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

  return (
    <div className="mt-[5rem] h-full mx-5 ">
      <div className="border-b-[1px] py-5 rounded-t-[1rem] bg-gray-50">
        <h1 className="text-2xl pl-10 font-bold">Query history</h1>
      </div>

      <div
        ref={queryScreenRef}
        className="lg:h-[73vh] h-[90vh] bg-gray-100 overflow-y-auto pb-[10rem]"
      >
        {queryResponse?.length > 0 ? (
          queryResponse?.map((response, index) => {
            console.log('Response: ', response);
            return (
              <div key={index}>
                <QuestionsDisplay
                  questionText={response?.title || response?.question}
                />
                {/* {JSON.stringify(response)} */}
                <QueryDisplay
                  facts={response?.facts}
                  addedQuestion={
                    response?.moreQuestions || response?.fivewhQuestions
                  }
                  questionClick={handleQuestionClick}
                  docText={response?.response || response?.answer}
                  time={response?.time || response?.updatedAt}
                  loadingId={Array.isArray(id) ? id[0] : id}
                  convoId={response?.uuid || response?.interrogationUuid || response?.interrogation?.uuid || id}
                  loading={loading}
                  index={index}
                  // messageID={response?.messages[index]?.uuid}
                />
              </div>
            )
          })
        ) : (
          <></>
        )}
        {initialLoading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
        {/* { !initialLoading && (
        <InputSearch
          QueryInputChange={handleInputSearch}
          handleQueryRequest={handleQueryRequest}
          showInput={inputFieldDisplay}
          loading={loading}
        />
        )} */}
      </div>
    </div>
  );
}

export default QueryHistoryInfo;

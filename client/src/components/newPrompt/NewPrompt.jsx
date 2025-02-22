import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import axios from "../../axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
const NewPrompt = ({ data }) => {
  const endRef = useRef(null);
  const location = useLocation();
  const prevPathname = useRef(location.pathname);
  const stopRef = useRef(false);
  const queryClient = useQueryClient();
  const chatHistory = useRef({});

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: data?.history.map(({ role, parts }) => ({
      role: role,
      parts: [{ text: parts[0].text }],
    })),
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, prompt, answer, img.dbData]);

  //Remove from PROD
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        //if history only contain one item (prompt)
        askAI(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      if (chatHistory.current[data._id]) {
        setPrompt(chatHistory.current[data._id].prompt);
        setAnswer(chatHistory.current[data._id].answer);
      } else {
        //prevents answer from displaying in other chat
        setPrompt("");
        setAnswer("");
      }
    }
    prevPathname.current = location.pathname;
  }, [location.pathname]);

  const createNewChat = async () => {
    const { data: newData } = await axios.put(
      `/api/chats/${data._id}`,
      {
        prompt: prompt.length ? prompt : undefined,
        answer,
        img: img.dbData?.filePath || undefined,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return newData;
  };

  const mutation = useMutation({
    mutationFn: () => createNewChat(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }),
    onError: (err) => console.log(err),
  });

  const askAI = async (prompt, isInitial) => {
    if (!isInitial) setPrompt(prompt);
    stopRef.current = false;
    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, prompt] : [prompt]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        if (stopRef.current) return;
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
        chatHistory.current[data._id] = { prompt, answer: accumulatedText };
      }

      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const stopAI = () => {
    stopRef.current = true;
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const prompt = e.target.text.value;
    if (!prompt) return;
    e.target.text.value = "";
    setLoading(true);
    await askAI(prompt, false);
    setLoading(false);
  };

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <div className="chat-image message user">
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="380"
            transformation={[{ width: 380 }]}
          />
        </div>
      )}
      {prompt && <div className="message user">{prompt}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input type="text" name="text" placeholder="Ask me anything..." />
        {!loading ? (
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        ) : (
          <button onClick={stopAI}>
            <img src="/stop.svg" alt="" />
          </button>
        )}
      </form>
    </>
  );
};

export default NewPrompt;

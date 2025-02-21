import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import axios from "../../axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const NewPrompt = ({ data }) => {
  const endRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const stopRef = useRef(false);
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
    if (loading) {
      stopRef.current = true;
      setAnswer("");
      setPrompt("");
      console.log("STOP");
    }
  }, [data]);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, prompt, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return createNewChat();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const askAI = async (prompt, isInitial) => {
    if (!isInitial) setPrompt(prompt);
    setLoading(true);
    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, prompt] : [prompt]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        if (stopRef.current) break;
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const prompt = e.target.text.value;
    if (!prompt) return;
    e.target.text.value = "";
    await askAI(prompt, false);
  };

  const createNewChat = async () => {
    if (isChange) {
      setIsChange(false);
      return;
    }
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

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        askAI(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

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
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;

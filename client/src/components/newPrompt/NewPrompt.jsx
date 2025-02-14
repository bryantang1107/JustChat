import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import axios from "../../axios.js";
import { useAuth } from "@clerk/clerk-react";
const NewPrompt = () => {
  const endRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const { userId } = useAuth();
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const askAI = async (prompt) => {
    setPrompt(prompt);
    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, prompt] : [prompt]
    );
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.text.value;
    if (!prompt) return;
    const response = await axios.post(
      "/api/chats",
      {
        userId,
        text: prompt,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    askAI(prompt);
    e.target.text.value = "";
  };

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [prompt, answer, img.dbData]);
  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
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

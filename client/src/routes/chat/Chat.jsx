import { useEffect, useRef, useState } from "react";
import "./chat.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const Chat = () => {
  const endRef = useRef(null);
  const chatId = useLocation().pathname.split("/").pop();
  const fetchData = async () => {
    const { data } = await axios.get(`/api/chats/${chatId}`, {
      withCredentials: true,
    });
    return data;
  };
  const { isPending, error, data } = useQuery({
    queryKey: [chatId],
    queryFn: () => fetchData(),
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.role === "user" && "user"}`}
                >
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lgip={{ active: true, quality: 20 }}
                    ></IKImage>
                  )}
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              ))}

          {data && <NewPrompt data={data} />}
          <div ref={endRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

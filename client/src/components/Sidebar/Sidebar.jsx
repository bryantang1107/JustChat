import { Link } from "react-router-dom";
import "./sidebar.css";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios.js";

const Sidebar = () => {
  const fetchData = async () => {
    const { data } = await axios.get("/api/chats", {
      withCredentials: true,
    });
    return data;
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () => fetchData(),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Why BT Chat?</Link>
      <Link to="/">About BT Chat</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                <p className="chat-title">{chat.title}</p>
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Pro</span>
          <span>Unlock all models + increase rate limit</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "../../axios.js";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createNewChat = async (text) => {
    const { data } = await axios.post(
      "/api/chats",
      {
        text,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const mutation = useMutation({
    mutationFn: (text) => {
      return createNewChat(text);
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },

    onError: (error) => {
      console.log(error);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };
  return (
    <div className="dashboard">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>JustChat</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="chat" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="image" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="code" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

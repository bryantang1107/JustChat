import NewPrompt from "../../components/newPrompt/NewPrompt";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>BT Chat</h1>
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
      <NewPrompt />
    </div>
  );
};

export default Dashboard;

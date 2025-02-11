import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Why BT Chat?</Link>
      <Link to="/">About BT Chat</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to={`/dashboard/chats/test`}>TO</Link>
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

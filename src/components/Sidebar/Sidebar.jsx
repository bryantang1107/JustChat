import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/"></Link>
      <Link to="/"></Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
        <Link to={`/dashboard/chats/`}>TO</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Lama AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

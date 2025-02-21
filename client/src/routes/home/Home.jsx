import { Link } from "react-router-dom";
import "./home.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Home = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <>
      <section className="hero">
        <img src="/orbital.png" alt="" className="orbital" />
        <div className="left">
          <h1>JustChat</h1>
          <h2>Welcome to JustChat!</h2>
          <h3>
            🚀 Chat Smarter with AI - Your Personal Assistant Powered by Gemini!
          </h3>
          <Link to="/dashboard">Get Started</Link>
        </div>
        <div className="right"></div>
      </section>

      <section className="service">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="bot" className="bot" />
          <div className="chat">
            <img src={`/${typingStatus}.png`} alt="" />
            <TypeAnimation
              sequence={[
                "How to center a div?",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "`display: flex; justify-content: center; align-items: center; height: 100vh;`",
                1000,
                () => {
                  setTypingStatus("human2");
                },
                "How do I exit Vim?",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "`:q :q! :wq or :x`",
                1000,
                () => {
                  setTypingStatus("human2");
                },
                "Please help me to solve this problem!",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "Sure! Let me help you with that 😊",
                1000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              speed={50}
              omitDeletionAnimation={true}
              repeat={Infinity}
            />
          </div>
        </div>
      </section>

      <section className="footer">
        <img src="/logo.png" alt="logo" />
        <i className="copyright">© 2025 JustChat. All Rights Reserved.</i>
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy</Link>
        </div>
      </section>
    </>
  );
};

export default Home;

const About = () => {
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="texts">
            <div className="logo">
              <img src="/logo.png" alt="logo" />
              <h1>JustChat</h1>
            </div>
          </div>
          <div className="message">
            <p className="about">
              <b>JustChat</b> is a seamless, intelligent, and responsive AI chat
              experience powered by the Gemini open-source model.
            </p>
            <hr></hr>
            <p className="about">
              Designed for natural, engaging conversations, JustChat offers
              fast, accurate, and context-aware responses, making it the perfect
              companion for answering questions, brainstorming ideas, or simply
              chatting.
            </p>
            <p className="about">
              With intuitive experience, whether you&apos;re seeking knowledge
              or just having fun. No clutter, no hassle—just chat.
            </p>
            <p className="about">🚀 Experience the power of JustChat today!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

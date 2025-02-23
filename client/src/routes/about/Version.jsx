const Version = () => {
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
              <b>Version 1.1.0</b>
            </p>
            <hr></hr>
            <br></br>
            <b>🔄 Multi-Model Integration Support</b>
            <p className="about">
              Fine-Tuned AI Chat Model with Multi-Model Support Our AI-powered
              chat model is a highly optimized, fine-tuned conversational
              assistant designed to deliver fast, intelligent, and context-aware
              responses. It seamlessly integrates multiple Gemini models,
              allowing users to choose the best model for their needs: With
              dynamic model selection, users can tailor their experience based
              on speed, accuracy, and cost-effectiveness, ensuring the best
              AI-driven interactions for any use case.
            </p>
            <ul>
              <li>
                Gemini 1.5 Flash – Ultra-fast response times, ideal for
                real-time conversations.
              </li>
              <li>
                Gemini 1.5 Pro – Enhanced reasoning and accuracy for complex
                queries.
              </li>
              <li>
                Gemini 2.0 Lite – Cost-efficient and lightweight for scalable
                applications.
              </li>
              <li>
                Gemini 2.0 Flash – Optimized for low-latency, high-speed
                interactions.
              </li>
              <li>
                Gemini 2.0 Flash (Experimental) - Advanced reasoning with an
                explainable thought process.
              </li>
            </ul>
            <br></br>
            <p className="about">
              🚀 Experience the power of AI with flexible and intelligent model
              switching!
            </p>
            <br></br>
            <p className="about">
              <b>Version 1.0.0</b>
            </p>
            <hr></hr>
            <p className="about">
              <b>📸 Image Upload & Interpretation</b>
              <p className="about">
                Upload images, and JustChat will analyze and interpret them
                instantly! Whether it&apos;s a chart, a handwritten note, or a
                meme, JustChat provides insights, descriptions, and context
                effortlessly.
              </p>
              <p className="about">
                <b>💻 Programming Assistance</b>
                <p className="about">
                  Need help with code? JustChat can debug, optimize, and even
                  generate code in multiple programming languages. Whether
                  you&apos;re a beginner or an experienced developer, it&apos;s
                  your AI-powered coding companion.
                </p>
              </p>
              <p className="about">
                <b>✍️ Essay & Content Writing</b>
                <p className="about">
                  JustChat helps you craft high-quality essays, blog posts, and
                  creative content in seconds. Get structured, well-researched,
                  and engaging write-ups tailored to your needs.
                </p>
              </p>
            </p>
            <hr />
            <br></br>
            <p className="about">🚀 Experience the power of JustChat today!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Version;

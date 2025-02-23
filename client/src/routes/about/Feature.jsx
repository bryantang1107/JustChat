const Feature = () => {
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
              <h1>Coming soon!</h1>
            </p>
            <hr></hr>
            <br></br>
            <b>🔄 OpenAI Integration</b>
            <p className="about">
              Soon, JustChat will support OpenAI models, allowing users to
              choose the model that best fits their needs. Whether you want
              speed, depth, or creativity, you&apos;ll have the power to switch
              between different AI engines for a customized chat experience.
              Stay tuned! 🚀
            </p>
            <br></br>
          </div>
          <div className="message">
            <b>🚀 Paid Tier</b>
            <p className="about">
              Pro Features at an Affordable Price! We&apos;re introducing a Pro
              tier with premium AI capabilities at a budget-friendly price. Get
              access to faster response times, advanced models, and exclusive
              features—all without breaking the bank!
            </p>
            <ul>
              <li>Flexible Model Selection</li>
              <li>Enhanced AI Performance</li>
              <li>Cost-Effective Paid Plans</li>
            </ul>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;

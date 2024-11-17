import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ArrowUp from "./assets/arrow_up.svg";

const App: React.FC = () => {
  const [message, setMessage] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Append user message
    setMessage((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await axios.post("/api/chat", { message: input });
      // Append bot response
      setMessage((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "bot", content: response.data },
      ]);
    } catch (error) {
      console.error("Error: ", error);
      setMessage((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, an error occurred." },
      ]);
    }
    setInput("");
  };

  return (
    <div>
      <div className="navigation">
        <div id="chatgpt-logo">ChatGPT</div>
      </div>
      <div className="chat-container">
        {message.map((msg, index) => (
          <div key={index} className={`chat ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} disabled={!input.trim()}>
          <img src={ArrowUp} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default App;


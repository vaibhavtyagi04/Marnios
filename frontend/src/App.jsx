import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState("Standard");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = async (inputMessage) => {
    const textToSend = typeof inputMessage === 'string' ? inputMessage : message;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: "user", text: textToSend };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: `${persona} Mode: ${textToSend}`,
      });

      const botMsg = { role: "bot", text: res.data.response };
      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = { role: "bot", text: "CONNECTION_FAILURE: System offline." };
      setChat((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: "Architect", desc: "Plan structure & logic", prompt: "Help me architect a new software system." },
    { title: "Creative", desc: "Draft high-impact copy", prompt: "Write a compelling pitch for a cyberpunk novel." },
    { title: "Debugger", desc: "Identify deep bugs", prompt: "I have a memory leak in my Python app. Help me find it." }
  ];

  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        <div className="brand">Marnios.</div>
        
        <div className="nav-section">
          <span className="nav-label">Archive</span>
          <div className="session-item active">New Session</div>
          <div className="session-item">Architectural Review</div>
          <div className="session-item">Creative Brainstorm</div>
        </div>

        <div className="nav-section" style={{ marginTop: '40px' }}>
          <span className="nav-label">Settings</span>
          <div className="session-item">Preferences</div>
          <div className="session-item">API Status: <span style={{color: '#22c55e'}}>Live</span></div>
        </div>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <div className="persona-selector">
            {["Standard", "Architect", "Creative"].map(p => (
              <button 
                key={p} 
                className={`persona-btn ${persona === p ? 'active' : ''}`}
                onClick={() => setPersona(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="session-meta" style={{fontSize: '0.7rem', color: 'var(--text-dim)'}}>
            SESSION_ID: 4492-X
          </div>
        </div>

        <div className="chat-container">
          {chat.length === 0 && (
            <div className="welcome-screen">
              <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '10px'}}>How can we <br/> build today?</h1>
              <p style={{color: 'var(--text-dim)', marginBottom: '40px'}}>Marnios Cyber-Agent is active and ready for input.</p>
              
              <div className="quick-actions">
                {quickActions.map(action => (
                  <div key={action.title} className="action-card" onClick={() => sendMessage(action.prompt)}>
                    <h4>{action.title}</h4>
                    <p>{action.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {chat.map((msg, i) => (
            <div key={i} className={`message-row ${msg.role}-msg`}>
              <span className="msg-label">{msg.role}</span>
              <div className="msg-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-row bot-msg">
              <span className="msg-label">AI Agent</span>
              <div className="msg-bubble">
                <div className="loading-dots">
                  <div className="dot" style={{background: 'var(--accent-red)'}}></div>
                  <div className="dot" style={{background: 'var(--accent-red)'}}></div>
                  <div className="dot" style={{background: 'var(--accent-red)'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-wrapper">
          <form className="input-box" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
            <input
              className="chat-input"
              placeholder="Inject command..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button className="submit-btn" type="submit" disabled={loading}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;

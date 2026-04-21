# AI Chat Agent (React + FastAPI)

So this is a small project I built to understand how AI agents actually work behind the scenes.

The idea was simple:
👉 make a chat UI in React
👉 connect it to a FastAPI backend
👉 and plug in an AI model with a bit of memory

It’s not production-ready or anything fancy, but it’s a solid starting point if you want to build your own AI-powered apps.

---

## What it does

* Simple chat interface
* Sends messages to backend (FastAPI)
* Backend talks to AI model
* Keeps basic conversation history (so it doesn’t forget instantly)

---

## Tech used

Frontend:

* React
* Axios

Backend:

* FastAPI
* Python

AI:

* OpenAI API (you can swap this later if you want)

---

## Project structure (rough idea)

```id="s7k2jd"
ai-chat-agent/
│
├── backend/
│   ├── main.py
│   ├── agent.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/App.js
│   └── package.json
│
└── README.md
```

---

## How to run this locally

### 1. Clone the repo

```bash id="x1p8fa"
git clone https://github.com/your-username/ai-chat-agent.git
cd ai-chat-agent
```

---

### 2. Setup backend

```bash id="a9k3ld"
cd backend
pip install -r requirements.txt
```

Create a `.env` file and add your API key:

```id="m2l9df"
OPENAI_API_KEY=your_api_key_here
```

Run the server:

```bash id="b7q2nz"
uvicorn main:app --reload
```

---

### 3. Setup frontend

```bash id="k4z8tp"
cd frontend
npm install
npm start
```

---

## How it actually works (simple explanation)

* React sends your message → `/chat` API
* FastAPI receives it
* `agent.py` handles the logic
* Chat history is stored in a list (very basic memory)
* AI generates a reply
* Response goes back to React

That’s it.

---

## Things I know are missing 😅

* No user login
* No database (memory resets on restart)
* No streaming responses
* No proper error handling

---

## What I might add next

* User-based chat history (probably MongoDB)
* Better UI (current one is very basic)
* Streaming responses (like ChatGPT)
* Tool-based agent (search / file reading etc.)

---

## If you’re using this

Feel free to clone and modify it.
If you improve something, PRs are welcome 👍

---

## Note

Don’t push your `.env` file or API keys to GitHub. Learned that the hard way once.

---

That’s it 🙂

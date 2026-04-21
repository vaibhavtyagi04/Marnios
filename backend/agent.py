import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Simple in-memory chat history
chat_history = [
    {"role": "system", "content": "You are a helpful and intelligent AI agent. You remember previous context and provide concise, accurate answers."}
]

def chat_with_agent(user_input):
    global chat_history

    # Append user message
    chat_history.append({"role": "user", "content": user_input})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=chat_history
        )

        reply = response.choices[0].message.content

        # Append assistant response
        chat_history.append({"role": "assistant", "content": reply})

        return reply
    except Exception as e:
        return f"Error: {str(e)}"

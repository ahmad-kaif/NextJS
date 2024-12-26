'use client';

import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; role: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, role: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      const assistantMessage = { text: data.response, role: 'assistant' };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold my-6">Chat with GPT</h1>
      <div className="w-full max-w-2xl p-4 bg-gray-800 rounded">
        <div className="h-80 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded ${
                msg.role === 'user' ? 'bg-blue-500 text-right' : 'bg-gray-600 text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 bg-gray-700 rounded-l outline-none"
          />
          <button onClick={sendMessage} className="px-4 bg-blue-500 rounded-r hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

"use client";

import { useChat } from "@ai-sdk/react";
import { Input } from "./ui/input";

export function ChatSection() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className="flex flex-col w-full h-full p-4">
      <h2 className="heading mb-4 text-lg font-semibold">Assistant</h2>
      <div className="flex-grow overflow-y-auto mb-20 space-y-4 pr-2 flex-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`whitespace-pre-wrap rounded-lg px-4 py-3 ${
              message.role === "user"
                ? "bg-blue-100 dark:bg-blue-900 text-right ml-auto max-w-[80%]"
                : "bg-gray-100 dark:bg-gray-700 mr-auto max-w-[80%]"
            }`}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <span key={`${message.id}-part-${i}`}>{part.text}</span>
                  );
              }
              return null;
            })}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="relative mt-auto">
        <Input
          className="w-full max-w-4xl mx-auto p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg dark:bg-zinc-800 focus:outline-none"
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
        />
      </form>
    </section>
  );
}

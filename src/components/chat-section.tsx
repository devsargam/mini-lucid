"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/store/editor-state";
import { useEffect } from "react";

export function ChatSection() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { setValue } = useEditorState();

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange({
      target: { value: event.target.value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "assistant") {
      setValue(messages[messages.length - 1].content);
      console.log(messages[messages.length - 1].content);
    }
  }, [messages]);

  return (
    <section className="flex flex-col w-full h-full p-4">
      <h2 className="heading mb-4 text-lg font-semibold">Assistant</h2>
      <div className="flex-grow overflow-y-auto mb-20 space-y-4 pr-2 flex-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`whitespace-pre-wrap rounded-lg px-4 py-3 ${
              message.role === "user"
                ? "bg-blue-100 dark:bg-blue-900 text-left ml-auto max-w-[80%]"
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
      <form
        onSubmit={handleSubmit}
        className="relative mt-auto w-full max-w-4xl mx-auto"
      >
        <div className="relative flex items-end p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg dark:bg-zinc-800">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-2 bottom-2 flex-shrink-0 mr-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            aria-label="Use microphone"
          >
            <Mic className="w-5 h-5" />
          </Button>

          <Textarea
            value={input}
            onChange={handleTextareaChange}
            placeholder="Type a message..."
            className="flex-grow resize-none h-[100px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent p-0 pr-12 shadow-none dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            rows={2}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight + 36}px`;
            }}
          />

          <Button
            type="submit"
            variant={!!input.trim() ? "default" : "outline"}
            size="icon"
            className={cn(
              "absolute right-2 bottom-2 flex-shrink-0 rounded-md p-2",
              !input.trim() ? "text-zinc-500" : "text-white"
            )}
            aria-label="Send message"
            disabled={!input.trim()}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </section>
  );
}

"use client";

import { useState } from "react";
import { LOADING_STATES, EMPTY_STATES, PLACEHOLDERS } from "@/lib/copy/plain-language";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatPanelProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

/**
 * Coffee Chat Panel - Left side of the split-screen dashboard
 * Displays conversation history and message input
 */
export function ChatPanel({
  messages = [],
  onSendMessage,
  isLoading = false,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    onSendMessage?.(inputValue.trim());
    setInputValue("");
  };

  // Default welcome message if no messages
  const displayMessages = messages.length > 0 ? messages : [
    {
      id: "welcome",
      role: "assistant" as const,
      content: EMPTY_STATES.chatWelcome.message,
      timestamp: Date.now(),
    },
  ];

  return (
    <section className="w-full md:w-[35%] flex flex-col bg-surface-container-low border-r border-outline-variant/10">
      {/* Chat Header */}
      <header className="p-6 bg-surface-container-low flex justify-between items-center border-b border-outline-variant/5">
        <h1 className="text-xl font-headline font-bold text-on-surface">
          {EMPTY_STATES.chatWelcome.title}
        </h1>
        <button className="p-2 text-primary hover:bg-surface-container transition-colors rounded-full active:scale-90">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 max-w-[85%] ${
              message.role === "user" ? "flex-row-reverse ml-auto" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-primary"
                  : "bg-primary-container"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  message.role === "user"
                    ? "text-on-primary"
                    : "text-on-primary-container"
                }`}
              >
                {message.role === "user" ? "person" : "smart_toy"}
              </span>
            </div>

            {/* Message Bubble */}
            <div
              className={`rounded-2xl p-5 shadow-sm ${
                message.role === "user"
                  ? "bg-primary rounded-tr-none"
                  : "bg-surface-container rounded-tl-none"
              }`}
            >
              <p
                className={`leading-relaxed ${
                  message.role === "user"
                    ? "text-on-primary"
                    : "text-on-surface"
                }`}
              >
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 text-on-surface-variant italic text-sm">
            <span className="material-symbols-outlined animate-pulse">
              auto_awesome
            </span>
            <span>{LOADING_STATES.building}</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-surface-container-low">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
          <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden focus-within:ring-2 ring-primary/20 transition-all">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="w-full h-14 px-6 bg-transparent border-none focus:ring-0 text-on-surface disabled:opacity-50"
              placeholder={PLACEHOLDERS.chatInput[0]}
              type="text"
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="h-14 px-6 rounded-xl bg-primary text-on-primary font-bold flex items-center gap-2 hover:bg-primary-dim transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          >
            <span>Send</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </section>
  );
}

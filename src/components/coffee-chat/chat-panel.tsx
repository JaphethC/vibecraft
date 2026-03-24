"use client";

import { useState } from "react";
import { EMPTY_STATES } from "@/lib/copy/plain-language";
import { MessageList, type ChatMessage } from "./message-list";
import { MessageInput } from "./message-input";

interface ChatPanelProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

// Default welcome message from the AI agent
const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hi! What repetitive task is slowing you down today?",
  timestamp: Date.now(),
};

/**
 * Coffee Chat Panel - Left side of the split-screen dashboard
 * Manages conversation state and renders message list + input
 */
export function ChatPanel({
  messages,
  onSendMessage,
  isLoading = false,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim() || isLoading) return;

    onSendMessage?.(inputValue.trim());
    setInputValue("");
  };

  // Use provided messages or default to welcome message
  const displayMessages = messages && messages.length > 0 
    ? messages 
    : [DEFAULT_WELCOME_MESSAGE];

  return (
    <section className="w-full md:w-[35%] flex flex-col bg-surface-container-low border-r border-outline-variant/10">
      {/* Chat Header */}
      <header className="p-6 bg-surface-container-low flex justify-between items-center border-b border-outline-variant/5">
        <h1 className="text-xl font-headline font-bold text-on-surface">
          {EMPTY_STATES.chatWelcome.title}
        </h1>
        <button
          type="button"
          className="p-2 text-primary hover:bg-surface-container transition-colors rounded-full active:scale-90"
          aria-label="New chat"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Message List */}
      <MessageList messages={displayMessages} isLoading={isLoading} />

      {/* Message Input */}
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </section>
  );
}

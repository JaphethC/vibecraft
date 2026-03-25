"use client";

import { useState, useEffect, useRef } from "react";
import { LOADING_STATES } from "@/lib/copy/plain-language";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

/**
 * Message List - Renders the array of chat bubbles
 * Handles user vs. assistant styling and layout
 */
export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessagesRef = useRef<ChatMessage[]>([]);
  const prevLoadingRef = useRef<boolean>(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Only scroll if messages actually changed
    const messagesChanged = JSON.stringify(messages) !== JSON.stringify(prevMessagesRef.current);
    const loadingChanged = isLoading !== prevLoadingRef.current;
    
    if (messagesChanged || loadingChanged) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
    
    prevMessagesRef.current = messages;
    prevLoadingRef.current = isLoading;
  }, [messages, isLoading]);

  // Cycle through loading phrases every 2.5 seconds
  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % LOADING_STATES.thinking.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Loading Indicator - Shows one phrase at a time, cycling through */}
      {isLoading && (
        <div className="flex items-center gap-3 text-on-surface-variant italic text-sm">
          <span className="material-symbols-outlined animate-pulse">
            auto_awesome
          </span>
          <span>{LOADING_STATES.thinking[currentPhraseIndex]}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Individual Message Bubble
 * Handles user (right, primary color) vs. assistant (left, surface container) styling
 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-4 max-w-[85%] ${
        isUser ? "flex-row-reverse ml-auto" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-primary" : "bg-primary-container"
        }`}
      >
        <span
          className={`material-symbols-outlined ${
            isUser ? "text-on-primary" : "text-on-primary-container"
          }`}
        >
          {isUser ? "person" : "smart_toy"}
        </span>
      </div>

      {/* Message Bubble */}
      <div
        className={`rounded-2xl p-5 shadow-sm ${
          isUser
            ? "bg-primary rounded-tr-none"
            : "bg-surface-container rounded-tl-none"
        }`}
      >
        <p
          className={`leading-relaxed ${
            isUser ? "text-on-primary" : "text-on-surface"
          }`}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
}

/**
 * Format timestamp for display
 * Shows relative time (e.g., "Just now", "2 min ago")
 */
export function formatMessageTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }
}

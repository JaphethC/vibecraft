"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/coffee-chat/chat-panel";
import { CanvasPanel } from "@/components/live-canvas/canvas-panel";
import type { ChatMessage } from "@/components/coffee-chat/message-list";
import type { UIBlock } from "@/lib/schemas/ui-schema";

interface DashboardContentProps {
  userEmail: string;
}

export function DashboardContent({ userEmail }: DashboardContentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [schema, setSchema] = useState<UIBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // Add AI reply to chat
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Update canvas with new schema if provided
      if (data.ui_schema && data.ui_schema.length > 0) {
        setSchema(data.ui_schema);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Oops, I lost my train of thought. Could you try saying that again?",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Coffee Chat */}
      <ChatPanel
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />

      {/* Right Panel - Live Canvas */}
      <CanvasPanel schema={schema} isLoading={isLoading} />
    </div>
  );
}

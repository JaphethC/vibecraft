"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ChatPanel } from "@/components/coffee-chat/chat-panel";
import { CanvasPanel } from "@/components/live-canvas/canvas-panel";
import type { ChatMessage } from "@/components/coffee-chat/message-list";
import type { UIBlock } from "@/lib/schemas/ui-schema";

interface DashboardContentProps {
  userEmail: string;
  projectId?: string;
}

export function DashboardContent({ userEmail, projectId: initialProjectId }: DashboardContentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [schema, setSchema] = useState<UIBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState<Id<"projects"> | undefined>(
    initialProjectId as Id<"projects"> | undefined
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Convex mutations
  const createProject = useMutation(api.projects.createProject);
  const addChatMessage = useMutation(api.projects.addChatMessage);
  const updateAppSchema = useMutation(api.projects.updateAppSchema);

  // Load existing project data from Convex
  const projectData = useQuery(
    api.projects.getProjectWithMessages,
    projectId ? { projectId } : "skip"
  );

  // Initialize from Convex data when project loads
  useEffect(() => {
    if (projectData && !isInitialized) {
      // Convert Convex chat history to ChatMessage format
      const loadedMessages: ChatMessage[] = projectData.chatHistory.map((msg, index) => ({
        id: `${msg.role}-${index}-${msg.timestamp}`,
        role: msg.role as "user" | "assistant",
        content: msg.content,
        timestamp: msg.timestamp,
      }));

      setMessages(loadedMessages);
      
      // Load schema if it exists
      if (projectData.appSchema) {
        setSchema(projectData.appSchema as UIBlock[]);
      }
      
      setIsInitialized(true);
    }
  }, [projectData, isInitialized]);

  const handleSendMessage = async (content: string) => {
    // Add user message to chat immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Create project if this is the first message
      let currentProjectId = projectId;
      if (!currentProjectId) {
        // For MVP, using userEmail as userId placeholder
        const newProject = await createProject({
          userId: userEmail,
          projectName: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        });
        
        if (newProject) {
          currentProjectId = newProject._id;
          setProjectId(currentProjectId);
          
          // Update URL without reload
          window.history.pushState({}, "", `/dashboard/${currentProjectId}`);
        }
      }

      // Save user message to Convex
      if (currentProjectId) {
        await addChatMessage({
          projectId: currentProjectId,
          role: "user",
          content,
        });
      }

      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          projectId: currentProjectId,
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

      // Save AI message and schema to Convex
      if (currentProjectId) {
        await addChatMessage({
          projectId: currentProjectId,
          role: "assistant",
          content: data.reply,
        });

        // Update canvas with new schema if provided
        if (data.ui_schema && data.ui_schema.length > 0) {
          setSchema(data.ui_schema);
          await updateAppSchema({
            projectId: currentProjectId,
            appSchema: data.ui_schema,
          });
        }
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

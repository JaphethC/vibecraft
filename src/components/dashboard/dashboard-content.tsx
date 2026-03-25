"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ChatPanel } from "@/components/coffee-chat/chat-panel";
import { CanvasPanel } from "@/components/live-canvas/canvas-panel";
import type { ChatMessage } from "@/components/coffee-chat/message-list";
import type { UIBlock } from "@/lib/schemas/ui-schema";

interface DashboardContentProps {
  projectId?: string;
}

export function DashboardContent({ projectId: initialProjectId }: DashboardContentProps) {
  const { user, isLoaded } = useUser();
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
  const updateProjectName = useMutation(api.projects.updateProjectName);
  const updateProjectStatus = useMutation(api.projects.updateProjectStatus);

  const isExistingProject = Boolean(initialProjectId);

  // Reset state when switching between project routes and /dashboard
  useEffect(() => {
    const nextProjectId = initialProjectId as Id<"projects"> | undefined;

    setProjectId(nextProjectId);
    setIsInitialized(false);

    if (!nextProjectId) {
      setMessages([]);
      setSchema(null);
      setIsLoading(false);
    }
  }, [initialProjectId]);

  // Load existing project data from Convex
  const projectData = useQuery(
    api.projects.getProjectWithMessages,
    projectId ? { projectId } : "skip"
  );

  // Initialize from Convex only when reopening an existing project.
  // For brand-new chats, avoid overwriting optimistic local first message.
  useEffect(() => {
    if (!isExistingProject || !projectData || isInitialized) {
      return;
    }

    const loadedMessages: ChatMessage[] = projectData.chatHistory.map((msg, index) => ({
      id: `${msg.role}-${index}-${msg.timestamp}`,
      role: msg.role as "user" | "assistant",
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    setMessages(loadedMessages);

    if (projectData.appSchema) {
      setSchema(projectData.appSchema as UIBlock[]);
    }

    setIsInitialized(true);
  }, [isExistingProject, projectData, isInitialized]);

  const handleSendMessage = async (content: string, formData?: { values: Record<string, string>; buttonLabel: string }) => {
    // Don't send if user is not loaded yet
    if (!isLoaded || !user) {
      return;
    }

    // Add user message to chat immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: formData
        ? `I clicked "${formData.buttonLabel}" with: ${Object.entries(formData.values).map(([k, v]) => `${k}: ${v}`).join(", ")}`
        : content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Track project ID across try/catch
    let currentProjectId = projectId;

    try {
      // Create project if this is the first message
      if (!currentProjectId) {
        // Use actual Clerk user ID
        const newProject = await createProject({
          userId: user.id,
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
          content: userMessage.content,
        });
      }

      // Call the API - include full conversation history for context and project context for refinement
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: formData
            ? `The user submitted the form with these values: ${JSON.stringify(formData.values)}. Please process this and update the UI with the result.`
            : content,
          // Send full conversation history (excluding the welcome message)
          messages: messages
            .filter((msg) => msg.id !== "welcome")
            .map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          projectId: currentProjectId,
          // Include project context for refinement requests
          projectContext: currentProjectId && projectData
            ? {
                projectName: projectData.projectName,
                currentSchema: projectData.appSchema || undefined,
              }
            : undefined,
          formSubmission: formData ? { values: formData.values } : undefined,
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

      // Save AI message and schema to Convex (in order)
      if (currentProjectId) {
        // First, save the chat message
        await addChatMessage({
          projectId: currentProjectId,
          role: "assistant",
          content: data.reply,
        });

        // Update project status based on AI response
        if (data.status === "needs_clarification") {
          await updateProjectStatus({
            projectId: currentProjectId,
            status: "needs_clarification",
          });
        } else if (data.status === "generation_failed") {
          await updateProjectStatus({
            projectId: currentProjectId,
            status: "generation_failed",
          });
        } else if (data.status === "stable") {
          // Only update to active if we have a valid schema
          if (data.ui_schema && data.ui_schema.length > 0) {
            await updateProjectStatus({
              projectId: currentProjectId,
              status: "active",
            });
          }
        }

        // Update canvas with new schema if provided
        if (data.ui_schema && data.ui_schema.length > 0) {
          setSchema(data.ui_schema);
          await updateAppSchema({
            projectId: currentProjectId,
            appSchema: data.ui_schema,
          });
        }

        // Update project name if AI suggests a better one
        if (data.projectName && data.projectName !== projectData?.projectName) {
          await updateProjectName({
            projectId: currentProjectId,
            projectName: data.projectName,
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

      // Update project status to needs_clarification on error
      if (currentProjectId) {
        await updateProjectStatus({
          projectId: currentProjectId,
          status: "needs_clarification",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (formData: { values: Record<string, string>; buttonLabel: string }) => {
    // Form submission is handled by handleSendMessage with formData
    handleSendMessage("", formData);
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
      <CanvasPanel schema={schema} isLoading={isLoading} onSubmit={handleFormSubmit} />
    </div>
  );
}

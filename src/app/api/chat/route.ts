import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/ai/system-prompt";
import { callOpenRouter } from "@/lib/ai/openrouter";
import { chatRequestSchema, ChatResponse } from "@/lib/schemas/chat-route";

/**
 * POST /api/chat
 * 
 * Handles chat messages and returns AI responses with UI schema.
 * Uses blocking OpenRouter request (no streaming) for reliable JSON parsing.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const parsedRequest = chatRequestSchema.parse(body);

    const { message, messages: conversationHistory, formSubmission } = parsedRequest;

    // Build conversation history for the AI
    const systemPrompt = getSystemPrompt();

    // Add form submission context to the system prompt if present
    const enhancedSystemPrompt = formSubmission
      ? `${systemPrompt}\n\nIMPORTANT: The user has submitted a form with the following values: ${JSON.stringify(formSubmission.values)}. Process these values and provide a result. Update the UI schema to show the calculation result or next step.`
      : systemPrompt;

    // Build messages array: system prompt + conversation history (if provided) + latest message
    const apiMessages = [
      {
        role: "system" as const,
        content: enhancedSystemPrompt,
      },
      // Include conversation history if provided (for context continuity)
      ...(conversationHistory || []).map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      // Always include the latest message
      {
        role: "user" as const,
        content: message,
      },
    ];

    // Call OpenRouter with blocking request
    const openRouterResponse = await callOpenRouter({
      messages: apiMessages,
      apiKey: process.env.OPENROUTER_API_KEY || "",
    });

    // Return the validated response
    const response: ChatResponse = {
      reply: openRouterResponse.reply,
      ui_schema: openRouterResponse.ui_schema,
      status: "stable",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("API chat error:", error);

    // Return friendly error response
    return NextResponse.json({
      reply: "Oops, I lost my train of thought. Could you try saying that again?",
      ui_schema: [],
      status: "needs_clarification",
    } as ChatResponse);
  }
}

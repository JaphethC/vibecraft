import {
  safeParseOpenRouterResponse,
  validateUISchema,
} from "@/lib/schemas/chat-route";
import {
  parseOpenRouterResponse,
  createFriendlyErrorResponse,
  createClarificationResponse,
  createGenerationFailedResponse,
} from "./openrouter";
import type { ChatResponse, OpenRouterResponse } from "@/lib/schemas/chat-route";

/**
 * Process raw OpenRouter response with comprehensive error handling
 * 
 * This is the main entry point for handling AI responses in the /api/chat route.
 * It handles:
 * - Markdown code block stripping
 * - JSON parsing errors
 * - Schema validation
 * - Friendly error messages
 */
export function processOpenRouterResponse(
  rawContent: string,
  userMessage: string
): ChatResponse {
  try {
    // Parse the raw response (handles markdown stripping)
    const parsed = parseOpenRouterResponse(rawContent);

    // Validate the UI schema if present
    if (parsed.ui_schema && parsed.ui_schema.length > 0) {
      try {
        validateUISchema(parsed.ui_schema);
      } catch (schemaError) {
        console.error("UI schema validation failed:", schemaError);
        // Return the reply but discard invalid schema
        return {
          reply: parsed.reply,
          ui_schema: [],
          status: "needs_clarification",
        };
      }
    }

    // Success! Return the parsed response
    return {
      reply: parsed.reply,
      ui_schema: parsed.ui_schema,
      status: "stable",
    };
  } catch (parseError) {
    console.error("Failed to parse OpenRouter response:", parseError);

    // If the error mentions missing keys, try to salvage what we can
    const errorMessage =
      parseError instanceof Error ? parseError.message : String(parseError);

    if (errorMessage.includes("reply")) {
      // AI didn't include reply - ask for clarification
      return createClarificationResponse(userMessage);
    }

    // Generic parsing failure
    return createGenerationFailedResponse();
  }
}

/**
 * Handle API-level errors (network, timeout, auth, etc.)
 * Returns a friendly error response for the user
 */
export function handleApiError(error: unknown): ChatResponse {
  console.error("API error:", error);

  // Check for specific error types
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Network/timeout errors
    if (
      message.includes("fetch") ||
      message.includes("network") ||
      message.includes("timeout") ||
      message.includes("connection")
    ) {
      return createFriendlyErrorResponse();
    }

    // Authentication errors
    if (
      message.includes("auth") ||
      message.includes("unauthorized") ||
      message.includes("api key")
    ) {
      return {
        reply: "I'm having trouble connecting right now. Please try again in a moment!",
        ui_schema: [],
        status: "generation_failed",
      };
    }

    // Rate limiting
    if (message.includes("rate limit") || message.includes("too many")) {
      return {
        reply: "I'm getting a bit overwhelmed! Let me catch my breath and try again in a second.",
        ui_schema: [],
        status: "needs_clarification",
      };
    }
  }

  // Default fallback
  return createFriendlyErrorResponse();
}

/**
 * Safe wrapper for the entire OpenRouter flow
 * Use this in your API route for maximum safety
 */
export async function safeCallOpenRouter(params: {
  callOpenRouter: () => Promise<string>;
  userMessage: string;
}): Promise<ChatResponse> {
  try {
    const rawContent = await params.callOpenRouter();
    return processOpenRouterResponse(rawContent, params.userMessage);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Extract plain text reply from OpenRouter response
 * Useful for chat history where you only need the text
 */
export function extractReplyFromResponse(
  rawContent: string
): string | null {
  try {
    const parsed = parseOpenRouterResponse(rawContent);
    return parsed.reply;
  } catch {
    return null;
  }
}

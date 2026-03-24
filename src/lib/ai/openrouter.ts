import { OpenRouterResponse, ChatResponse } from "@/lib/schemas/chat-route";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Call OpenRouter API with a blocking request (no streaming)
 * Returns the complete response or throws an error
 */
export async function callOpenRouter(params: {
  messages: Array<{ role: string; content: string }>;
  apiKey: string;
}): Promise<OpenRouterResponse> {
  const { messages, apiKey } = params;

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "VibeCraft",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku", // Fast, cost-effective for MVP
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `OpenRouter API error (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Extract the assistant's message content
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content in OpenRouter response");
  }

  // Parse the JSON response (handles markdown code blocks)
  return parseOpenRouterResponse(content);
}

/**
 * Parse OpenRouter response, handling markdown code blocks
 * Strips ```json and ``` wrappers if present
 */
export function parseOpenRouterResponse(content: string): OpenRouterResponse {
  // Strip markdown code blocks if present
  let jsonContent = content.trim();

  // Remove ```json or ``` at the start
  jsonContent = jsonContent.replace(/^```(?:json)?\s*/, "");
  // Remove ``` at the end
  jsonContent = jsonContent.replace(/\s*```$/, "");

  // Parse the JSON
  const parsed = JSON.parse(jsonContent);

  // Validate the structure
  if (!parsed.reply || !parsed.ui_schema) {
    throw new Error(
      "Invalid response format: must have 'reply' and 'ui_schema' keys"
    );
  }

  return {
    reply: String(parsed.reply),
    ui_schema: Array.isArray(parsed.ui_schema) ? parsed.ui_schema : [],
  };
}

/**
 * Create a friendly error response when the API fails
 * Used for timeouts, connection errors, or parsing failures
 */
export function createFriendlyErrorResponse(): ChatResponse {
  return {
    reply: "Oops, I lost my train of thought. Could you try saying that again? Sometimes I need a moment to catch up!",
    ui_schema: [],
    status: "needs_clarification",
  };
}

/**
 * Create a clarification response when the AI couldn't understand the request
 */
export function createClarificationResponse(userMessage: string): ChatResponse {
  return {
    reply: `Hmm, I want to make sure I understand correctly. Could you tell me a bit more about "${userMessage.slice(0, 50)}${userMessage.length > 50 ? "..." : ""}"? What kind of information or steps would help you with this?`,
    ui_schema: [],
    status: "needs_clarification",
  };
}

/**
 * Create a generation failed response
 */
export function createGenerationFailedResponse(): ChatResponse {
  return {
    reply: "I had trouble putting that together. Let's try a different approach - could you describe what you need in simpler terms? For example, what information would you write down on paper if you were doing this by hand?",
    ui_schema: [],
    status: "generation_failed",
  };
}

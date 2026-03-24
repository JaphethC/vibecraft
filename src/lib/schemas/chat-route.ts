import { z } from "zod";
import { uiSchemaSchema } from "./ui-schema";

// =============================================================================
// Chat Route Request Schema
// What the client sends to /api/chat
// =============================================================================

export const chatRequestSchema = z.object({
  projectId: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  formSubmission: z
    .object({
      values: z.record(z.string()),
    })
    .optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// =============================================================================
// Chat Route Response Schema
// What /api/chat returns to the client
// =============================================================================

export const chatResponseSchema = z.object({
  reply: z.string().min(1, "Reply is required"),
  ui_schema: uiSchemaSchema.optional(),
  status: z
    .enum(["stable", "needs_clarification", "generation_failed"])
    .default("stable"),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// =============================================================================
// OpenRouter AI Response Schema
// The exact format we instruct the AI to return
// CRITICAL: Must have exactly two keys: reply and ui_schema
// =============================================================================

export const openRouterResponseSchema = z.object({
  reply: z.string().min(1, "Assistant reply is required"),
  ui_schema: uiSchemaSchema,
});

export type OpenRouterResponse = z.infer<typeof openRouterResponseSchema>;

// =============================================================================
// Validation Helpers
// =============================================================================

/**
 * Validate and parse a chat request
 */
export function validateChatRequest(data: unknown): ChatRequest {
  return chatRequestSchema.parse(data);
}

/**
 * Validate and parse a chat response
 */
export function validateChatResponse(data: unknown): ChatResponse {
  return chatResponseSchema.parse(data);
}

/**
 * Validate and parse UI schema from AI
 */
export function validateUISchema(data: unknown) {
  return uiSchemaSchema.parse(data);
}

/**
 * Safely parse AI response (returns errors instead of throwing)
 */
export function safeParseOpenRouterResponse(
  data: unknown
): { success: boolean; data?: OpenRouterResponse; error?: string } {
  const result = openRouterResponseSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map((e: { message: string }) => e.message).join(", "),
    };
  }
  return { success: true, data: result.data };
}

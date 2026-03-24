import { z } from "zod";

// =============================================================================
// UI Schema Block Types
// Strict validation for dynamic canvas components
// 
// Note: For the 2-day MVP, we use a simplified schema without recursive card
// validation. Cards can contain children but validation is lenient for now.
// =============================================================================

/**
 * Base block properties shared by all block types
 */
const baseBlockSchema = z.object({
  id: z.string().optional(),
});

/**
 * Title block - displays a section heading
 * Example: { type: "title", content: "Sheet Metal Calculator" }
 */
export const titleBlockSchema = baseBlockSchema.extend({
  type: z.literal("title"),
  content: z.string().min(1, "Title content is required"),
});

/**
 * Text block - displays descriptive paragraph text
 * Example: { type: "text", content: "Enter your specifications below" }
 */
export const textBlockSchema = baseBlockSchema.extend({
  type: z.literal("text"),
  content: z.string().min(1, "Text content is required"),
});

/**
 * Input block - displays a text/number input field
 * Example: { type: "input", label: "Thickness (mm)", placeholder: "2.5" }
 */
export const inputBlockSchema = baseBlockSchema.extend({
  type: z.literal("input"),
  label: z.string().min(1, "Input label is required"),
  placeholder: z.string().optional(),
});

/**
 * Dropdown block - displays a select dropdown with options
 * Example: { type: "dropdown", label: "Material", options: ["Aluminum", "Steel", "Copper"] }
 */
export const dropdownBlockSchema = baseBlockSchema.extend({
  type: z.literal("dropdown"),
  label: z.string().min(1, "Dropdown label is required"),
  options: z.array(z.string()).min(1, "At least one option is required"),
});

/**
 * Button block - displays an action button
 * Example: { type: "button", label: "Calculate Quote" }
 */
export const buttonBlockSchema = baseBlockSchema.extend({
  type: z.literal("button"),
  label: z.string().min(1, "Button label is required"),
});

/**
 * Card block - displays a container with nested child blocks
 * For MVP: children are stored as any[] to avoid recursive type issues
 * Example: { type: "card", children: [...blocks] }
 */
export const cardBlockSchema = baseBlockSchema.extend({
  type: z.literal("card"),
  children: z.array(z.any()),
});

/**
 * Union of all supported block types
 */
export const uiBlockSchema = z.discriminatedUnion("type", [
  titleBlockSchema,
  textBlockSchema,
  inputBlockSchema,
  dropdownBlockSchema,
  buttonBlockSchema,
  cardBlockSchema,
]);

export type UIBlock = z.infer<typeof uiBlockSchema>;
export type TitleBlock = z.infer<typeof titleBlockSchema>;
export type TextBlock = z.infer<typeof textBlockSchema>;
export type InputBlock = z.infer<typeof inputBlockSchema>;
export type DropdownBlock = z.infer<typeof dropdownBlockSchema>;
export type ButtonBlock = z.infer<typeof buttonBlockSchema>;
export type CardBlock = z.infer<typeof cardBlockSchema>;
export type BlockType = UIBlock["type"];

// =============================================================================
// UI Schema - Complete Canvas Layout
// =============================================================================

/**
 * Complete UI schema - array of blocks that define the canvas layout
 */
export const uiSchemaSchema = z.array(uiBlockSchema);

export type UISchema = z.infer<typeof uiSchemaSchema>;

// =============================================================================
// Validation Helpers
// =============================================================================

/**
 * Validate a single UI block
 */
export function validateBlock(data: unknown): UIBlock {
  return uiBlockSchema.parse(data);
}

/**
 * Safely validate a single UI block (returns result object)
 */
export function safeValidateBlock(
  data: unknown
): { success: boolean; data?: UIBlock; error?: string } {
  const result = uiBlockSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map((e: { message: string }) => e.message).join(", "),
    };
  }
  return { success: true, data: result.data };
}

/**
 * Validate complete UI schema
 */
export function validateUISchema(data: unknown): UISchema {
  return uiSchemaSchema.parse(data);
}

/**
 * Safely validate complete UI schema (returns result object)
 */
export function safeValidateUISchema(
  data: unknown
): { success: boolean; data?: UISchema; error?: string } {
  const result = uiSchemaSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map((e: { message: string }) => e.message).join(", "),
    };
  }
  return { success: true, data: result.data };
}

/**
 * Get all supported block types
 */
export const SUPPORTED_BLOCK_TYPES: BlockType[] = [
  "title",
  "text",
  "input",
  "dropdown",
  "button",
  "card",
];

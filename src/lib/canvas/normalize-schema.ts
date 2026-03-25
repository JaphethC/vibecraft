import { SUPPORTED_BLOCK_TYPES, type UIBlock } from "@/lib/schemas/ui-schema";

/**
 * Default values for each block type
 * Used when required fields are missing
 */
const DEFAULT_VALUES: Record<string, unknown> = {
  title: { content: "Section Title" },
  text: { content: "Description text goes here." },
  input: { label: "Enter value", placeholder: "Type here..." },
  dropdown: { label: "Select option", options: ["Option 1", "Option 2", "Option 3"] },
  button: { label: "Submit" },
  card: { children: [] },
};

/**
 * Supported block types as a Set for fast lookup
 */
const SUPPORTED_TYPES_SET = new Set<string>(SUPPORTED_BLOCK_TYPES);

/**
 * Normalize a single UI block
 * - Ensures required fields exist with safe defaults
 * - Filters out dangerous or unsupported data
 * - Returns null for blocks that can't be salvaged
 */
export function normalizeBlock(block: unknown): UIBlock | null {
  // Must be an object
  if (!block || typeof block !== "object") {
    return null;
  }

  const blockObj = block as Record<string, unknown>;
  const blockType = blockObj.type as string;

  // Check if type is supported
  if (!blockType || !SUPPORTED_TYPES_SET.has(blockType)) {
    // Unknown block type - convert to text block with description
    console.warn(`Unknown block type "${blockType}", converting to text block`);
    return {
      type: "text",
      content: `[Unsupported block: ${blockType || "unknown"}] This feature isn't available yet.`,
    } as UIBlock;
  }

  // Normalize based on block type
  switch (blockType) {
    case "title":
      return normalizeTitleBlock(blockObj);
    case "text":
      return normalizeTextBlock(blockObj);
    case "input":
      return normalizeInputBlock(blockObj);
    case "dropdown":
      return normalizeDropdownBlock(blockObj);
    case "button":
      return normalizeButtonBlock(blockObj);
    case "card":
      return normalizeCardBlock(blockObj);
    default:
      // Should never reach here due to type check above
      return null;
  }
}

/**
 * Normalize title block
 * Required: content (string)
 */
function normalizeTitleBlock(block: Record<string, unknown>): UIBlock {
  const content = typeof block.content === "string" && block.content.trim()
    ? block.content.trim()
    : (DEFAULT_VALUES.title as { content: string }).content;

  return {
    type: "title",
    content,
  };
}

/**
 * Normalize text block
 * Required: content (string)
 */
function normalizeTextBlock(block: Record<string, unknown>): UIBlock {
  const content = typeof block.content === "string" && block.content.trim()
    ? block.content.trim()
    : (DEFAULT_VALUES.text as { content: string }).content;

  return {
    type: "text",
    content,
  };
}

/**
 * Normalize input block
 * Required: label (string)
 * Optional: placeholder (string)
 */
function normalizeInputBlock(block: Record<string, unknown>): UIBlock {
  const label = typeof block.label === "string" && block.label.trim()
    ? block.label.trim()
    : (DEFAULT_VALUES.input as { label: string }).label;

  const placeholder = typeof block.placeholder === "string"
    ? block.placeholder
    : (DEFAULT_VALUES.input as { label: string; placeholder: string }).placeholder;

  return {
    type: "input",
    label,
    placeholder,
  };
}

/**
 * Normalize dropdown block
 * Required: label (string), options (array of strings)
 */
function normalizeDropdownBlock(block: Record<string, unknown>): UIBlock {
  const label = typeof block.label === "string" && block.label.trim()
    ? block.label.trim()
    : (DEFAULT_VALUES.dropdown as { label: string; options: string[] }).label;

  let options: string[];
  if (Array.isArray(block.options) && block.options.length > 0) {
    options = block.options
      .map((opt) => typeof opt === "string" ? opt.trim() : String(opt))
      .filter((opt) => opt.length > 0);
    
    if (options.length === 0) {
      options = (DEFAULT_VALUES.dropdown as { label: string; options: string[] }).options;
    }
  } else {
    options = (DEFAULT_VALUES.dropdown as { label: string; options: string[] }).options;
  }

  return {
    type: "dropdown",
    label,
    options,
  };
}

/**
 * Normalize button block
 * Required: label (string)
 */
function normalizeButtonBlock(block: Record<string, unknown>): UIBlock {
  const label = typeof block.label === "string" && block.label.trim()
    ? block.label.trim()
    : (DEFAULT_VALUES.button as { label: string }).label;

  return {
    type: "button",
    label,
  };
}

/**
 * Normalize card block
 * Required: children (array of blocks)
 * Recursively normalizes child blocks
 */
function normalizeCardBlock(block: Record<string, unknown>): UIBlock {
  let children: UIBlock[] = [];

  if (Array.isArray(block.children)) {
    children = block.children
      .map((child) => normalizeBlock(child))
      .filter((child): child is UIBlock => child !== null);
  }

  return {
    type: "card",
    children,
  };
}

/**
 * Normalize complete UI schema
 * - Filters out invalid blocks
 * - Applies safe defaults to blocks with missing fields
 * - Converts unsupported block types to text
 * - Ensures the result is always safe to render
 */
export function normalizeUISchema(schema: unknown): UIBlock[] {
  // Must be an array
  if (!Array.isArray(schema)) {
    console.warn("UI schema is not an array, returning empty array");
    return [];
  }

  // Normalize each block and filter out nulls
  const normalized = schema
    .map((block) => normalizeBlock(block))
    .filter((block): block is UIBlock => block !== null);

  return normalized;
}

/**
 * Check if a UI schema is empty or contains only placeholder blocks
 * Used to determine if we should show the canvas or an empty state
 */
export function isUISchemaEmpty(schema: UIBlock[]): boolean {
  if (!schema || schema.length === 0) {
    return true;
  }

  // Check if all blocks are just placeholders
  const hasMeaningfulContent = schema.some((block) => {
    if (block.type === "card") {
      return !isUISchemaEmpty(block.children);
    }
    return true; // Any non-card block is meaningful
  });

  return !hasMeaningfulContent;
}

/**
 * Get a human-readable description of what blocks are in the schema
 * Useful for debugging and logging
 */
export function describeUISchema(schema: UIBlock[]): string {
  if (!schema || schema.length === 0) {
    return "Empty schema";
  }

  const blockCounts: Record<string, number> = {};
  
  function countBlocks(blocks: UIBlock[]) {
    blocks.forEach((block) => {
      blockCounts[block.type] = (blockCounts[block.type] || 0) + 1;
      if (block.type === "card" && block.children.length > 0) {
        countBlocks(block.children);
      }
    });
  }

  countBlocks(schema);

  return Object.entries(blockCounts)
    .map(([type, count]) => `${count} ${type}${count > 1 ? "s" : ""}`)
    .join(", ");
}

/**
 * Extract all button blocks from a schema
 * Useful for setting up action handlers
 */
export function extractButtons(schema: UIBlock[]): Array<{ label: string; path?: string }> {
  const buttons: Array<{ label: string; path?: string }> = [];

  function findButtons(blocks: UIBlock[], path: string = "") {
    blocks.forEach((block, index) => {
      const currentPath = path ? `${path}.${index}` : `${index}`;
      
      if (block.type === "button") {
        buttons.push({ label: block.label, path: currentPath });
      } else if (block.type === "card" && block.children.length > 0) {
        findButtons(block.children, currentPath);
      }
    });
  }

  findButtons(schema);
  return buttons;
}

/**
 * Extract all input and dropdown blocks from a schema
 * Useful for form handling
 */
export function extractFormFields(schema: UIBlock[]): Array<{
  type: "input" | "dropdown";
  label: string;
  path?: string;
  options?: string[];
}> {
  const fields: Array<{
    type: "input" | "dropdown";
    label: string;
    path?: string;
    options?: string[];
  }> = [];

  function findFields(blocks: UIBlock[], path: string = "") {
    blocks.forEach((block, index) => {
      const currentPath = path ? `${path}.${index}` : `${index}`;
      
      if (block.type === "input" || block.type === "dropdown") {
        fields.push({
          type: block.type,
          label: block.label,
          path: currentPath,
          ...(block.type === "dropdown" && { options: block.options }),
        });
      } else if (block.type === "card" && block.children.length > 0) {
        findFields(block.children, currentPath);
      }
    });
  }

  findFields(schema);
  return fields;
}

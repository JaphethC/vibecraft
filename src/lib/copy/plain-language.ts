/**
 * VibeCraft Plain-Language Copy
 * 
 * All user-facing messages must follow the Zero-Tech-Jargon Rule:
 * - No mentions of: database, API, JSON, schema, code, programming, backend, frontend, deployment
 * - Use friendly, conversational language
 * - Be forgiving when errors occur
 * - Speak in terms of work, tasks, forms, and tools
 */

// =============================================================================
// Empty States
// =============================================================================

export const EMPTY_STATES = {
  // Canvas empty state (no tool built yet)
  canvas: {
    title: "Your tool will appear here",
    description: "Describe a repetitive task or workflow in the chat, and I'll build a tool to help you.",
  },

  // Chat empty state (no conversation yet)
  chatWelcome: {
    title: "Tell me about your workflow",
    message: "Hi! What repetitive task is slowing you down today?",
  },

  // Project list empty state
  noProjects: {
    title: "No projects yet",
    description: "Start a new conversation to create your first tool.",
  },

  // History empty state
  noHistory: {
    title: "No history yet",
    description: "Your past conversations will appear here.",
  },
} as const;

// =============================================================================
// Loading States
// =============================================================================

export const LOADING_STATES = {
  // AI is thinking about response
  thinking: [
    "Thinking...",
    "Drafting your tool...",
    "Making adjustments...",
    "Putting that together...",
    "Working on it...",
  ],

  // Building the UI schema
  building: [
    "Building your tool...",
    "Creating your form...",
    "Setting up your calculator...",
    "Preparing your workspace...",
  ],

  // Updating existing tool
  updating: [
    "Making those changes...",
    "Updating your tool...",
    "Adjusting the layout...",
    "Refining your design...",
  ],

  // Saving progress
  saving: [
    "Saving your work...",
    "Remembering this...",
    "Keeping track of this...",
  ],

  // Generic loading (fallback)
  generic: "One moment...",
} as const;

// =============================================================================
// Error States
// =============================================================================

export const ERROR_STATES = {
  // API/Connection errors (friendly, no technical details)
  connection: {
    title: "Oops, I lost my train of thought",
    message: "Could you try saying that again? Sometimes I need a moment to catch up!",
  },

  // Parsing/Understanding errors
  understanding: {
    title: "Hmm, I want to make sure I understand",
    message: "Could you tell me a bit more about that? What information or steps would help you with this?",
  },

  // Generation failed
  generationFailed: {
    title: "I had trouble putting that together",
    message: "Let's try a different approach - could you describe what you need in simpler terms? For example, what would you write down on paper if you were doing this by hand?",
  },

  // Missing information
  needsClarification: {
    title: "I need a bit more information",
    message: "Could you give me an example of how this would work in your daily routine?",
  },

  // Rate limiting (too many requests)
  rateLimited: {
    title: "I'm getting a bit overwhelmed",
    message: "Let me catch my breath and try again in a second!",
  },

  // Authentication issues
  auth: {
    title: "I'm having trouble connecting",
    message: "Please try again in a moment!",
  },

  // Generic error (fallback)
  generic: {
    title: "Something went wrong",
    message: "Let's try that again!",
  },
} as const;

// =============================================================================
// Recovery States
// =============================================================================

export const RECOVERY_STATES = {
  // AI needs more information to proceed
  clarification: {
    title: "I need a bit more information",
    message: "Could you give me an example of how this would work in your daily routine? The more details you share, the better I can help!",
  },

  // Generation failed - preserve last stable state
  generationFailed: {
    title: "I had trouble putting that together",
    message: "Let's try a different approach - could you describe what you need in simpler terms? For example, what would you write down on paper if you were doing this by hand?",
  },

  // Empty state - no tool yet
  empty: {
    title: "Your tool will appear here",
    message: "Describe a repetitive task or workflow in the chat, and I'll build a tool to help you.",
  },
} as const;

// =============================================================================
// Success States
// =============================================================================

export const SUCCESS_STATES = {
  // Tool created successfully
  toolCreated: {
    title: "Here's your tool!",
    message: "I've put together something based on what you described. Take a look and let me know if you'd like any changes!",
  },

  // Changes saved
  changesSaved: {
    message: "Got it! I've updated your tool.",
  },

  // Project created
  projectCreated: {
    message: "Perfect! I've started a new project for you.",
  },
} as const;

// =============================================================================
// Input Placeholders
// =============================================================================

export const PLACEHOLDERS = {
  // Chat input
  chatInput: [
    "Explain your needs...",
    "Describe your task...",
    "Tell me what you're working on...",
    "What would help you today?",
  ],

  // Generic text input
  textInput: "Type here...",

  // Search
  search: "Search...",
} as const;

// =============================================================================
// Button Labels
// =============================================================================

export const BUTTONS = {
  // Primary actions
  send: "Send",
  submit: "Submit",
  save: "Save",
  create: "Create",
  start: "Get Started",

  // Secondary actions
  cancel: "Cancel",
  retry: "Try Again",
  edit: "Edit",
  delete: "Delete",

  // Navigation
  back: "Go Back",
  next: "Next",
  continue: "Continue",

  // Tool-specific
  calculate: "Calculate",
  add: "Add",
  remove: "Remove",
} as const;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get a random loading message to keep the experience fresh
 */
export function getRandomLoadingMessage(type: keyof typeof LOADING_STATES = "thinking"): string {
  const messages = LOADING_STATES[type];
  if (Array.isArray(messages)) {
    return messages[Math.floor(Math.random() * messages.length)];
  }
  return messages as string;
}

/**
 * Get a random placeholder text
 */
export function getRandomPlaceholder(): string {
  const placeholders = PLACEHOLDERS.chatInput;
  return placeholders[Math.floor(Math.random() * placeholders.length)];
}

/**
 * Check if a message contains technical jargon (for validation)
 */
export const FORBIDDEN_TERMS = [
  "api",
  "database",
  "json",
  "schema",
  "code",
  "programming",
  "backend",
  "frontend",
  "deployment",
  "server",
  "client",
  "endpoint",
  "query",
  "mutation",
  "payload",
  "response",
  "request",
  "fetch",
  "http",
  "rest",
  "graphql",
  "sql",
  "nosql",
  "mongodb",
  "postgresql",
  "typescript",
  "javascript",
  "react",
  "component",
  "props",
  "state",
  "hook",
  "render",
];

export function containsJargon(text: string): boolean {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_TERMS.some((term) => lowerText.includes(term));
}

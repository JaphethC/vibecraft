# Implementation Plan: Workflow AI Builder

**Branch**: `002-workflow-ai-builder` | **Date**: 2026-03-24 | **Spec**: [/home/japhethcampbell/Vibe/vibe-the-gap/specs/002-workflow-ai-builder/spec.md](/home/japhethcampbell/Vibe/vibe-the-gap/specs/002-workflow-ai-builder/spec.md)
**Input**: Feature specification from `/specs/002-workflow-ai-builder/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a genuinely functional 2-day hackathon MVP for VibeCraft where a user signs in, describes any industry
workflow in Coffee Chat, receives a plain-language assistant response plus a strict JSON UI schema from OpenRouter,
and sees a rendered working tool appear in Live Canvas. The implementation will favor a narrow, stable component
contract, a protected `/dashboard` experience, a single `/api/chat` AI boundary, and practical documentation that
helps both human judges and an AI code reviewer verify the product end to end.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS
**Primary Dependencies**: Next.js 15 App Router, React 19, Clerk, Convex, Tailwind CSS, shadcn/ui, Zod, OpenRouter via server-side REST calls
**Storage**: Convex for users, projects, chat messages, and the latest stable app schema stored on each project
**Testing**: Vitest for schema validation and renderer mapping, route-handler tests for `/api/chat`, Playwright for three end-to-end unscripted flows
**Target Platform**: Hosted web application on Vercel for modern desktop browsers
**Project Type**: Full-stack web app
**Performance Goals**: Show visible progress within 2 seconds of message submit, return an initial assistant response within 1-2 seconds under normal conditions, render a validated canvas schema in one request cycle, and reload the last stable project state immediately on revisit
**Constraints**: Zero technical jargon in user-facing copy, split-screen conversational UX, strict TypeScript typing, OpenRouter only through server-side Next.js Route Handlers, strict parseable JSON output for UI state, last-stable-schema fallback, one-screen MVP scope, and no hardcoded Wizard-of-Oz behavior
**Scale/Scope**: 16-hour hackathon MVP for non-technical industry experts, one active tool flow per project, broad domain coverage through a small reusable component vocabulary

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Zero-Tech-Jargon Rule**: PASS. The plan requires plain-language prompts, recovery messages, labels, and judge-facing demo flows for non-technical users.
- **Split-Screen, Instant-Feedback UX**: PASS. Coffee Chat and Live Canvas remain the core left-right experience, with visible progress and stable fallback behavior.
- **Modern Next.js Delivery Standards**: PASS. The plan uses Next.js App Router, strict TypeScript, Tailwind CSS, and shadcn/ui components as the base UI system.
- **OpenRouter Structured AI Contracts**: PASS. The plan centralizes AI calls in `/api/chat`, uses strict JSON contracts, validates the result before rendering, and preserves the last stable schema on failure.
- **Human-Workflow Fidelity**: PASS. The MVP is explicitly designed to accept unscripted real-world workflow problems from workers across industries and turn them into usable draft tools.

## Project Structure

### Documentation (this feature)

```text
specs/002-workflow-ai-builder/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── chat-route-contract.md
│   └── ui-schema-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── (marketing)/
├── dashboard/
│   └── page.tsx
├── api/
│   └── chat/
│       └── route.ts
└── globals.css

components/
├── ui/
├── coffee-chat/
│   ├── chat-panel.tsx
│   └── message-list.tsx
└── live-canvas/
    ├── dynamic-renderer.tsx
    └── block-renderers/

convex/
├── schema.ts
├── users.ts
├── projects.ts
└── chatMessages.ts

lib/
├── ai/
│   ├── openrouter.ts
│   ├── system-prompt.ts
│   └── parse-chat-response.ts
├── schemas/
│   ├── chat-route.ts
│   └── ui-schema.ts
└── canvas/
    ├── action-handlers.ts
    └── normalize-schema.ts

tests/
├── e2e/
├── integration/
└── unit/

docs/
├── README.md
└── FUTURE_VISION.md
```

**Structure Decision**: Use a single Next.js App Router application with Clerk-protected dashboard routes,
Convex as the persisted state layer, one `/api/chat` route for all AI work, `lib/schemas` for validation, and a
flexible `dynamic-renderer` that maps validated tool blocks to shadcn/ui-based components.

## Phase Plan

### Phase 1: Foundation & Auth (Hours 1-4)
1. Initialize the app shell with Next.js App Router, Tailwind CSS, shadcn/ui, and strict TypeScript settings.
2. Integrate Clerk authentication and protect `/dashboard` so only signed-in users can access the builder.
3. Set up Convex and define the minimal schema for `users`, `projects`, and `chatMessages`, with `appSchema`
   stored on the project as the latest stable visible tool.
4. Add the base dashboard split-screen layout and create empty-state placeholders for Coffee Chat and Live Canvas.
5. Verify that sign-in, protected routing, and project persistence are functioning before moving on.

### Phase 2: The Conversational Engine (Hours 5-8)
1. Build the left-panel Coffee Chat interface with message history, input box, send action, and visible loading
   state.
2. Create the custom Next.js Route Handler at `/api/chat` that validates incoming requests, calls OpenRouter with
   server-side credentials, and returns a plain-language assistant reply plus a strict `ui_schema` payload.
3. Write a robust system prompt that instructs the model to act like a product manager for non-technical workers:
   listen to any workflow problem, ask clarifying questions without jargon, and return JSON only with
   `assistantReply` and `ui_schema`.
4. Add server-side Zod validation so malformed JSON, unsupported blocks, or extra fields are rejected before they
   can reach Live Canvas.
5. Persist chat history and promote only validated `appSchema` results to the project record.

### Phase 3: The Dynamic Canvas (Hours 9-12)
1. Build `DynamicRenderer` for the right panel as a mapping engine from validated tool blocks to real shadcn/ui
   components.
2. Support the MVP block vocabulary: text, input, button, card, and dropdown, plus basic layouts such as cards,
   forms, text sections, and button rows.
3. Keep rendering rules strict so unsupported blocks fail safely while the last stable canvas remains visible.
4. Add basic interactivity for generated submit buttons so collected form values are summarized and sent back into
   chat context through `/api/chat`.
5. Validate that a user can go from prompt → generated canvas → button click → follow-up conversation without any
   hardcoded industry-specific logic.

### Phase 4: Unscripted Testing & AI Judge Prep (Hours 13-16)
1. Test the app end to end with three unscripted scenarios from very different domains, such as sheet metal job
   intake, bakery order tracking, and construction crew check-in.
2. Patch schema, prompt, and renderer weaknesses discovered during those tests.
3. Write a comprehensive `README.md` that explains the architecture, the `/api/chat` flow, the OpenRouter
   prompting contract, the JSON-to-UI rendering engine, and local setup steps.
4. Write `FUTURE_VISION.md` to distinguish the hackathon MVP from the broader roadmap, including later goals such
   as generating full React code, richer state management, more block types, and voice-based input.
5. Perform a final demo rehearsal proving the app works with a fresh unscripted idea from sign-in through visible
   rendered output.

## Project Structure Alignment by Phase

- **Phase 1** focuses on `app/dashboard`, `convex/`, auth setup, and the base split-screen shell.
- **Phase 2** focuses on `components/coffee-chat/`, `app/api/chat/route.ts`, `lib/ai/`, and request/response validation.
- **Phase 3** focuses on `components/live-canvas/`, `lib/canvas/`, and form submission loops back into chat.
- **Phase 4** focuses on `tests/`, `README.md`, and `FUTURE_VISION.md`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Store only the latest stable schema on the project for MVP speed | A 16-hour build needs the smallest persistence model that still supports reloads and fallback | Full schema revision history is valuable but not required before the core loop is reliable |

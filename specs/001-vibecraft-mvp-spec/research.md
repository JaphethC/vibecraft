# Research: VibeCraft MVP Builder

## Decision 1: AI Integration Boundary
- **Decision**: Use OpenRouter through Next.js App Router route handlers as the server-side AI integration boundary instead of the Vercel AI SDK.
- **Rationale**: This keeps provider credentials on the server, supports streamed conversational responses, allows access to multiple available models through one interface, and matches the user's request to move off the Vercel AI SDK.
- **Alternatives considered**:
  - Vercel AI SDK: rejected because the user explicitly requested OpenRouter instead.
  - Direct client-side provider calls: rejected because secrets must remain server-side and request shaping needs validation.

## Decision 2: Split AI Work into Two Paths
- **Decision**: Use two AI generation paths: one for streamed conversational guidance in Coffee Chat and one for strict structured screen generation for Live Canvas.
- **Rationale**: Conversational guidance and screen-structure generation have different reliability goals. Separating them improves perceived responsiveness while keeping the screen output deterministic and validatable.
- **Alternatives considered**:
  - Single mixed response for chat and structure: rejected because it increases parsing risk and makes graceful fallback harder.
  - Structure-only generation with no streamed text: rejected because it weakens the collaborative feel of the left panel.

## Decision 3: Model Strategy on OpenRouter
- **Decision**: Use a low-latency general chat model for Coffee Chat and a separate structured-output-capable model for screen generation, both accessed through OpenRouter with fallback models available.
- **Rationale**: The conversational experience benefits from speed, while structured screen generation benefits from schema compliance and consistency. A fallback chain reduces demo risk during a hackathon.
- **Alternatives considered**:
  - One model for everything: rejected because it creates unnecessary trade-offs between speed and schema reliability.
  - Provider-specific integrations: rejected because OpenRouter offers faster model swapping during MVP iteration.

## Decision 4: Persistence Strategy in Convex
- **Decision**: Store users separately, keep projects as the main workspace record, persist chat messages as their own ordered records, and store generated screen structures as versioned revisions linked to each project.
- **Rationale**: This preserves the latest stable canvas, enables recovery from failed generations, and avoids putting large mutable conversation and screen blobs into a single record.
- **Alternatives considered**:
  - Store all chat history and screen structure inline on the project record only: rejected because it is harder to query, recover, and version safely.
  - Do not version screen structures: rejected because last-known-good recovery is a core UX requirement.

## Decision 5: Validation and Recovery Rules
- **Decision**: Validate all generated screen structures on the server before persisting them as stable and keep the last stable screen visible when a new generation fails.
- **Rationale**: This aligns with the split-screen trust model, prevents broken canvas states, and supports plain-language recovery prompts.
- **Alternatives considered**:
  - Render all generated output immediately: rejected because malformed output can break the visible experience.
  - Replace the canvas with an error state on failure: rejected because preserving usable work is more important for user trust.

## Decision 6: Testing Strategy
- **Decision**: Use Vitest for schema and adapter logic, Playwright for end-to-end split-screen workflows, and route-handler tests for AI streaming and validation behavior.
- **Rationale**: This combination covers the highest-risk MVP behavior: structured screen validation, streamed conversation, and preserved stable canvas behavior.
- **Alternatives considered**:
  - Unit tests only: rejected because the split-screen experience must be verified end to end.
  - End-to-end tests only: rejected because schema validation logic needs faster isolated coverage.

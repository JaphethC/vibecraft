# Implementation Plan: VibeCraft MVP Builder

**Branch**: `001-vibecraft-mvp-spec` | **Date**: 2026-03-24 | **Spec**: [/home/japhethcampbell/Vibe/vibe-the-gap/specs/001-vibecraft-mvp-spec/spec.md](/home/japhethcampbell/Vibe/vibe-the-gap/specs/001-vibecraft-mvp-spec/spec.md)
**Input**: Feature specification from `/specs/001-vibecraft-mvp-spec/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a hackathon MVP for VibeCraft where a non-technical worker signs in, describes a work problem in Coffee
Chat, and sees a Live Canvas screen draft appear and evolve in real time. The implementation will use Next.js App
Router for the product shell, Clerk for sign-in, Convex for persisted projects and revisioned canvas state, and
OpenRouter through server-side route handlers for streamed conversation plus strict structured screen generation.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS
**Primary Dependencies**: Next.js 15 App Router, React 19, Clerk, Convex, Tailwind CSS, shadcn/ui, Zod, OpenRouter via server-side HTTPS requests
**Storage**: Convex for users, projects, chat messages, schema revisions, and generation attempt records
**Testing**: Vitest for schema and adapter logic, route-handler tests for AI integration behavior, Playwright for end-to-end split-screen workflows
**Target Platform**: Hosted web application on Vercel for modern desktop browsers
**Project Type**: Full-stack web app
**Performance Goals**: Show visible progress within 2 seconds of message submit, begin streamed chat response within 1-2 seconds under normal conditions, and restore the latest stable canvas immediately when reopening a project
**Constraints**: Zero technical jargon in user-facing copy, split-screen conversation-to-result UX, strict TypeScript typing, OpenRouter server-side secret isolation, single-screen workflow generation for MVP, last-stable-canvas preservation on generation failure
**Scale/Scope**: Hackathon MVP for non-technical industry experts with one active conversation thread per project and a limited set of supported UI blocks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Zero-Tech-Jargon Rule**: PASS. User-facing stories, recovery behavior, and quickstart validation all require plain-language copy.
- **Split-Screen, Instant-Feedback UX**: PASS. The feature centers on Coffee Chat on the left, Live Canvas on the right, visible progress states, and preserved stable drafts.
- **Modern Next.js Delivery Standards**: PASS. The plan uses Next.js App Router, strict TypeScript, Tailwind CSS, and shadcn/ui-based UI primitives.
- **Structured AI Streaming Contracts**: PASS WITH AMENDMENT. The constitution names the Vercel AI SDK, but this feature adopts OpenRouter through Next.js route handlers per direct user instruction. Compliance is preserved by keeping streamed conversational output plus validated structured payloads as mandatory requirements.
- **Human-Workflow Fidelity**: PASS. The plan remains grounded in worker-described job problems and visible workflow-oriented drafts.

## Project Structure

### Documentation (this feature)

```text
specs/001-vibecraft-mvp-spec/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── chat-stream-contract.md
│   └── ui-schema-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── (workspace)/
│   └── projects/
├── api/
│   └── chat/
└── globals.css

components/
├── ui/
├── coffee-chat/
└── live-canvas/

convex/
├── schema.ts
├── users.ts
├── projects.ts
├── chatMessages.ts
├── uiSchemaRevisions.ts
└── generationAttempts.ts

lib/
├── ai/
│   ├── openrouter.ts
│   ├── stream-chat.ts
│   └── generate-ui-schema.ts
├── schemas/
│   ├── chat.ts
│   └── ui-schema.ts
└── canvas/
    └── renderers/

tests/
├── integration/
├── e2e/
└── unit/
```

**Structure Decision**: Use a single Next.js App Router application with server route handlers as the AI boundary,
Convex for persisted state, feature-specific UI components separated into `coffee-chat` and `live-canvas`, and
shared validation/rendering logic in `lib/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Constitution names Vercel AI SDK, but this plan uses OpenRouter route handlers | User explicitly requested OpenRouter and access to models available there | Keeping Vercel AI SDK would contradict the requested provider change |

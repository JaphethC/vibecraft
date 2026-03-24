<!--
Sync Impact Report
- Version change: 1.0.0 → 2.0.0
- Modified principles:
  - IV. Structured AI Streaming Contracts → IV. OpenRouter Structured AI Contracts
- Added sections:
  - None
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated /home/japhethcampbell/Vibe/vibe-the-gap/.specify/templates/plan-template.md
  - ✅ updated /home/japhethcampbell/Vibe/vibe-the-gap/.specify/templates/spec-template.md
  - ✅ updated /home/japhethcampbell/Vibe/vibe-the-gap/.specify/templates/tasks-template.md
  - ✅ reviewed /home/japhethcampbell/Vibe/vibe-the-gap/.qwen/commands/speckit.constitution.md
  - ✅ reviewed /home/japhethcampbell/Vibe/vibe-the-gap/.qwen/commands/speckit.plan.md
  - ✅ reviewed /home/japhethcampbell/Vibe/vibe-the-gap/.qwen/commands/speckit.specify.md
  - ✅ reviewed /home/japhethcampbell/Vibe/vibe-the-gap/.qwen/commands/speckit.tasks.md
- Follow-up TODOs:
  - TODO(RATIFICATION_DATE): original adoption date was not present in repo history or docs; using initial ratification date of 2026-03-24 for first adoption.
-->
# VibeCraft Constitution

## Core Principles

### I. Zero-Tech-Jargon Rule
All user-facing product copy, AI responses, onboarding, empty states, and error messages MUST speak in the
language of the user's work, stories, and outcomes rather than software implementation. The product MUST NOT
expose terms such as database, API, JSON, schema, deployment, prompt, model, route handler, provider, or similar
internal engineering concepts to end users unless a governance-approved accessibility or legal disclosure
explicitly requires it. Internal system details MAY exist in code, docs, and operator tooling, but the shipping
experience MUST translate them into human workflows such as tasks, forms, steps, and outcomes. This rule exists
because VibeCraft serves non-technical industry experts who must be able to create software by describing real
problems, not by learning developer vocabulary.

### II. Split-Screen, Instant-Feedback UX
The core product experience MUST prioritize a split-screen layout where conversation and guidance live on the
left and visual results, previews, or generated workflow artifacts appear on the right. User actions that change
the generated experience MUST stream visible progress and update the right-side output as quickly as meaningful
partial results are available. New flows, experiments, and MVP reductions MUST preserve this left-to-right
conversation-to-result loop unless a documented exception proves that another layout better supports the same
immediacy. This principle exists because trust in an AI builder comes from seeing ideas become tangible while the
conversation is still happening.

### III. Modern Next.js Delivery Standards
Production code MUST use modern Next.js App Router conventions, strict TypeScript types, Tailwind CSS for
styling, and shadcn/ui components where reusable UI primitives are needed. New code MUST prefer server and
client boundaries that are explicit, composable, and minimal; avoid legacy Pages Router patterns; avoid `any`
except where a typed boundary is impossible and justified inline; and keep styling tokens and layout decisions
consistent with Tailwind-first design. This principle exists to keep the MVP fast to iterate on during the
hackathon while maintaining a codebase that remains clean, legible, and ready for extension.

### IV. OpenRouter Structured AI Contracts
All conversational AI interactions MUST use the OpenRouter API through server-side Next.js Route Handlers as the
primary integration boundary. The client MUST NEVER call model providers directly. Prompts that request UI state
MUST instruct the model to return only valid, parseable JSON objects that conform to a versioned application state
schema, forbid extra prose, and constrain outputs to supported component types and required fields. Free-form text
responses MAY be shown to users, but UI-affecting state MUST originate from validated structured payloads with
explicit typing, parsing, and failure handling. Streaming implementations MUST surface partial progress without
blocking the UI, and every AI action that changes visible artifacts MUST define a deterministic mapping from model
output into interface updates. This rule exists because VibeCraft depends on real-time confidence: users must see
a live collaborative builder, not a black-box text dump or a broken canvas.

### V. Human-Workflow Fidelity
Features, requirements, and implementation choices MUST begin from the target worker's daily job story,
constraints, and decision points before introducing technical capabilities. Specifications MUST describe actors,
work triggers, success outcomes, and edge cases in domain language that a non-technical expert can validate.
When trade-offs appear, the default choice MUST favor fewer steps, clearer outcomes, and stronger alignment with
real work on the shop floor over engineering novelty. This principle exists because the product succeeds only if
it captures and reflects how people already think about their jobs.

## Product Experience Constraints

1. User-facing specifications and acceptance criteria MUST describe value in plain language and MUST avoid
   implementation details unless those details are strictly internal and isolated to engineering sections.
2. Every feature proposal MUST identify the left-panel conversational interaction, the right-panel visual output,
   and the feedback loop between them.
3. AI-generated structures that drive the interface MUST define typed fields, validation rules, schema versions,
   and graceful fallback behavior when model output is incomplete, malformed, or semantically invalid.
4. UI components MUST be accessible, responsive, and visually coherent with a modern Tailwind + shadcn/ui design
   system suitable for a polished hackathon MVP.
5. New dependencies, patterns, or exceptions to the required stack MUST be justified in the plan under
   Complexity Tracking.

## Delivery Workflow & Quality Gates

1. Every implementation plan MUST include a Constitution Check that verifies compliance with the Zero-Tech-Jargon
   Rule, split-screen UX commitments, Next.js App Router standards, strict typing expectations, and OpenRouter
   structured JSON generation requirements.
2. Every feature specification MUST include at least one user scenario that proves a non-technical industry expert
   can describe a problem in plain language and receive a visible right-panel outcome without developer
   intervention.
3. Generated task lists MUST include work for typed AI contracts, JSON validation, split-screen UI behavior,
   prompt hardening, and validation of user-facing language whenever a feature touches the conversational
   experience.
4. Before merge or demo, contributors MUST run the project's relevant verification steps for linting,
   type-checking, and tests once those commands exist in the repository, and fix failures that violate this
   constitution.
5. Any exception to these gates MUST be documented in the plan with the violated principle, rationale, approved
   scope of the exception, and the follow-up action needed to return to compliance.

## Governance
This constitution supersedes conflicting local habits for product, specification, planning, and implementation
work in this repository. Amendments MUST be recorded by updating this file, adding or refreshing the Sync Impact
Report, and reviewing affected templates and runtime guidance in the same change. Versioning follows semantic
versioning for governance: MAJOR for incompatible principle removals or redefinitions, MINOR for new principles
or materially expanded obligations, and PATCH for clarifications that do not change expected behavior. Compliance
review MUST occur during specification, planning, task generation, and final implementation review, with any
violations documented explicitly rather than silently ignored.

**Version**: 2.0.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24

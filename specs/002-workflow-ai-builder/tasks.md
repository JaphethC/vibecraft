# Tasks: Workflow AI Builder

**Input**: Design documents from `/specs/002-workflow-ai-builder/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md, `_design_reference/`

**Verification**: Focus on lightweight hackathon verification through linting and `tsc --noEmit` type-checking. Additional automated tests can be added later if time remains.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline tooling for the 2-day MVP

- [ ] T001 Review Next.js 16 app-router guidance in `node_modules/next/dist/docs/` and align the implementation notes in `specs/002-workflow-ai-builder/plan.md`
- [ ] T002 Update dependencies for Clerk, Convex, Zod, shadcn/ui primitives, and OpenRouter support in `package.json`
- [ ] T003 [P] Add a `typecheck` script with `tsc --noEmit` in `package.json`
- [ ] T004 [P] Configure environment variable examples and local setup notes for Clerk, Convex, and OpenRouter in `.env.example` and `README.md`
- [ ] T005 [P] Create or update shared TypeScript path aliases and app conventions for `src/`, `tests/`, and `convex/` in `tsconfig.json`
- [ ] T006 [P] Add the design-system foundations from `_design_reference/DESIGN.md` to `src/app/globals.css` and `src/lib/design/tokens.ts`
- [ ] T007 [P] Install shadcn/ui and add required primitives for the MVP in `components.json`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/components/ui/card.tsx`, `src/components/ui/select.tsx`, and `src/components/ui/scroll-area.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Create the root app shell and marketing-to-dashboard route handoff in `src/app/layout.tsx`, `src/app/page.tsx`, and `src/middleware.ts`
- [ ] T009 [P] Integrate Clerk providers and auth-aware navigation in `src/app/layout.tsx`, `src/components/layout/app-sidebar.tsx`, and `src/components/auth/auth-buttons.tsx`
- [ ] T010 [P] Set up Convex client/provider wiring in `src/app/layout.tsx`, `src/lib/convex/client.ts`, and `convex/README.md`
- [ ] T011 [P] Define the shared Convex schema for users, projects, and chat messages in `convex/schema.ts`
- [ ] T012 [P] Implement user sync and project/chat data functions in `convex/users.ts`, `convex/projects.ts`, and `convex/chatMessages.ts`
- [ ] T013 [P] Define strict Zod schemas for chat requests, chat responses, and UI blocks in `src/lib/schemas/chat-route.ts` and `src/lib/schemas/ui-schema.ts`
- [ ] T014 [P] Implement OpenRouter client, system prompt, blocking-response parsing helpers, and a friendly API failure toast path in `src/lib/ai/openrouter.ts`, `src/lib/ai/system-prompt.ts`, `src/lib/ai/parse-chat-response.ts`, and `src/components/ui/error-toast.tsx`
- [ ] T015 [P] Add canvas normalization and fallback helpers in `src/lib/canvas/normalize-schema.ts` and `src/lib/canvas/action-handlers.ts`
- [ ] T016 Build the protected split-screen dashboard shell based on `_design_reference/code.html` in `src/app/dashboard/page.tsx`, `src/components/layout/sidebar.tsx`, `src/components/coffee-chat/chat-panel-shell.tsx`, and `src/components/live-canvas/canvas-panel-shell.tsx`
- [ ] T017 Add plain-language empty, loading, and error copy shared across the dashboard in `src/lib/copy/plain-language.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Describe a Work Problem and See a Usable Draft Tool (Priority: P1) 🎯 MVP

**Goal**: Let a signed-in user describe a workflow problem and immediately see a believable, useful draft tool rendered in Live Canvas.

**Independent Test**: Sign in, open `/dashboard`, submit a first workflow prompt, and confirm the app creates a project, saves chat history, calls `/api/chat`, and renders a validated draft tool on the right.

### Implementation for User Story 1

- [X] T018 [P] [US1] Create the live Coffee Chat conversation components in `src/components/coffee-chat/chat-panel.tsx`, `src/components/coffee-chat/message-list.tsx`, and `src/components/coffee-chat/message-input.tsx`
- [X] T019 [P] [US1] Create the Live Canvas dynamic renderer and block renderers in `src/components/live-canvas/dynamic-renderer.tsx`, `src/components/live-canvas/block-renderers/text-block.tsx`, `src/components/live-canvas/block-renderers/input-block.tsx`, `src/components/live-canvas/block-renderers/button-block.tsx`, `src/components/live-canvas/block-renderers/card-block.tsx`, and `src/components/live-canvas/block-renderers/dropdown-block.tsx`
- [X] T020 [US1] Implement the `/api/chat` route for first-message validation, standard blocking OpenRouter calls, and stable response shaping in `src/app/api/chat/route.ts`
- [X] T021 [US1] Add dashboard state management for creating projects, sending messages, showing loading states, and applying stable schema updates in `src/app/dashboard/page.tsx`
- [X] T022 [US1] Persist project creation, assistant replies, and stable `appSchema` updates through Convex in `convex/projects.ts` and `convex/chatMessages.ts`
- [X] T023 [US1] Wire the initial split-screen layout to the real chat and renderer components in `src/app/dashboard/page.tsx`
- [X] T024 [US1] Audit all first-run user-facing copy for zero jargon compliance in `src/components/coffee-chat/` and `src/components/live-canvas/`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Shape the Tool Through Ongoing Conversation (Priority: P2)

**Goal**: Let a user reopen a saved project, continue the conversation, and evolve the same tool instead of starting over.

**Independent Test**: Open an existing project, ask for refinements such as extra fields or clearer labels, and confirm the conversation history and rendered tool update within the same saved workspace.

### Implementation for User Story 2

- [X] T025 [P] [US2] Build project history and selection UI in `src/components/layout/project-history.tsx` and `src/components/layout/new-project-button.tsx`
- [ ] T026 [P] [US2] Add dashboard loaders for reopening a project with its saved chat and stable canvas in `src/app/dashboard/page.tsx` and `src/lib/dashboard/load-project.ts`
- [ ] T027 [US2] Extend `/api/chat` to support existing project refinement requests and updated project naming in `src/app/api/chat/route.ts`
- [ ] T028 [US2] Persist ordered follow-up messages, project status, and updated stable schema in `convex/projects.ts` and `convex/chatMessages.ts`
- [ ] T029 [US2] Keep the dynamic renderer stable while applying schema refinements in `src/components/live-canvas/dynamic-renderer.tsx`
- [ ] T030 [US2] Refresh project sidebar summaries and active-project metadata in `src/components/layout/sidebar.tsx` and `src/components/layout/project-history.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Recover Gracefully When the Result Is Unclear or Incomplete (Priority: P3)

**Goal**: Preserve the last useful tool and guide the user with simple follow-up questions when generation is vague, partial, or invalid.

**Independent Test**: Trigger an unclear or malformed generation path, then confirm the app keeps the previous stable canvas, marks the project status correctly, and shows a plain-language clarification response.

### Implementation for User Story 3

- [ ] T031 [P] [US3] Create recovery-state UI for empty, clarification, and generation-failed canvas states in `src/components/live-canvas/recovery-state.tsx`
- [ ] T032 [P] [US3] Add clarification and fallback copy patterns in `src/lib/ai/system-prompt.ts` and `src/lib/copy/plain-language.ts`
- [ ] T033 [US3] Harden `/api/chat` to reject invalid schemas, preserve the last stable schema, emit recovery statuses, and show a friendly connection-loss toast in `src/app/api/chat/route.ts` and `src/components/ui/error-toast.tsx`
- [ ] T034 [US3] Persist project status transitions for `active`, `needs_clarification`, and `generation_failed` in `convex/projects.ts`
- [ ] T035 [US3] Render preserved stable schemas and recovery prompts together in `src/app/dashboard/page.tsx` and `src/components/live-canvas/canvas-panel-shell.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and the hackathon demo quality

- [ ] T036 [P] Implement generated form submission capture and chat-loop handoff in `src/lib/canvas/action-handlers.ts`, `src/components/live-canvas/dynamic-renderer.tsx`, and `src/app/api/chat/route.ts`
- [ ] T037 [P] Refine the dashboard visuals to match `_design_reference/code.html` and `_design_reference/screen.png` in `src/components/layout/sidebar.tsx`, `src/components/coffee-chat/chat-panel.tsx`, and `src/components/live-canvas/canvas-panel-shell.tsx`
- [ ] T038 [P] Document the architecture, setup, judge demo flow, and multi-industry prompts in `README.md`
- [ ] T039 [P] Document post-MVP ideas such as richer block types, revision history, and code export in `FUTURE_VISION.md`
- [ ] T040 Run linting, build verification, and `npm run typecheck` using the commands documented in `package.json` and `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-5)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and establishes the MVP sign-in → prompt → generated canvas loop
- **User Story 2 (P2)**: Depends on User Story 1 data flow because it extends existing project persistence and refinement
- **User Story 3 (P3)**: Depends on User Story 1 stable-schema flow and benefits from User Story 2 project persistence, but can begin once stable generation and persistence exist

### Within Each User Story

- Convex persistence must exist before dashboard state can fully wire to saved projects
- `/api/chat` validation must be in place before dynamic renderer updates are accepted
- Renderer block components should exist before dashboard integration applies stable schemas
- Recovery handling must be implemented before polish tasks rely on generated form submissions

### Parallel Opportunities

- Phase 1 tasks T003-T007 can run in parallel after dependencies are chosen in T002
- Phase 2 tasks T009-T015 can run in parallel because they target separate auth, data, schema, AI, and canvas helper files
- In US1, T018-T019 can run in parallel before integration tasks T020-T023
- In US2, T025-T026 can run in parallel before persistence and route updates T027-T030
- In US3, T031-T032 can run in parallel before integrated fallback work T033-T035
- In Polish, documentation and visual refinements T037-T039 can run in parallel before final verification T040

---

## Parallel Example: User Story 1

```bash
# Launch US1 UI work together:
Task: "Create Coffee Chat components in src/components/coffee-chat/"
Task: "Create Live Canvas renderer components in src/components/live-canvas/"
```

## Parallel Example: User Story 2

```bash
# Launch US2 persistence and UI work together:
Task: "Build project history UI in src/components/layout/project-history.tsx"
Task: "Add dashboard loaders in src/lib/dashboard/load-project.ts"
```

## Parallel Example: User Story 3

```bash
# Launch US3 recovery groundwork together:
Task: "Create recovery-state UI in src/components/live-canvas/recovery-state.tsx"
Task: "Add clarification copy patterns in src/lib/copy/plain-language.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Confirm a signed-in worker can describe a workflow and see a usable draft tool appear in Live Canvas
5. Use this checkpoint as the 2-day MVP demo baseline

### Incremental Delivery

1. Complete Setup + Foundational → auth, persistence, AI contract, and split-screen shell are ready
2. Add User Story 1 → validate the core workflow-to-tool loop
3. Add User Story 2 → validate project reopening and refinement continuity
4. Add User Story 3 → validate graceful fallback and clarification behavior
5. Finish form submission loop, docs, and demo polish

### Parallel Team Strategy

With multiple developers:

1. One developer handles auth and dashboard shell
2. One developer handles Convex schema/functions and project persistence
3. One developer handles OpenRouter contract, schema validation, and `/api/chat`
4. One developer handles Coffee Chat, Live Canvas, and renderer block components
5. Rejoin for end-to-end tests, recovery, and docs before final demo verification

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks directly to user stories for traceability
- Every task includes an exact file path and is specific enough for immediate implementation
- The MVP scope centers on Clerk auth, Convex persistence, OpenRouter integration, and the `_design_reference` split-screen UI
- The prerequisite checker could not infer `FEATURE_DIR` on the current `main` branch, so this task list targets `/specs/002-workflow-ai-builder/` based on the available spec set

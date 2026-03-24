---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include test tasks whenever the feature introduces AI contract parsing, strict JSON validation, split-screen UI behavior, or other user-critical flows. Additional test tasks remain OPTIONAL unless explicitly requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js web app**: `app/`, `components/`, `lib/`, `public/`, `tests/`
- Adjust paths to the structure selected in plan.md

<!--
  ==========================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Interfaces from contracts/
  - Constitution-mandated UX, language, and AI contract work

  DO NOT keep these sample tasks in the generated tasks.md file.
  ==========================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create feature directories per implementation plan
- [ ] T002 Install or confirm required dependencies in package configuration
- [ ] T003 [P] Configure linting, formatting, and strict typing rules
- [ ] T004 [P] Define shared UI tokens or primitives in components/ui/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create split-screen shell in app/[feature]/page.tsx
- [ ] T006 [P] Define typed AI payload schemas in lib/schemas/[feature].ts
- [ ] T007 [P] Implement OpenRouter route-handler integration boundary in app/api/[feature]/route.ts or lib/ai/[feature].ts
- [ ] T008 [P] Create shared shadcn/ui-based conversation and preview components in components/[feature]/
- [ ] T009 Enforce plain-language copy review for user-facing strings touched by the feature
- [ ] T010 Configure fallback handling for incomplete, invalid, or non-parseable JSON AI output
- [ ] T011 Harden prompts to require schema-safe JSON-only UI state responses in lib/ai/[feature].ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST when the story changes AI contracts or visible UX behavior.**

- [ ] T012 [P] [US1] Add AI payload parsing test in tests/unit/[feature]-payload.test.ts
- [ ] T013 [P] [US1] Add split-screen interaction test in tests/integration/[feature]-conversation.test.tsx

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create domain model or mapper in lib/[feature]/[entity].ts
- [ ] T015 [P] [US1] Build left-panel conversation UI in components/[feature]/conversation-panel.tsx
- [ ] T016 [P] [US1] Build right-panel visual result UI in components/[feature]/preview-panel.tsx
- [ ] T017 [US1] Implement streamed action flow in app/[feature]/actions.ts or app/api/[feature]/route.ts
- [ ] T018 [US1] Connect typed AI output to right-panel updates in app/[feature]/page.tsx
- [ ] T019 [US1] Validate plain-language messaging and fallback copy in app/[feature]/page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 ⚠️

- [ ] T020 [P] [US2] Add scenario test for refinement flow in tests/integration/[feature]-refinement.test.tsx

### Implementation for User Story 2

- [ ] T021 [P] [US2] Extend typed workflow state in lib/schemas/[feature].ts
- [ ] T022 [P] [US2] Implement refinement controls in components/[feature]/refinement-controls.tsx
- [ ] T023 [US2] Update streamed workflow handling in app/[feature]/actions.ts or app/api/[feature]/route.ts
- [ ] T024 [US2] Synchronize refined output in components/[feature]/preview-panel.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 ⚠️

- [ ] T025 [P] [US3] Add resilience test for incomplete AI output in tests/unit/[feature]-fallback.test.ts

### Implementation for User Story 3

- [ ] T026 [P] [US3] Add recovery state UI in components/[feature]/recovery-state.tsx
- [ ] T027 [US3] Implement clarification prompts in plain language in app/[feature]/actions.ts or app/api/[feature]/route.ts
- [ ] T028 [US3] Render recovery path in app/[feature]/page.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Audit user-facing copy for technical jargon across app/ and components/
- [ ] TXXX Tune responsive split-screen behavior across breakpoints
- [ ] TXXX [P] Refactor shared typed AI helpers in lib/ai/ and lib/schemas/
- [ ] TXXX Run linting, type-checking, and test verification commands
- [ ] TXXX Validate quickstart/demo flow for hackathon presentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - establishes the MVP conversation-to-result loop
- **User Story 2 (P2)**: Can start after Foundational - extends refinement without breaking US1 independence
- **User Story 3 (P3)**: Can start after Foundational - adds resilience and recovery behavior

### Within Each User Story

- AI contract and visible UX tests before implementation when the story changes typed payloads or split-screen behavior
- Schemas before streamed actions
- Streamed actions before UI wiring
- Core implementation before copy audit and fallback refinement
- Story complete before moving to next priority when working solo

### Parallel Opportunities

- Tasks marked [P] can run in parallel when they do not touch the same files
- Conversation and preview component work can often proceed in parallel
- Schema updates and integration-boundary work can often proceed in parallel
- Different user stories can be worked on in parallel after the foundational phase if team capacity allows

---

## Parallel Example: User Story 1

```bash
# Launch US1 tests together:
Task: "Add AI payload parsing test in tests/unit/[feature]-payload.test.ts"
Task: "Add split-screen interaction test in tests/integration/[feature]-conversation.test.tsx"

# Launch US1 UI work together:
Task: "Build left-panel conversation UI in components/[feature]/conversation-panel.tsx"
Task: "Build right-panel visual result UI in components/[feature]/preview-panel.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Confirm a non-technical user can describe a problem and see a right-panel result update in real time
5. Demo the MVP flow

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate the core split-screen experience
3. Add User Story 2 → Validate refinement behavior
4. Add User Story 3 → Validate recovery and fallback behavior
5. Re-check constitution compliance after each story

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Conversation experience
   - Developer B: Preview/result experience
   - Developer C: Typed AI contract, prompt hardening, and fallback behavior
3. Integrate at story checkpoints with constitution checks

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Visible progress and plain-language UX are mandatory, not optional polish
- Avoid vague tasks, hidden AI state changes, and user-facing technical jargon

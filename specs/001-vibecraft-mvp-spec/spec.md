# Feature Specification: VibeCraft MVP Builder

**Feature Branch**: `001-vibecraft-mvp-spec`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "Based on our Constitution for 'VibeCraft', please generate a detailed Specification document. Our tech stack is Next.js (App Router), Clerk (Authentication), Convex (Real-time Database), and Tailwind/shadcn.

The specification must detail:

    System Architecture: How the Next.js frontend communicates with the Vercel AI SDK and Convex.
    The Split-Screen Interface:
        The Coffee Chat (Left Panel): A conversational UI for user input.
        The Live Canvas (Right Panel): A dynamic rendering engine that turns AI-generated JSON into a functional-looking React UI in real-time.
    Convex Database Schema: Define the tables needed for the MVP, specifically:
        users (Clerk ID, email)
        projects (userId, projectName, chatHistory, and appSchema which holds the generated UI JSON).
    The AI UI Schema: Define the exact JSON structure the AI will output to build the UI (e.g., supporting basic types like text, input, button, card, dropdown). We will host the demo product on Vercel."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Describe a Work Problem and See a Draft Screen (Priority: P1)

A non-technical industry expert starts a new project by describing a daily work problem in their own words. The
system responds like a thoughtful collaborator, then shows a draft working screen on the right that reflects the
user's workflow, labels, and steps.

**Why this priority**: This is the core promise of VibeCraft. If the user cannot talk about a real problem and
instantly see a believable draft solution, the product does not demonstrate its value.

**Independent Test**: A first-time user signs in, starts a project, types a work problem into Coffee Chat, and
sees Live Canvas render a draft interface that matches the described workflow without needing engineering help.

**Acceptance Scenarios**:

1. **Given** a signed-in user with no existing project open, **When** they describe a daily work problem in
   Coffee Chat, **Then** the system creates a project and Live Canvas shows a draft screen that reflects that
   problem in plain language.
2. **Given** a signed-in user viewing a draft screen, **When** they add more detail or correct the workflow in
   Coffee Chat, **Then** the visible draft updates to match the new direction without breaking the experience.

---

### User Story 2 - Rework the Draft Through Conversation (Priority: P2)

A user improves the generated screen by asking for changes such as clearer sections, different fields, or a more
helpful action flow. The system keeps the conversation history connected to the same project and updates the draft
screen in place.

**Why this priority**: The product must feel collaborative, not one-shot. Users need to shape the draft until it
looks close enough to their real work to be useful in a demo.

**Independent Test**: A user opens an existing project, asks for multiple changes in Coffee Chat, and sees the
same draft screen evolve while the project keeps its name, conversation history, and latest visible structure.

**Acceptance Scenarios**:

1. **Given** a user with an existing project and visible draft, **When** they ask for a change such as a new
   field, action button, or grouped section, **Then** Live Canvas updates the current screen instead of starting
   over from scratch.
2. **Given** a user who has refined the draft several times, **When** they return to the project later,
   **Then** they can continue from the saved conversation and latest visible draft.

---

### User Story 3 - Recover Gracefully When the Draft Is Incomplete (Priority: P3)

A user receives a partial, confusing, or missing draft result. Instead of exposing internal system terms, the
product explains what is missing in simple language and helps the user continue by asking for clearer work
context.

**Why this priority**: Trust depends on graceful recovery. The MVP must stay understandable even when the draft
cannot be completed on the first try.

**Independent Test**: A user gives an unclear request or triggers an incomplete draft, and the system responds
with a simple follow-up question while preserving the current project and any previously visible work.

**Acceptance Scenarios**:

1. **Given** a user request that lacks enough workflow detail, **When** the system cannot create a reliable
   draft, **Then** Coffee Chat asks a plain-language follow-up question and Live Canvas keeps the last stable
   visible result or shows an understandable placeholder.
2. **Given** a partially usable draft, **When** some parts of the result are missing, **Then** the system shows
   the usable portion and clearly identifies what needs clarification in user-friendly language.

### Edge Cases

- What happens when the user starts a project but provides only a very short or vague problem statement?
- How does the product behave when the visible draft contains some usable sections but cannot represent the full
  workflow yet?
- How does the conversation recover when a user asks for a change that conflicts with what they asked for
  earlier?
- What happens when a signed-in user opens a project that has conversation history but no saved visible draft?
- How does the product respond when a user loses connection while a new draft is being prepared?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST let a signed-in user start a new project by describing a work problem in plain
  language.
- **FR-002**: System MUST keep all user-facing conversation and interface labels free of technical jargon.
- **FR-003**: System MUST present Coffee Chat on the left and Live Canvas on the right in the primary desktop
  experience.
- **FR-004**: System MUST show visible progress while a new draft screen is being prepared.
- **FR-005**: System MUST render a functional-looking draft interface from a structured screen description.
- **FR-006**: System MUST let a user continue refining the same project through ongoing conversation.
- **FR-007**: System MUST save each project's name, conversation history, and latest visible draft so the user
  can return later.
- **FR-008**: System MUST associate each project with the signed-in user who created it.
- **FR-009**: System MUST support a saved user record containing the sign-in identity and email address.
- **FR-010**: System MUST define a project record containing the owner reference, project name, conversation
  history, and the latest saved screen structure that drives the visible draft.
- **FR-011**: System MUST support a screen structure format that can describe basic interface building blocks,
  including text, input fields, buttons, cards, and dropdowns.
- **FR-012**: System MUST allow the screen structure to describe layout, labels, placeholders, action text, and
  nested sections well enough to create a believable MVP screen.
- **FR-013**: System MUST preserve the last stable visible draft when a new draft cannot be fully prepared.
- **FR-014**: System MUST ask follow-up questions in plain language when the user's request is too incomplete to
  create a reliable draft.
- **FR-015**: System MUST let the product be demonstrated as a hosted web experience.
- **FR-016**: System MUST define how sign-in, conversation, live draft updates, and saved project records work
  together as one end-to-end flow.

### Key Entities *(include if feature involves data)*

- **User**: A signed-in person using VibeCraft. Key attributes include a sign-in identity and email address. A
  user can own many projects.
- **Project**: A saved workspace for one draft app idea. Key attributes include the owner reference, project
  name, conversation history, and latest saved screen structure. A project belongs to one user.
- **Chat Message**: A saved conversation entry within a project. Key attributes include speaker role, message
  text, time, and whether the message triggered a visible draft update.
- **Screen Structure**: The latest saved description of the visible draft. It contains the screen title, layout,
  sections, components, and actions that Live Canvas uses to render the current interface.
- **UI Component Block**: A single visible building block within the screen structure, such as text, input,
  button, card, or dropdown. Blocks can contain labels, helper text, placeholder text, nested children, and
  action metadata.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a demo session, at least 90% of first-time users can sign in, describe a work problem, and see
  an initial draft screen within 3 minutes.
- **SC-002**: In moderated usability checks, at least 85% of participants can correctly identify what Coffee Chat
  controls and what Live Canvas is showing after a single explanation.
- **SC-003**: During demos, the product shows a visible loading or partial-result state within 2 seconds of a
  user sending a new request.
- **SC-004**: At least 80% of refinement attempts update the existing project draft rather than forcing the user
  to restart from scratch.
- **SC-005**: When a request is incomplete, 100% of recovery flows present a plain-language follow-up question or
  stable fallback instead of exposing internal system terminology.

## Assumptions

- Users will access the MVP through a hosted browser experience.
- Sign-in is required before creating or revisiting saved projects.
- The first draft focuses on a single-screen business workflow rather than a full multi-screen application.
- Conversation history is stored as part of each project so the product can continue a prior draft session.
- The screen structure is limited to a small set of building blocks for the hackathon MVP.
- Live Canvas aims to look functional and believable rather than production-ready for every possible business
  workflow.

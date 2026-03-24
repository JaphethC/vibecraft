# Feature Specification: Workflow AI Builder

**Feature Branch**: `002-workflow-ai-builder`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "Based on our Constitution for 'VibeCraft', please generate a detailed Specification document. Our tech stack is Next.js (App Router), Clerk (Authentication), Convex (Real-time Database), Tailwind/shadcn, and the OpenRouter API for AI.

Project Context:

    The Need: There is a massive gap between the people who deeply understand industry workflows and the ability to create software to optimize them. VibeCraft bridges this gap by allowing users to build functional tools through natural conversation, completely bypassing traditional coding or complex drag-and-drop app builders.
    Target Audience: Non-technical domain experts, blue-collar workers, and frontline staff (e.g., a 30-year sheet metal worker, a bakery manager, a construction foreman). They know their daily problems intimately but have zero software development experience. The system must be highly accessible, forgiving, and completely free of developer jargon.

The specification must detail:

    System Architecture: How the Next.js frontend communicates with a custom Next.js API route (/api/chat), which in turn makes standard REST calls to the OpenRouter API.
    The Split-Screen Interface:
        The Coffee Chat (Left Panel): A conversational UI for user input.
        The Live Canvas (Right Panel): A dynamic rendering engine that turns the AI-generated JSON into a functional-looking React UI.
    Convex Database Schema: Define the tables needed for the MVP, specifically:
        users (Clerk ID, email)
        projects (userId, projectName, chatHistory, and appSchema which holds the generated UI JSON).
    The AI UI Schema: Define the exact JSON structure the OpenRouter AI will be instructed to output to build the UI. Because of our target audience, this schema must support simple, highly accessible, and clear components (e.g., supporting basic types like text, input, button, card, dropdown with clear, jargon-free labels).

Implementation note for the 2-day hackathon MVP: `/api/chat` will use a standard blocking request to OpenRouter and wait for a complete JSON payload before updating Live Canvas. The UI will show a visible loading state instead of streaming partial text or partial JSON.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Describe a Work Problem and See a Usable Draft Tool (Priority: P1)

A non-technical worker signs in, explains a daily work problem in their own words, and immediately sees a draft
screen on the right that looks like a practical tool they could use in real life. The draft reflects their work,
using familiar labels and clear steps rather than software-building concepts.

**Why this priority**: This is the central product promise. If the user cannot talk naturally and see a believable
result quickly, VibeCraft does not bridge the gap it was created to solve.

**Independent Test**: A first-time user signs in, starts a new project, describes a real job problem in Coffee
Chat, and sees Live Canvas render a draft tool that matches the described workflow without requiring technical
knowledge or outside help.

**Acceptance Scenarios**:

1. **Given** a signed-in user with no existing project open, **When** they describe a work problem in Coffee
   Chat, **Then** the system starts a project and Live Canvas shows a draft tool with clear, familiar labels and
   actions.
2. **Given** a user viewing the first draft tool, **When** they add more detail about their workflow,
   **Then** the visible tool updates on the right without forcing the user to start over.

---

### User Story 2 - Shape the Tool Through Ongoing Conversation (Priority: P2)

A worker improves the draft by asking for changes such as clearer sections, different fields, better button names,
or more helpful steps. The conversation continues in the same project and the visible tool keeps evolving to match
what the worker actually needs.

**Why this priority**: The product must feel collaborative and forgiving. Domain experts need room to refine the
result until it resembles how their work really happens.

**Independent Test**: A user opens an existing project, asks for several changes in Coffee Chat, and sees the
same tool evolve while the project keeps its name, conversation history, and latest visible result.

**Acceptance Scenarios**:

1. **Given** a user with an existing tool draft, **When** they ask for changes such as a new field, clearer
   wording, or grouped information, **Then** Live Canvas updates the current tool instead of replacing it with an
   unrelated draft.
2. **Given** a user who refined the draft earlier, **When** they return later, **Then** they can reopen the same
   project and continue from the saved conversation and visible result.

---

### User Story 3 - Recover Gracefully When the Result Is Unclear or Incomplete (Priority: P3)

A worker gives a vague request or receives a draft that is missing important parts. Instead of exposing developer
language or failing silently, the system explains what still needs clarification in simple terms and preserves the
last useful visible result.

**Why this priority**: Trust depends on recovery. The experience must stay understandable and safe even when the
assistant cannot create a complete result on the first try.

**Independent Test**: A user enters an unclear request or triggers an incomplete draft, and the system asks a
plain-language follow-up question while keeping the current project and the last usable visible result intact.

**Acceptance Scenarios**:

1. **Given** a user request that lacks enough work detail, **When** the system cannot create a reliable draft,
   **Then** Coffee Chat asks a simple follow-up question and Live Canvas keeps the last stable result or shows an
   understandable placeholder.
2. **Given** a partially usable draft, **When** some parts of the tool are missing or unclear, **Then** the
   system shows the usable parts and explains what additional work detail would improve the result.

### Edge Cases

- What happens when a user describes a problem with only one short sentence and not enough detail to shape a tool?
- How does the product behave when the visible draft includes some useful sections but misses an important step in
  the workflow?
- How does the conversation recover when a user asks for a change that conflicts with an earlier request?
- What happens when a signed-in user opens a saved project that has conversation history but no visible draft yet?
- How does the product respond when OpenRouter is unavailable or the user loses connection while a new draft is being prepared?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST let a signed-in user describe a work problem in plain language.
- **FR-002**: System MUST keep all user-facing responses, labels, and guidance free of developer jargon.
- **FR-003**: System MUST present Coffee Chat on the left and Live Canvas on the right for the main desktop
  experience.
- **FR-004**: System MUST show visible progress after a user sends a new message, using a loading state such as a spinner, pulse, or plain-language "Thinking..." message while waiting for a complete response.
- **FR-005**: System MUST turn structured assistant output into a functional-looking visible tool in Live Canvas from a complete, validated JSON payload returned by a standard blocking request.
- **FR-006**: System MUST allow the same project to keep evolving through ongoing conversation.
- **FR-007**: System MUST save each project's name, conversation history, and latest visible tool structure so it
  can be reopened later.
- **FR-008**: System MUST link each project to the signed-in user who owns it.
- **FR-009**: System MUST support a saved user record containing the sign-in identity and email address.
- **FR-010**: System MUST support a saved project record containing the owner reference, project name,
  conversation history, and the latest tool structure used for the visible result.
- **FR-011**: System MUST support a structured tool format that can describe simple, accessible building blocks,
  including text, input fields, buttons, cards, and dropdowns.
- **FR-012**: System MUST ensure that labels, placeholders, and action names in the visible tool stay clear,
  forgiving, and understandable for non-technical workers.
- **FR-013**: System MUST preserve the last stable visible result when a new draft cannot be safely used.
- **FR-014**: System MUST ask follow-up questions in plain language when the user's description is too incomplete
  to shape a useful tool.
- **FR-015**: System MUST let the hosted experience be demonstrated end to end in a browser.
- **FR-016**: System MUST define how sign-in, saved projects, conversation flow, and visible tool updates work
  together as one end-to-end experience.

### Key Entities *(include if feature involves data)*

- **User**: A signed-in person using VibeCraft. Key attributes include sign-in identity and email address. A
  user can own many projects.
- **Project**: A saved workspace for one draft tool. Key attributes include the owner reference, project name,
  conversation history, and the latest visible tool structure. A project belongs to one user.
- **Chat Message**: A saved conversation entry inside a project. Key attributes include speaker role, message
  text, message order, and whether the message changed the visible tool.
- **Tool Structure**: The latest saved description of the visible tool shown in Live Canvas. It contains the tool
  title, layout, sections, visible components, and action wording.
- **Tool Block**: A single visible building block inside the tool structure, such as text, input, button, card,
  or dropdown. Blocks can contain labels, helper text, placeholders, nested child blocks, and visible action
  meaning.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a demo session, at least 90% of first-time users can sign in, describe a work problem, and see
  an initial draft tool within 3 minutes.
- **SC-002**: In usability checks, at least 85% of participants can correctly explain what Coffee Chat controls
  and what Live Canvas is showing after one brief introduction.
- **SC-003**: During demos, the product shows a visible loading state within 2 seconds of a user sending a message while waiting for the blocking OpenRouter response.
- **SC-004**: At least 80% of follow-up requests update the existing project draft instead of forcing the user to
  restart from scratch.
- **SC-005**: When a request is incomplete, 100% of recovery flows present a plain-language follow-up question or
  stable fallback instead of exposing internal software terms.

## Assumptions

- Users will access the MVP through a hosted browser experience.
- Sign-in is required before creating or reopening saved projects.
- The MVP focuses on one visible work screen at a time rather than a full multi-screen application.
- Conversation history is stored as part of each project so the same draft can be continued later.
- The first version of the visible tool supports only a small set of simple building blocks.
- The visible result aims to feel practical and believable rather than fully production-ready for every industry.

# Research: Workflow AI Builder

## Decision 1: Build a Real End-to-End MVP, Not a Scripted Demo
- **Decision**: Prioritize a functional path where a signed-in user creates a project, describes a workflow, receives a generated tool structure from OpenRouter, sees it rendered in Live Canvas, and can submit generated form data back into the conversation loop.
- **Rationale**: Human judges will try unscripted ideas and an AI judge will inspect the codebase and docs, so the MVP must prove genuine behavior rather than staged screenshots.
- **Alternatives considered**:
  - Hardcoded sample flows: rejected because they would fail unscripted judge testing.
  - Static renderer without a real AI loop: rejected because it would not satisfy the product promise.

## Decision 2: Use a Narrow, Strict JSON Contract for UI Generation
- **Decision**: Instruct OpenRouter to return a strict JSON object with two main parts: a plain-language conversational reply and a validated `ui_schema` for the renderer.
- **Rationale**: A narrow contract reduces parsing failure, makes the renderer predictable, and supports a stable fallback flow when the model cannot produce a usable result.
- **Alternatives considered**:
  - Free-form AI output with ad hoc parsing: rejected because it is too fragile for hackathon judging.
  - Large component vocabulary: rejected because it expands failure surface without increasing MVP value.

## Decision 3: Keep /api/chat as the Single AI Boundary
- **Decision**: Route all AI requests through a custom Next.js Route Handler at `/api/chat`, where validation, provider calls, prompt construction, and failure handling are centralized.
- **Rationale**: This keeps secrets server-side, simplifies observability, and creates one reliable place to enforce JSON-only generation rules.
- **Alternatives considered**:
  - Client-side provider calls: rejected because credentials and prompt logic must stay protected.
  - Multiple scattered AI endpoints: rejected because it increases complexity during a 16-hour build.

## Decision 4: Store Latest Stable Schema on the Project for MVP Speed
- **Decision**: Persist the latest stable `appSchema` directly on the `projects` record while keeping chat history available for continued conversation.
- **Rationale**: This matches the requested schema, keeps the data model small enough for a hackathon, and still supports recovery by preserving the last stable visible state.
- **Alternatives considered**:
  - Full revision-history system from day one: rejected because it adds complexity that is helpful but not essential for the first judging pass.
  - No persistence of generated UI: rejected because the tool must survive reloads and return visits.

## Decision 5: Use a Small Component Set with Structured Submit Actions
- **Decision**: Support only `text`, `input`, `button`, `card`, and `dropdown` blocks in the first version, plus structured submit actions that send collected form values back into the chat context.
- **Rationale**: A small component set is easier to validate, render, and test across unscripted scenarios while still supporting many business workflows.
- **Alternatives considered**:
  - Broad component support: rejected because it would reduce reliability under time pressure.
  - Non-interactive mock screens: rejected because the judges need a functional loop, not a picture.

## Decision 6: Test with Unscripted Cross-Industry Scenarios
- **Decision**: Validate the app against at least three different workflow ideas from very different domains and include documentation that explains the architecture, renderer contract, setup steps, and future vision.
- **Rationale**: The judges will test breadth, so the MVP must prove it is domain-flexible and clearly documented.
- **Alternatives considered**:
  - Single scripted demo: rejected because it would not prove generality.
  - Architecture-only documentation: rejected because the AI judge also needs setup and scope clarity.

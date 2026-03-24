# Quickstart: Workflow AI Builder

## Goal
Validate a real end-to-end VibeCraft MVP where a signed-in user describes a workflow, receives a plain-language
assistant response, sees a generated tool render in Live Canvas, and submits generated form values back into the
conversation loop.

## Prerequisites
- The application is running locally or in a preview deployment.
- Sign-in is configured and a test account can access the app.
- Data storage is available for users, projects, and chat history.
- Server-side AI configuration is available for `/api/chat`.

## Phase-by-Phase Demo Flow

### Scenario 1: Sheet Metal Job Intake
1. Sign in and open the dashboard.
2. Start a new project.
3. In Coffee Chat, describe a tool for tracking custom sheet metal jobs.
4. Confirm a draft tool appears in Live Canvas with practical fields and actions.
5. Fill in the generated inputs and press the generated submit button.
6. Confirm the entered values are sent back into the conversation context.

### Scenario 2: Bakery Order Prep
1. Start a separate project.
2. Ask for a simple tool to organize bakery orders and pickup timing.
3. Confirm the generated tool uses plain-language labels and grouped sections.
4. Ask for a refinement such as adding allergy notes or order status.
5. Confirm the same project updates instead of resetting.

### Scenario 3: Construction Daily Check-In
1. Start another project.
2. Ask for a daily crew check-in tool for a construction foreman.
3. Confirm the generated tool includes basic structured inputs and actions.
4. Give a vague follow-up request.
5. Confirm the assistant asks a plain-language clarification question and preserves the last stable visible tool.

## Verification Checklist
- Users must sign in before accessing the main workspace.
- The dashboard route stays protected.
- Coffee Chat stays on the left and Live Canvas stays on the right in the main desktop layout.
- User-facing text stays free of developer jargon.
- `/api/chat` returns a plain-language assistant reply plus a parseable tool structure.
- Live Canvas renders supported block types safely.
- Generated submit actions return collected values into the chat context.
- Saved projects reopen with conversation history and the last stable visible tool.
- Invalid or incomplete tool structures do not wipe the current stable canvas.

## AI Judge Documentation Checklist
- README explains architecture and setup.
- README explains how the JSON-to-UI renderer works.
- FUTURE_VISION.md explains what is intentionally deferred beyond the 2-day MVP.
- Example prompts from multiple industries are included for judge testing.

# Quickstart: VibeCraft MVP Builder

## Goal
Validate the VibeCraft MVP flow where a signed-in user describes a work problem, receives streamed guidance in
Coffee Chat, and sees a stable Live Canvas update generated from structured screen output.

## Prerequisites
- The application is running in a local or preview environment.
- Sign-in is configured and a test user can access the app.
- Data storage is available for users, projects, messages, and screen revisions.
- Server-side AI configuration is available through OpenRouter.

## Demo Flow

1. Sign in with a valid user account.
2. Start a new project from the main workspace.
3. In Coffee Chat, describe a real-world work problem in plain language.
4. Confirm that the left panel shows visible progress quickly after submission.
5. Confirm that Live Canvas renders an initial draft screen on the right.
6. Ask for a refinement such as an additional field, button, or grouped card.
7. Confirm that the project stays open, the conversation history grows, and Live Canvas updates the same draft.
8. Reload the page or reopen the project.
9. Confirm that the latest stable draft and conversation history return.
10. Enter an intentionally vague request.
11. Confirm that the system asks a plain-language follow-up question and keeps the last stable visible draft.

## Verification Checklist
- The primary layout shows Coffee Chat on the left and Live Canvas on the right.
- User-facing copy stays free of technical jargon.
- A new project is created on the first successful prompt.
- The conversation history is saved and reloads correctly.
- The latest stable screen draft reloads correctly.
- Refinements update the same project instead of creating duplicates.
- Invalid or incomplete generation attempts do not erase the last stable canvas.
- Recovery prompts remain understandable to a non-technical user.

## Failure Recovery Checks
- Disconnect during generation and confirm the stable canvas remains visible.
- Trigger an invalid screen structure and confirm the new draft is rejected while the previous stable draft remains.
- Trigger a provider failure and confirm the user sees a plain-language recovery message.

## Evidence to Capture
- Screenshot of initial empty workspace.
- Screenshot of first generated split-screen result.
- Screenshot of a refined project after multiple messages.
- Screenshot of a recovery scenario that preserves the prior stable canvas.

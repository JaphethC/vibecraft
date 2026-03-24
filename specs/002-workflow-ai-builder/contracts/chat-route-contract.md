# /api/chat Contract

## Purpose
Define the request and response shape for the custom Next.js route that handles conversation updates and tool generation.

## Request

```json
{
  "projectId": "optional-existing-project-id",
  "message": "I need a better way to track custom sheet metal jobs.",
  "formSubmission": {
    "target": "job-intake-form",
    "values": {
      "customerName": "Acme Fabrication",
      "quantity": "24"
    }
  }
}
```

## Request Rules
- `projectId` is optional for the first message and required for follow-up work on an existing project.
- `message` is required unless `formSubmission` is provided as the primary follow-up event.
- `formSubmission` is optional and is used when generated canvas interactions feed data back into the chat context.
- User-facing values in `message` and `formSubmission` MUST remain plain-language.

## Success Response

```json
{
  "assistantReply": "I sketched a simple job intake tool so you can capture the key details quickly.",
  "ui_schema": {
    "schemaVersion": "1.0.0",
    "projectName": "Sheet Metal Intake",
    "screenId": "sheet-metal-intake",
    "title": "Sheet Metal Intake",
    "description": "Capture job details and next steps.",
    "layout": "single_column",
    "blocks": []
  },
  "status": "stable"
}
```

## Recovery Response

```json
{
  "assistantReply": "I can help shape this tool, but I need to know which details your team records first.",
  "ui_schema": null,
  "status": "needs_clarification"
}
```

## Contract Rules
- The route MUST return plain-language `assistantReply` text.
- The route MUST return either a validated `ui_schema` object or `null`.
- Allowed `status` values are `stable`, `needs_clarification`, and `generation_failed`.
- Invalid `ui_schema` output MUST NOT replace the current stable project schema.
- The client MUST preserve the last stable visible tool when `status` is not `stable`.

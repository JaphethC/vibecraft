# Chat Stream Contract

## Purpose
Define the server contract for streamed conversational updates shown in Coffee Chat.

## Request

```json
{
  "projectId": "optional-existing-project-id",
  "message": "I need a better way to track custom fabrication jobs.",
  "contextRevisionId": "optional-stable-schema-revision-id"
}
```

## Request Rules
- `projectId` is optional for the first message and required for follow-up messages.
- `message` is required and must contain the user's latest plain-language request.
- `contextRevisionId` is optional and, when present, identifies the current stable screen revision used as context.

## Streamed Events

### Assistant Token Event

```json
{
  "type": "assistant_token",
  "content": "Let's shape a screen that helps you capture the job details first..."
}
```

### Assistant Complete Event

```json
{
  "type": "assistant_complete",
  "messageId": "assistant-message-id"
}
```

### Schema Status Event

```json
{
  "type": "schema_status",
  "status": "validating"
}
```
```

Allowed `status` values:
- `queued`
- `streaming`
- `validating`
- `stable`
- `failed`

### Recovery Event

```json
{
  "type": "recovery_prompt",
  "content": "I can keep the current screen and improve it once you tell me which details matter most first."
}
```

## Contract Rules
- The server MUST stream assistant tokens before the final completion event when text is available.
- A `schema_status` event MUST be emitted when the screen generation state changes.
- The server MUST emit a recovery event when a usable stable screen cannot be produced.
- The client MUST treat streamed text and screen updates as separate flows.
- The client MUST keep displaying the last stable screen until a new validated revision is marked `stable`.

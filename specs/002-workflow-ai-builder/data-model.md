# Data Model: Workflow AI Builder

## User
- **Purpose**: Represents a signed-in person who creates and revisits generated workflow tools.
- **Fields**:
  - `id`: Internal record identifier
  - `clerkId`: External sign-in identity, unique
  - `email`: User email address
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp
- **Validation Rules**:
  - `clerkId` MUST be present and unique.
  - `email` MUST be present and normalized.
- **Relationships**:
  - One `User` owns many `Project` records.

## Project
- **Purpose**: Represents a saved workspace for one generated workflow tool.
- **Fields**:
  - `id`: Internal record identifier
  - `userId`: Reference to the owning `User`
  - `projectName`: User-facing project name
  - `chatHistory`: Ordered conversation summary or latest cached thread snapshot for the project
  - `appSchema`: Latest stable visible tool structure used by Live Canvas
  - `status`: Workspace status (`active`, `needs_clarification`, `generation_failed`)
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp
- **Validation Rules**:
  - `userId` MUST reference an existing `User`.
  - `projectName` MUST be present and non-empty.
  - `appSchema` MAY be null only before the first successful generation.
- **Relationships**:
  - One `Project` belongs to one `User`.
  - One `Project` has many `ChatMessage` records.

## ChatMessage
- **Purpose**: Represents a single message in Coffee Chat.
- **Fields**:
  - `id`: Internal record identifier
  - `projectId`: Reference to the parent `Project`
  - `role`: Message speaker (`user`, `assistant`, `system`)
  - `content`: Message text shown in the conversation
  - `sequence`: Ordered position within the project conversation
  - `changedSchema`: Boolean flag for whether the message produced a new visible tool structure
  - `createdAt`: Creation timestamp
- **Validation Rules**:
  - `projectId` MUST reference an existing `Project`.
  - `role` MUST be one of the allowed values.
  - `content` MUST be present.
  - `sequence` MUST be unique within a project.
- **Relationships**:
  - Many `ChatMessage` records belong to one `Project`.

## App Schema Payload
- **Purpose**: Defines the visible workflow tool rendered in Live Canvas.
- **Top-Level Fields**:
  - `schemaVersion`: Format version for compatibility checks
  - `projectName`: Suggested or confirmed project name
  - `assistantReply`: Plain-language reply shown in Coffee Chat
  - `ui_schema`: Structured screen definition object
- **ui_schema Fields**:
  - `screenId`: Unique screen identifier
  - `title`: Visible tool title
  - `description`: Short description of the tool's purpose
  - `layout`: Layout mode (`single_column`, `two_column`, `stacked_cards`)
  - `blocks`: Ordered list of visible tool blocks
- **Tool Block Base Fields**:
  - `id`: Unique block identifier
  - `type`: Block type (`text`, `input`, `button`, `card`, `dropdown`)
- **Tool Block-Specific Fields**:
  - `text`: `content`, optional `label`
  - `input`: `name`, `label`, optional `placeholder`, optional `required`
  - `button`: `label`, `action`
  - `card`: `label`, `children`
  - `dropdown`: `name`, `label`, `options`, optional `required`
- **Action Structure**:
  - `type`: `submit_form`, `send_message`, or `no_op`
  - `target`: Identifier for the related form or block
  - `messageTemplate`: Plain-language summary template for returning form values to chat context
- **Validation Rules**:
  - Unsupported block types MUST be rejected before persistence.
  - Unknown extra fields MUST be rejected.
  - Only `card` blocks MAY contain `children`.
  - Nesting depth MUST stay at one level for MVP scope.
  - `assistantReply` MUST remain plain-language and free of developer jargon.

## State Transitions

### Project
- `active` → `needs_clarification` when the assistant requires more workflow detail before a useful tool can be produced.
- `active` → `generation_failed` when a new tool structure is invalid and no replacement can be promoted.
- `needs_clarification` → `active` when the user provides enough additional detail for a valid tool.
- `generation_failed` → `active` when a later generation succeeds.

### ChatMessage
- A new user or assistant message is appended with the next `sequence` value.
- `changedSchema` is `true` when the message results in a stable update to `appSchema`.

## MVP Modeling Notes
- The MVP keeps the latest stable `appSchema` directly on the `Project` record for speed.
- A separate revision history model can be added later if time remains after the core loop is stable.
- `chatHistory` on the project can be a lightweight cached summary, while detailed messages remain in `ChatMessage` records.

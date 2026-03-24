# Data Model: VibeCraft MVP Builder

## User
- **Purpose**: Represents a signed-in person who creates and revisits draft apps.
- **Fields**:
  - `id`: Internal record identifier
  - `clerkId`: External sign-in identity, unique
  - `email`: User email address
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp
- **Validation Rules**:
  - `clerkId` MUST be present and unique.
  - `email` MUST be present and stored in normalized form.
- **Relationships**:
  - One `User` owns many `Project` records.

## Project
- **Purpose**: Represents a saved workspace for a single draft application concept.
- **Fields**:
  - `id`: Internal record identifier
  - `userId`: Reference to the owning `User`
  - `projectName`: User-facing project name
  - `status`: Workspace status (`active`, `archived`, `generation_failed`)
  - `currentStableSchemaRevisionId`: Reference to the latest validated `UiSchemaRevision`
  - `latestAttemptRevisionId`: Reference to the newest generation attempt, if any
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp
- **Validation Rules**:
  - `userId` MUST reference an existing `User`.
  - `projectName` MUST be present and non-empty.
  - `currentStableSchemaRevisionId` MAY be null only before the first successful canvas generation.
- **Relationships**:
  - One `Project` belongs to one `User`.
  - One `Project` has many `ChatMessage` records.
  - One `Project` has many `UiSchemaRevision` records.
  - One `Project` has many `GenerationAttempt` records.

## ChatMessage
- **Purpose**: Represents a single message in Coffee Chat.
- **Fields**:
  - `id`: Internal record identifier
  - `projectId`: Reference to the parent `Project`
  - `role`: Message speaker (`user`, `assistant`, `system`)
  - `content`: Message text shown in the conversation
  - `sequence`: Ordered position within the project conversation
  - `status`: Message lifecycle (`streaming`, `complete`, `error`)
  - `generationAttemptId`: Optional reference to the related `GenerationAttempt`
  - `triggeredSchemaRevisionId`: Optional reference to the `UiSchemaRevision` produced from this message
  - `createdAt`: Creation timestamp
- **Validation Rules**:
  - `projectId` MUST reference an existing `Project`.
  - `role` MUST be one of the allowed values.
  - `content` MUST be present; assistant/system content MAY be partial while `status` is `streaming`.
  - `sequence` MUST be unique within a project.
- **Relationships**:
  - Many `ChatMessage` records belong to one `Project`.

## UiSchemaRevision
- **Purpose**: Represents a versioned screen structure used by Live Canvas.
- **Fields**:
  - `id`: Internal record identifier
  - `projectId`: Reference to the parent `Project`
  - `version`: Monotonic revision number within the project
  - `schemaVersion`: Version string for the schema format
  - `schema`: Structured screen payload used for rendering
  - `schemaHash`: Optional content hash for deduplication
  - `status`: Revision state (`draft`, `stable`, `invalid`, `failed`)
  - `basedOnRevisionId`: Optional reference to the previous revision
  - `validationErrors`: Optional list of validation errors
  - `model`: Model identifier used for generation
  - `createdAt`: Creation timestamp
- **Validation Rules**:
  - `projectId` MUST reference an existing `Project`.
  - `version` MUST be unique within a project.
  - `schemaVersion` MUST be present.
  - `schema` MUST conform to the rendering contract before status can become `stable`.
  - `validationErrors` MUST be present when status is `invalid` or `failed`.
- **Relationships**:
  - Many `UiSchemaRevision` records belong to one `Project`.
  - A revision MAY reference a parent `UiSchemaRevision`.

## GenerationAttempt
- **Purpose**: Tracks an AI generation lifecycle for auditing, recovery, and fallback behavior.
- **Fields**:
  - `id`: Internal record identifier
  - `projectId`: Reference to the parent `Project`
  - `userMessageId`: Reference to the originating `ChatMessage`
  - `assistantMessageId`: Optional reference to the assistant `ChatMessage`
  - `schemaRevisionId`: Optional reference to the generated `UiSchemaRevision`
  - `requestType`: Attempt type (`chat`, `ui_schema`)
  - `model`: Requested model identifier
  - `status`: Attempt state (`queued`, `streaming`, `complete`, `failed`, `timed_out`)
  - `usageSummary`: Optional provider usage details
  - `errorMessage`: Optional failure summary
  - `startedAt`: Start timestamp
  - `finishedAt`: End timestamp
- **Validation Rules**:
  - `projectId` MUST reference an existing `Project`.
  - `requestType` MUST be one of the allowed values.
  - `status` MUST be one of the allowed values.
  - `finishedAt` MUST be present when status is terminal.
- **Relationships**:
  - Many `GenerationAttempt` records belong to one `Project`.
  - A `GenerationAttempt` MAY reference one user message, one assistant message, and one schema revision.

## Screen Structure Payload
- **Purpose**: Defines the visible screen shown in Live Canvas.
- **Top-Level Fields**:
  - `schemaVersion`: Format version for compatibility checks
  - `projectName`: Suggested or confirmed project name
  - `screen`: Screen definition object
- **Screen Fields**:
  - `id`: Unique screen identifier
  - `title`: Visible screen title
  - `description`: Short screen purpose statement
  - `layout`: Layout mode (`single_column`, `two_column`, `stacked_cards`)
  - `children`: Ordered list of component blocks
- **Component Block Fields**:
  - `id`: Unique block identifier
  - `type`: Block type (`text`, `input`, `button`, `card`, `dropdown`)
  - `label`: Display label when applicable
  - `content`: Visible text content when applicable
  - `placeholder`: Input hint when applicable
  - `children`: Nested component blocks when applicable
  - `options`: Visible choices for dropdown blocks
  - `action`: Human-readable action intent when applicable
- **Validation Rules**:
  - Unsupported block types MUST be rejected before promotion to stable.
  - Required fields MUST be present for each block type.
  - Nested `children` MUST preserve order.
  - The payload MUST remain renderable even when optional fields are absent.

## State Transitions

### Project
- `active` → `generation_failed` when the latest attempt fails and no new stable schema is produced.
- `generation_failed` → `active` when a later attempt succeeds.
- `active` → `archived` when intentionally closed from active work.

### ChatMessage
- `streaming` → `complete` when the assistant or system message is finalized.
- `streaming` → `error` when streaming is interrupted without recovery.

### UiSchemaRevision
- `draft` → `stable` after schema validation passes and the revision becomes the current canvas.
- `draft` → `invalid` when validation fails.
- `draft` → `failed` when generation ends without a usable payload.

### GenerationAttempt
- `queued` → `streaming` when provider output begins.
- `streaming` → `complete` when output and persistence finish successfully.
- `queued` or `streaming` → `failed` when generation or validation fails.
- `queued` or `streaming` → `timed_out` when the provider or connection does not complete in time.

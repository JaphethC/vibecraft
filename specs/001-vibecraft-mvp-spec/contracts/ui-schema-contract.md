# UI Schema Contract

## Purpose
Define the structured screen payload that the server accepts from the AI generation workflow before Live Canvas
can render and persist it as a stable revision.

## Top-Level Payload

```json
{
  "schemaVersion": "1.0.0",
  "projectName": "Sheet Metal Quote Helper",
  "screen": {
    "id": "quote-helper-screen",
    "title": "Quote Helper",
    "description": "Capture job details and prepare a fast estimate.",
    "layout": "single_column",
    "children": []
  }
}
```

## Field Rules
- `schemaVersion`: Required string. Initial MVP value is `1.0.0`.
- `projectName`: Required string, 1-80 characters.
- `screen`: Required object.
- `screen.id`: Required string.
- `screen.title`: Required string, 1-80 characters.
- `screen.description`: Required string, 1-160 characters.
- `screen.layout`: Required enum: `single_column`, `two_column`, `stacked_cards`.
- `screen.children`: Required ordered array of component blocks.

## Component Block Union

Each block MUST include:
- `id`: Required string
- `type`: Required enum: `text`, `input`, `button`, `card`, `dropdown`

### Text Block

```json
{
  "id": "intro-text",
  "type": "text",
  "label": "Overview",
  "content": "Describe the job and key details below."
}
```

Required fields:
- `content`

Optional fields:
- `label`

### Input Block

```json
{
  "id": "job-name",
  "type": "input",
  "label": "Job Name",
  "placeholder": "Enter the customer job name"
}
```

Required fields:
- `label`

Optional fields:
- `placeholder`

### Button Block

```json
{
  "id": "save-quote",
  "type": "button",
  "label": "Save Quote",
  "action": "Save the current quote draft"
}
```

Required fields:
- `label`
- `action`

### Card Block

```json
{
  "id": "job-details-card",
  "type": "card",
  "label": "Job Details",
  "children": [
    {
      "id": "material-type",
      "type": "dropdown",
      "label": "Material",
      "options": ["Steel", "Aluminum", "Copper"]
    }
  ]
}
```

Required fields:
- `label`
- `children`

### Dropdown Block

```json
{
  "id": "material-type",
  "type": "dropdown",
  "label": "Material",
  "options": ["Steel", "Aluminum", "Copper"]
}
```

Required fields:
- `label`
- `options` with at least one visible option

## Validation Rules
- Unknown block types MUST fail validation.
- Empty required strings MUST fail validation.
- `children` is allowed only on `card` blocks in MVP scope.
- Nested `card` blocks are allowed only one level deep in MVP scope.
- Unknown extra fields MUST be rejected before persistence.
- The server MUST preserve the previous stable revision if validation fails.

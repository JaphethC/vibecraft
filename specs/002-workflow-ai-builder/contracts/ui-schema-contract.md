# UI Schema Contract

## Purpose
Define the exact JSON structure the OpenRouter-backed assistant must return so Live Canvas can render a useful,
accessible workflow tool.

## Top-Level Payload

```json
{
  "schemaVersion": "1.0.0",
  "projectName": "Bakery Pickup Organizer",
  "assistantReply": "I created a simple tool to track pickup details and order readiness.",
  "ui_schema": {
    "screenId": "bakery-pickup-organizer",
    "title": "Bakery Pickup Organizer",
    "description": "Track orders, pickup times, and readiness.",
    "layout": "single_column",
    "blocks": []
  }
}
```

## Schema Rules
- `schemaVersion`: Required string. Initial MVP value is `1.0.0`.
- `projectName`: Required string, 1-80 characters.
- `assistantReply`: Required plain-language string with no developer jargon.
- `ui_schema`: Required object when a stable tool can be produced; otherwise returned as `null` by the chat route.

## ui_schema Fields
- `screenId`: Required string.
- `title`: Required string, 1-80 characters.
- `description`: Required string, 1-160 characters.
- `layout`: Required enum: `single_column`, `two_column`, `stacked_cards`.
- `blocks`: Required ordered array of supported blocks.

## Supported Blocks

Every block MUST include:
- `id`: Required string
- `type`: Required enum: `text`, `input`, `button`, `card`, `dropdown`

### Text Block

```json
{
  "id": "intro-text",
  "type": "text",
  "content": "Capture the customer details before starting the job."
}
```

Required fields:
- `content`

### Input Block

```json
{
  "id": "customer-name",
  "type": "input",
  "name": "customerName",
  "label": "Customer Name",
  "placeholder": "Enter the customer name",
  "required": true
}
```

Required fields:
- `name`
- `label`

Optional fields:
- `placeholder`
- `required`

### Dropdown Block

```json
{
  "id": "job-priority",
  "type": "dropdown",
  "name": "jobPriority",
  "label": "Priority",
  "options": ["Today", "This Week", "Later"]
}
```

Required fields:
- `name`
- `label`
- `options`

### Button Block

```json
{
  "id": "submit-job",
  "type": "button",
  "label": "Save Job Details",
  "action": {
    "type": "submit_form",
    "target": "job-intake-form",
    "messageTemplate": "Here are the job details I entered."
  }
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
      "id": "quantity",
      "type": "input",
      "name": "quantity",
      "label": "Quantity"
    }
  ]
}
```

Required fields:
- `label`
- `children`

## Action Contract

```json
{
  "type": "submit_form",
  "target": "job-intake-form",
  "messageTemplate": "Here are the values I entered."
}
```

Allowed `type` values:
- `submit_form`
- `send_message`
- `no_op`

## Validation Rules
- Unknown block types MUST fail validation.
- Unknown extra fields MUST fail validation.
- Only `card` blocks MAY contain `children`.
- Nesting depth MUST remain at one level for the MVP.
- Labels, placeholders, descriptions, and message templates MUST remain plain-language and understandable for non-technical workers.
- Invalid schemas MUST NOT replace the last stable visible tool.

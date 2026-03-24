# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., TypeScript 5.x, Python 3.11, Swift 5.9 or NEEDS CLARIFICATION]
**Primary Dependencies**: [e.g., Next.js App Router, Tailwind CSS, shadcn/ui, OpenRouter or NEEDS CLARIFICATION]
**Storage**: [if applicable, e.g., PostgreSQL, files, browser storage or N/A]
**Testing**: [e.g., Vitest, Playwright, pytest or NEEDS CLARIFICATION]
**Target Platform**: [e.g., modern web browsers, Linux server, iOS 15+ or NEEDS CLARIFICATION]
**Project Type**: [e.g., web app, library, cli, mobile app or NEEDS CLARIFICATION]
**Performance Goals**: [domain-specific, e.g., visible streamed feedback within 2 seconds, 60 fps interactions or NEEDS CLARIFICATION]
**Constraints**: [domain-specific, e.g., zero technical jargon in UX, split-screen conversational UI, strict typing, route-handler AI boundary, valid parseable JSON output or NEEDS CLARIFICATION]
**Scale/Scope**: [domain-specific, e.g., hackathon MVP for non-technical experts, 3 core workflows or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Zero-Tech-Jargon Rule**: Confirm all user-facing flows, copy, and acceptance criteria are expressed in human workflow language rather than engineering terminology.
- **Split-Screen, Instant-Feedback UX**: Confirm the feature defines left-panel conversation behavior, right-panel visual output, and how updates appear incrementally.
- **Modern Next.js Delivery Standards**: Confirm the plan uses Next.js App Router patterns, strict TypeScript, Tailwind CSS, and shadcn/ui-aligned component decisions when UI work is involved.
- **OpenRouter Structured AI Contracts**: Confirm all AI-driven UI updates use server-side Next.js Route Handlers, prompt the model for strict parseable JSON when generating UI state, and validate/fallback before rendering.
- **Human-Workflow Fidelity**: Confirm the feature is grounded in a real worker problem, workflow trigger, and observable outcome that a non-technical expert can validate.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., app, components, lib, specs). The delivered plan must not
  include Option labels.
-->

```text
app/
├── (workspace)/
├── api/
└── globals.css

components/
├── ui/
└── [feature-components]/

lib/
├── ai/
├── schemas/
└── [feature-modules]/

tests/
├── integration/
└── unit/
```

**Structure Decision**: [Document the selected structure and reference the real directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., temporary non-shadcn component] | [current need] | [why compliant alternative is insufficient] |
| [e.g., temporary non-JSON-safe model output path] | [specific limitation] | [why strict validated JSON is not currently possible] |

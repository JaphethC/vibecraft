# VibeCraft

**AI Workflow Builder for Non-Technical Industry Experts**

*Hackathon Submission: Building software tools through conversation, not code*

VibeCraft bridges the gap between people who deeply understand industry workflows and the ability to create software to optimize them. Build functional tools through natural conversation, completely bypassing traditional coding or complex drag-and-drop app builders.

## 🎯 Problem We Solve

Skilled workers in trades, manufacturing, and small business operations lose hours daily to:
- Paper forms and clipboards
- Disconnected spreadsheets
- Manual quote calculations
- Repetitive data entry

They know exactly what tool they need but can't build it themselves. VibeCraft lets them **describe their workflow in plain language** and generates a functional tool instantly.

## ✨ Solution

**Talk → Tool in 30 seconds**

1. Describe your workflow problem in natural language
2. AI asks clarifying questions to understand details
3. Functional UI appears with form fields, buttons, and logic
4. Refine through conversation: "Add a phone number field"
5. Submit forms back to AI for processing

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20 LTS or later
- npm, yarn, pnpm, or bun
- A [Clerk](https://clerk.com) account for authentication
- A [Convex](https://convex.dev) account for real-time database
- An [OpenRouter](https://openrouter.ai) API key for AI capabilities

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd vibecraft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your API keys:

   - **Clerk**: Get your publishable key and secret key from [Clerk Dashboard](https://dashboard.clerk.com)
   - **Convex**: Get your deployment URL from [Convex Dashboard](https://dashboard.convex.dev)
   - **OpenRouter**: Get your API key from [OpenRouter Keys](https://openrouter.ai/keys)

4. **Set up Convex backend**

   ```bash
   npx convex dev
   ```

   This will:
   - Link your Convex deployment
   - Deploy your schema and functions
   - Keep your backend in sync during development

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see VibeCraft in action.

---

## 🎤 Judge Demo Flow (5-Minute Walkthrough)

### Step 1: Sign In (30 seconds)
- Click "Sign In" with Clerk
- Choose Google or email authentication
- Lands on empty dashboard

### Step 2: First Tool Creation (2 minutes)
**Say this:** *"I need a calculator for sheet metal quotes"*

Watch the AI respond with clarifying questions. Then say:

**"Material type, thickness in millimeters, length, width, and how many pieces"**

✅ **Result:** A complete quote calculator form appears with:
- Dropdown for material types
- Input fields for measurements
- Quantity field
- Submit button

### Step 3: Refinement (1 minute)
**Say:** *"Add a field for customer name and notes"*

✅ **Result:** Form updates instantly, preserving existing fields

### Step 4: Form Submission Loop (1 minute)
1. Fill in the form with sample data
2. Click "Calculate Quote"
3. Form values send back to AI in chat
4. AI processes and responds with next steps

### Step 5: Project Persistence (30 seconds)
1. Click "New Chat" in sidebar
2. See previous project in "Recent Projects"
3. Click to reopen—full chat history and tool restored

---

## 🏭 Multi-Industry Prompt Library

### Manufacturing & Trades

**Sheet Metal Shop:**
> "I need to calculate quotes for sheet metal jobs based on material type, thickness, and quantity"

**HVAC Service:**
> "I want to track service calls with customer info, equipment type, and technician notes"

**Machine Shop:**
> "I need a job tracker for CNC machining orders with material, dimensions, and deadline"

### Food Service

**Bakery:**
> "I want to track custom cake orders with pickup dates, cake type, and special decorations"

**Catering:**
> "I need an event booking form with guest count, menu selection, and dietary restrictions"

### Construction

**Crew Management:**
> "I need a daily check-in form for my construction crew to report location and tasks"

**Material Orders:**
> "I want to track material orders for job sites with supplier, cost, and delivery date"

### Healthcare (Non-Clinical)

**Medical Office:**
> "I need an appointment reminder system with patient name, date, and insurance type"

**Dental Lab:**
> "I want to track dental crown orders with dentist, patient ID, and material shade"

---

## 📁 Project Structure

```
vibecraft/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Protected dashboard area
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── coffee-chat/        # Conversational UI components
│   │   ├── live-canvas/        # Dynamic rendering components
│   │   └── layout/             # Layout components
│   ├── lib/                    # Utilities and helpers
│   │   ├── ai/                 # OpenRouter integration
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── canvas/             # Canvas rendering logic
│   │   └── copy/               # Plain-language copy
│   └── middleware.ts           # Auth middleware
├── convex/                     # Convex backend
│   ├── schema.ts               # Database schema
│   ├── users.ts                # User functions
│   ├── projects.ts             # Project functions
│   └── chatMessages.ts         # Chat message functions
├── specs/                      # Feature specifications
│   └── 002-workflow-ai-builder/
├── _design_reference/          # Design system reference
├── .env.example                # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 16 App Router, React 19, TypeScript 5 | Server components, type safety |
| **Styling** | Tailwind CSS 4, shadcn/ui | Rapid UI development |
| **Authentication** | Clerk | Zero-config auth |
| **Database** | Convex | Real-time sync, zero ops |
| **AI** | OpenRouter (Anthropic Claude 3.5 Sonnet) | Best reasoning for workflow understanding |
| **Validation** | Zod | Runtime type safety |

---

## 🎨 Key Features

### Coffee Chat (Left Panel - 35%)
Conversational interface where users describe their workflow problems in plain language. Features:
- Real-time message persistence
- Loading state with rotating phrases
- Auto-scroll to newest message
- Form submission handoff to AI

### Live Canvas (Right Panel - 65%)
Dynamic rendering engine that transforms AI-generated JSON schemas into functional UI tools:
- **Supported blocks:** title, text, input, dropdown, button, card (recursive)
- **Stability:** Form values persist across schema refinements
- **Recovery states:** Graceful handling of unclear requests
- **Loading overlay:** Professional feedback during updates

### Split-Screen UX
Real-time collaboration between conversation and visual output:
- Visible loading states within 2 seconds
- Project history sidebar with recent projects
- Status tracking (active, needs clarification, generation failed)

---

## 🏗️ Architecture

### AI Integration Flow

```
┌─────────────┐
│   User      │
│  describes  │
│   workflow  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│  Coffee Chat (Left Panel)       │
│  - Captures natural language    │
│  - Sends to /api/chat           │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  /api/chat (Next.js Route)      │
│  - Validates request            │
│  - Adds project context         │
│  - Calls OpenRouter (blocking)  │
│  - Parses JSON response         │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  OpenRouter API                 │
│  - Model: Claude 3.5 Sonnet     │
│  - System prompt + context      │
│  - Returns {reply, ui_schema}   │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Live Canvas (Right Panel)      │
│  - DynamicRenderer component    │
│  - Maps blocks to React         │
│  - Preserves form state         │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Convex Database                │
│  - Persists projects            │
│  - Stores chat history          │
│  - Tracks schema versions       │
└─────────────────────────────────┘
```

### Database Schema

```typescript
// Convex Schema
projects: {
  userId: string;           // Clerk user ID
  projectName: string;      // Auto-generated or AI-suggested
  chatHistory: [{          // Ordered messages
    role: "user" | "assistant",
    content: string,
    timestamp: number
  }];
  appSchema: UIBlock[];     // Current tool structure
  status: "active" | "needs_clarification" | "generation_failed";
  createdAt: number;
  updatedAt: number;
}

users: {
  clerkId: string;          // Auth provider ID
  email: string;
  createdAt: number;
}
```

---

## 🧪 Development

### Available Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

### Verification

For the hackathon MVP, we use lightweight verification:

```bash
npm run lint && npm run typecheck && npm run build
```

All three must pass for deployment.

---

## 🎯 Design Principles

| Principle | Description |
|-----------|-------------|
| **Zero Tech Jargon** | All user-facing copy speaks the language of work, not software |
| **Tactile Companion** | Sturdy, soft UI with large radius corners and tonal layering |
| **Instant Feedback** | Visible progress within 2 seconds of any user action |
| **Graceful Recovery** | Clear, plain-language error messages and fallback states |
| **Conversation First** | AI asks clarifying questions before building |

---

## 📋 Demo Scenarios

Try these workflows to test the MVP:

### Scenario 1: Sheet Metal Quote Calculator
1. "I need to calculate quotes for sheet metal jobs"
2. "Material type, thickness in mm, length, width, and quantity"
3. Fill in the form and submit
4. AI processes the calculation

### Scenario 2: Bakery Order Tracker
1. "I want to track custom cake orders"
2. "Customer name, pickup date, cake flavor, special decorations"
3. Refine: "Add a field for phone number"
4. See project saved in sidebar

### Scenario 3: Construction Crew Check-in
1. "I need a daily check-in form for my crew"
2. "Worker name, job site location, current task, safety notes"
3. Submit form values back to AI
4. AI acknowledges and provides next steps

---

## 🔮 Future Vision (Post-MVP Roadmap)

### Richer Block Types
- Tables for data display
- Charts and graphs
- File upload fields
- Date/time pickers
- Signature capture

### Revision History
- View previous schema versions
- Roll back to earlier iterations
- Compare changes side-by-side

### Code Export
- Export as React component
- Export as HTML/CSS
- Deploy to Vercel/Netlify
- Generate backend API

### Voice & Multi-Modal
- Voice input for hands-free operation
- Image upload for reference sketches
- Multi-screen application generation

### Team Collaboration
- Share projects with team members
- Comment and feedback on tools
- Role-based permissions

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 👥 Team

Built for the Hackathon MVP by a team passionate about democratizing software creation for non-technical workers.

---

## 📄 License

MIT

# VibeCraft

**AI Workflow Builder for Non-Technical Industry Experts**

VibeCraft bridges the gap between people who deeply understand industry workflows and the ability to create software to optimize them. Build functional tools through natural conversation, completely bypassing traditional coding or complex drag-and-drop app builders.

## Quick Start

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

## Project Structure

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

## Tech Stack

- **Frontend**: Next.js 16 App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Authentication**: Clerk
- **Database**: Convex (real-time)
- **AI**: OpenRouter API (server-side REST calls)
- **Validation**: Zod

## Key Features

### Coffee Chat (Left Panel)
Conversational interface where users describe their workflow problems in plain language.

### Live Canvas (Right Panel)
Dynamic rendering engine that transforms AI-generated JSON schemas into functional-looking UI tools.

### Split-Screen UX
Real-time collaboration between conversation and visual output, with visible loading states and graceful error handling.

## Development

### Available Scripts

```bash
npm run dev        # Start development server
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

## Architecture

### AI Integration Flow

1. User submits a workflow description in Coffee Chat
2. Request is validated and sent to `/api/chat`
3. Server makes a **blocking request** to OpenRouter API
4. UI shows visible loading state while waiting
5. Complete JSON payload is parsed and validated
6. Live Canvas renders the validated tool schema
7. Project and chat history are persisted in Convex

### Database Schema

- **users**: Clerk ID, email address
- **projects**: Owner reference, project name, chat history, latest app schema
- **chatMessages**: Project reference, role, message text, timestamp

## Design Principles

- **Zero Tech Jargon**: All user-facing copy speaks the language of work, not software
- **Tactile Companion**: Sturdy, soft UI with large radius corners and tonal layering
- **Instant Feedback**: Visible progress within 2 seconds of any user action
- **Graceful Recovery**: Clear, plain-language error messages and fallback states

## Demo Scenarios

Try these workflows to test the MVP:

1. **Sheet Metal Quote Calculator**: "I need to calculate quotes for sheet metal jobs based on material type, thickness, and quantity"
2. **Bakery Order Tracker**: "I want to track custom cake orders with pickup dates and customer contact info"
3. **Construction Crew Check-in**: "I need a daily check-in form for my construction crew to report their location and tasks"

## Future Vision

Post-MVP roadmap items:

- Richer block types (tables, charts, file uploads)
- Schema revision history
- Code export functionality
- Voice-based input
- Multi-screen application generation

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## License

MIT

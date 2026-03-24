# Convex Setup Guide

This document explains how to set up and configure Convex for VibeCraft.

## Quick Start

### 1. Create a Convex Account

1. Go to [https://dashboard.convex.dev](https://dashboard.convex.dev)
2. Sign up or sign in
3. Create a new deployment for VibeCraft

### 2. Configure Environment Variables

Copy your Convex deployment URL from the dashboard and add it to `.env.local`:

```bash
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

### 3. Install Convex CLI

If you haven't already, install the Convex CLI globally:

```bash
npm install -g convex
```

### 4. Login to Convex

```bash
npx convex login
```

### 5. Link Your Deployment

From the project root, run:

```bash
npx convex dev
```

This will:
- Link your local project to your Convex deployment
- Deploy your schema and functions
- Watch for changes and sync automatically

## Project Structure

```
convex/
├── README.md           # This file
├── schema.ts           # Database schema definition
├── users.ts            # User-related functions
├── projects.ts         # Project-related functions
└── chatMessages.ts     # Chat message functions
```

## Database Schema

Our MVP schema includes three main tables:

### `users`
- `clerkId` (string, unique): Clerk user ID
- `email` (string): User's email address
- `createdAt` (number): Timestamp

### `projects`
- `userId` (id): Reference to users table
- `name` (string): Project name
- `chatHistory` (array): Array of chat messages
- `appSchema` (optional object): Latest stable UI schema
- `status` (string): 'active' | 'needs_clarification' | 'generation_failed'
- `createdAt` (number): Timestamp
- `updatedAt` (number): Timestamp

### `chatMessages`
- `projectId` (id): Reference to projects table
- `role` (string): 'user' | 'assistant'
- `message` (string): Message content
- `order` (number): Message order in conversation
- `createdAt` (number): Timestamp

## Using Convex in Components

### Query Data

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ProjectList() {
  const projects = useQuery(api.projects.list);

  return (
    <div>
      {projects?.map((project) => (
        <div key={project._id}>{project.name}</div>
      ))}
    </div>
  );
}
```

### Mutate Data

```tsx
"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function CreateProjectButton() {
  const createProject = useMutation(api.projects.create);

  const handleClick = async () => {
    await createProject({ name: "My New Project" });
  };

  return <button onClick={handleClick}>Create Project</button>;
}
```

### Subscribe to Real-time Updates

Convex automatically subscribes to data changes. When data changes, your components will re-render with the new data.

## Authentication

Convex is integrated with Clerk via `ConvexProviderWithClerk`. All queries and mutations automatically include the user's authentication context.

### Get Current User in Functions

```ts
// convex/users.ts
import { query } from "./_generated/server";

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    // Find or create user record
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    return user;
  },
});
```

## Common Commands

```bash
# Start development (watch mode)
npx convex dev

# Deploy to production
npx convex deploy

# View logs
npx convex logs

# Run a function from the CLI
npx convex run users.getCurrent

# Export data
npx convex export
```

## Troubleshooting

### "Not authenticated" errors
- Ensure you're wrapped in `ConvexProviderWithClerk`
- Check that Clerk is properly configured
- Verify the user is signed in

### Schema deployment errors
- Run `npx convex dev` to sync schema changes
- Check for TypeScript errors in schema files

### Connection issues
- Verify `NEXT_PUBLIC_CONVEX_URL` is correct
- Check that your deployment is active in the Convex dashboard

## Resources

- [Convex Documentation](https://docs.convex.dev)
- [Convex + Clerk Integration](https://docs.convex.dev/auth/clerk)
- [Convex React SDK](https://docs.convex.dev/client/react)

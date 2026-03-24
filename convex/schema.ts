import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - stores user profile information synced from Clerk
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Projects table - stores workflow projects with chat history and generated UI schema
  projects: defineTable({
    userId: v.string(),
    projectName: v.string(),
    chatHistory: v.array(
      v.object({
        role: v.string(),
        content: v.string(),
        timestamp: v.number(),
      })
    ),
    appSchema: v.optional(v.any()),
    status: v.union(
      v.literal("active"),
      v.literal("needs_clarification"),
      v.literal("generation_failed")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_status", ["status"]),
});

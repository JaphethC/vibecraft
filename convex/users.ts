import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Sync or create user record from Clerk authentication
 * Called when a user signs in or signs up
 */
export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      // User exists, return existing record
      return existingUser;
    }

    // Create new user record
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      createdAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

/**
 * Get current user by Clerk ID
 * Used to fetch the authenticated user's database record
 */
export const getCurrentUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

/**
 * Get user by ID
 * Used for looking up other users (e.g., project collaborators)
 */
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

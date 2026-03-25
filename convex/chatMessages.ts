import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all chat messages for a project
 */
export const getChatMessages = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    // Note: Chat messages are stored in the project's chatHistory array
    // This query returns them in a normalized format
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      return [];
    }

    return project.chatHistory.map((msg, index) => ({
      _id: `${args.projectId}_${index}` as const,
      projectId: args.projectId,
      role: msg.role,
      message: msg.content,
      order: index,
      timestamp: msg.timestamp,
    }));
  },
});

/**
 * Get the latest chat message for a project
 */
export const getLatestMessage = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project || project.chatHistory.length === 0) {
      return null;
    }

    const lastMessage = project.chatHistory[project.chatHistory.length - 1];
    return {
      role: lastMessage.role,
      content: lastMessage.content,
      timestamp: lastMessage.timestamp,
    };
  },
});

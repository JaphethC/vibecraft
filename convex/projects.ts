import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new project for the authenticated user
 */
export const createProject = mutation({
  args: {
    userId: v.string(),
    projectName: v.string(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      userId: args.userId,
      projectName: args.projectName,
      chatHistory: [],
      appSchema: undefined,
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(projectId);
  },
});

/**
 * Get all projects for a specific user
 */
export const getUserProjects = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

/**
 * Get a single project by ID
 */
export const getProjectById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

/**
 * Add a chat message to a project's chat history
 */
export const addChatMessage = mutation({
  args: {
    projectId: v.id("projects"),
    role: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const newChatHistory = [
      ...project.chatHistory,
      {
        role: args.role,
        content: args.content,
        timestamp: Date.now(),
      },
    ];

    await ctx.db.patch(args.projectId, {
      chatHistory: newChatHistory,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.projectId);
  },
});

/**
 * Update the appSchema (AI-generated UI schema) for a project
 */
export const updateAppSchema = mutation({
  args: {
    projectId: v.id("projects"),
    appSchema: v.any(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(args.projectId, {
      appSchema: args.appSchema,
      status: "active",
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.projectId);
  },
});

/**
 * Update project status (for recovery flows)
 */
export const updateProjectStatus = mutation({
  args: {
    projectId: v.id("projects"),
    status: v.union(
      v.literal("active"),
      v.literal("needs_clarification"),
      v.literal("generation_failed")
    ),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(args.projectId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.projectId);
  },
});

/**
 * Update project name
 */
export const updateProjectName = mutation({
  args: {
    projectId: v.id("projects"),
    projectName: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(args.projectId, {
      projectName: args.projectName,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.projectId);
  },
});

/**
 * Delete a project
 */
export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.delete(args.projectId);
    return { success: true };
  },
});

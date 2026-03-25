"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

interface ProjectHistoryProps {
  currentProjectId?: Id<"projects">;
}

/**
 * Project History - Shows list of user's past projects in sidebar
 * Allows clicking to reopen a previous conversation
 */
export function ProjectHistory({ currentProjectId }: ProjectHistoryProps) {
  const { user, isLoaded } = useUser();

  // Get projects for the current user
  const projects = useQuery(
    api.projects.getUserProjects,
    isLoaded && user ? { userId: user.id } : "skip"
  );

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="px-4 py-3 text-sm text-on-surface-variant animate-pulse">
        Loading...
      </div>
    );
  }

  // Show empty state if no projects
  if (!projects || projects.length === 0) {
    return (
      <div className="px-4 py-3 text-sm text-on-surface-variant">
        No recent projects
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
      <div className="px-4 py-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
        Recent Projects
      </div>
      {projects.map((project) => (
        <Link
          key={project._id}
          href={`/dashboard/${project._id}`}
          className={`
            block px-4 py-3 rounded-xl transition-all hover:bg-surface-container-low
            ${
              project._id === currentProjectId
                ? "bg-surface-container text-primary font-semibold"
                : "text-on-surface-variant"
            }
          `}
        >
          <div className="font-medium text-sm truncate">{project.projectName}</div>
          <div className="text-xs text-on-surface-variant mt-1">
            {new Date(project.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </Link>
      ))}
    </div>
  );
}

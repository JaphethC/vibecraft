"use client";

import { EMPTY_STATES, RECOVERY_STATES } from "@/lib/copy/plain-language";
import type { Id } from "../../../convex/_generated/dataModel";

interface RecoveryStateProps {
  status?: "empty" | "needs_clarification" | "generation_failed";
  projectName?: string;
  onRetry?: () => void;
  onClarify?: () => void;
}

/**
 * Recovery State - Shows friendly recovery UI when generation has issues
 * Preserves user confidence by never showing broken/blank states
 */
export function RecoveryState({
  status = "empty",
  projectName,
  onRetry,
  onClarify,
}: RecoveryStateProps) {
  if (status === "needs_clarification") {
    return (
      <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-amber-600 text-4xl">
            help_outline
          </span>
        </div>
        <h2 className="headline-lg text-on-surface mb-3">
          {RECOVERY_STATES.clarification.title}
        </h2>
        <p className="body-lg text-on-surface-variant max-w-md mb-6">
          {RECOVERY_STATES.clarification.message}
        </p>
        <div className="flex gap-3">
          {onClarify && (
            <button
              onClick={onClarify}
              className="bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary-dim transition-all active:scale-95"
              type="button"
            >
              Provide More Details
            </button>
          )}
        </div>
      </div>
    );
  }

  if (status === "generation_failed") {
    return (
      <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-red-600 text-4xl">
            sync_problem
          </span>
        </div>
        <h2 className="headline-lg text-on-surface mb-3">
          {RECOVERY_STATES.generationFailed.title}
        </h2>
        <p className="body-lg text-on-surface-variant max-w-md mb-6">
          {RECOVERY_STATES.generationFailed.message}
        </p>
        {projectName && (
          <p className="body text-on-surface-variant mb-6">
            Your last stable version of <strong className="text-on-surface font-semibold">"{projectName}"</strong> is still available below.
          </p>
        )}
        <div className="flex gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary-dim transition-all active:scale-95"
              type="button"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty state - no tool built yet
  return (
    <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-on-surface-variant text-4xl">
          dashboard
        </span>
      </div>
      <h2 className="headline-lg text-on-surface mb-3">
        {EMPTY_STATES.canvas.title}
      </h2>
      <p className="body-lg text-on-surface-variant max-w-md">
        {EMPTY_STATES.canvas.description}
      </p>
    </div>
  );
}

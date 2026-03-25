"use client";

import { useToast } from "@/components/ui/toast";
import type { UIBlock } from "@/lib/schemas/ui-schema";
import { DynamicRenderer } from "./dynamic-renderer";
import { RecoveryState } from "./recovery-state";

interface CanvasPanelProps {
  schema?: UIBlock[] | null;
  isLoading?: boolean;
  onSubmit?: (formData: { values: Record<string, string>; buttonLabel: string }) => void;
  status?: "active" | "needs_clarification" | "generation_failed";
  projectName?: string;
}

export function CanvasPanel({
  schema = null,
  isLoading = false,
  onSubmit,
  status = "active",
  projectName,
}: CanvasPanelProps) {
  const { showInfo } = useToast();
  const isEmpty = !schema || schema.length === 0;
  const showRecovery = status === "needs_clarification" || status === "generation_failed";

  const handleComingSoon = () => {
    showInfo("Coming Soon: This feature is planned for the post-hackathon roadmap!");
  };

  return (
    <section className="hidden md:flex flex-1 flex-col dot-grid relative overflow-hidden">
      <nav className="h-16 flex justify-between items-center px-8 bg-white/80 backdrop-blur-md z-10 border-none">
        <div className="flex items-center gap-4">
          <button
            onClick={handleComingSoon}
            className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined">undo</span>
          </button>
          <div className="h-6 w-px bg-outline-variant/30" />
          <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
            Editing Preview
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleComingSoon}
            className="text-primary-dim font-bold px-4 py-2 rounded-lg hover:bg-primary-container/20 transition-colors"
            type="button"
          >
            Preview Mode
          </button>
          <button
            onClick={handleComingSoon}
            className="bg-primary text-on-primary font-bold px-6 h-10 rounded-full flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
            type="button"
          >
            <span>Publish App</span>
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 relative">
        {showRecovery ? (
          <RecoveryState
            status={status}
            projectName={projectName}
            onRetry={() => console.log("Retry clicked")}
            onClarify={() => console.log("Clarify clicked")}
          />
        ) : isEmpty ? (
          <RecoveryState status="empty" />
        ) : (
          <div className="relative">
            <DynamicRenderer schema={schema} onSubmit={onSubmit} isLoading={isLoading} />
            
            {/* Loading overlay during schema updates */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-xl flex items-center justify-center pointer-events-none">
                <div className="bg-white shadow-lg rounded-lg px-6 py-4 flex items-center gap-3">
                  <span className="material-symbols-outlined animate-spin text-primary">
                    progress_activity
                  </span>
                  <span className="text-sm font-medium text-on-surface">Updating...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-8 right-8 flex gap-3">
        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-sm">check</span>
          </div>
          <span className="text-sm font-semibold text-on-surface">
            Live Sync Active
          </span>
        </div>
      </div>
    </section>
  );
}

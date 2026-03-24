"use client";

import { EMPTY_STATES } from "@/lib/copy/plain-language";

interface CanvasPanelProps {
  isEmpty?: boolean;
  isLoading?: boolean;
}

/**
 * Live Canvas Panel - Right side of the split-screen dashboard
 * Displays the dynamic renderer or empty state
 */
export function CanvasPanel({
  isEmpty = true,
  isLoading = false,
}: CanvasPanelProps) {
  return (
    <section className="hidden md:flex flex-1 flex-col dot-grid relative overflow-hidden">
      {/* Top Bar */}
      <nav className="h-16 flex justify-between items-center px-8 bg-white/80 backdrop-blur-md z-10 border-none">
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">undo</span>
          </button>
          <div className="h-6 w-px bg-outline-variant/30"></div>
          <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
            Editing Preview
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-primary-dim font-bold px-4 py-2 rounded-lg hover:bg-primary-container/20 transition-colors">
            Preview Mode
          </button>
          <button className="bg-primary text-on-primary font-bold px-6 h-10 rounded-full flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
            <span>Publish App</span>
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
          </button>
        </div>
      </nav>

      {/* Canvas Content */}
      <div className="flex-1 flex items-center justify-center p-12">
        {isEmpty ? (
          /* Empty State */
          <div className="text-center">
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
        ) : (
          /* Dynamic Renderer will go here */
          <div className="w-full max-w-2xl">
            {/* Placeholder for future dynamic renderer */}
            <div className="text-center text-on-surface-variant">
              <p>Tool rendering coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Live Sync Badge */}
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

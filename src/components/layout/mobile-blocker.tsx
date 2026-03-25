"use client";

import { Laptop } from "lucide-react";

/**
 * Mobile Blocker - Friendly message for small screen users
 * VibeCraft's split-screen UX requires tablet/desktop screens
 * Only displays on screens smaller than md (768px)
 */
export function MobileBlocker() {
  return (
    <div className="flex md:hidden h-screen w-full flex-col items-center justify-center bg-surface p-6 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container">
        <Laptop className="h-10 w-10 text-primary" />
      </div>

      {/* Title */}
      <h1 className="mb-3 text-2xl font-bold text-on-surface">
        VibeCraft needs a little more room!
      </h1>

      {/* Message */}
      <p className="mb-6 max-w-md text-on-surface-variant">
        VibeCraft's magic happens side-by-side. To build your tools, please open
        this app on a tablet or desktop computer.
      </p>

      {/* Visual hint */}
      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">devices</span>
        <span>Best experience on screens 768px and wider</span>
      </div>
    </div>
  );
}

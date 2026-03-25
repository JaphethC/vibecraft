"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { ProjectHistory } from "./project-history";
import type { Id } from "../../../convex/_generated/dataModel";

interface AppSidebarProps {
  userId: string;
}

export function AppSidebar({ userId }: AppSidebarProps) {
  const pathname = usePathname();
  const { showInfo } = useToast();

  // Extract projectId from URL if on a project page
  const currentProjectId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)?.[1] as Id<"projects"> | undefined;

  const handleComingSoon = () => {
    showInfo("Coming Soon: This feature is planned for the post-hackathon roadmap!");
  };

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-white w-20 lg:w-64 shadow-[20px_0_40px_rgba(55,98,137,0.04)] border-r-0">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-on-primary">auto_awesome</span>
          </div>
          <div className="hidden lg:block">
            <div className="text-xl font-headline font-black text-primary tracking-tight">
              VibeCraft
            </div>
            <div className="text-xs text-on-surface-variant">
              Your Tactile Companion
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 mt-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary text-on-primary font-semibold hover:bg-primary-dim transition-all active:scale-[0.98] w-full"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="hidden lg:block">New Chat</span>
        </Link>
      </div>

      {/* Project History */}
      <ProjectHistory userId={userId} currentProjectId={currentProjectId} />

      {/* Bottom Nav - Coming Soon Features */}
      <nav className="mt-auto px-2 pb-4 space-y-1">
        <button
          onClick={handleComingSoon}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-[0.98]"
          type="button"
        >
          <span className="material-symbols-outlined">history</span>
          <span className="hidden lg:block font-semibold">History</span>
        </button>
        <button
          onClick={handleComingSoon}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-[0.98]"
          type="button"
        >
          <span className="material-symbols-outlined">layers</span>
          <span className="hidden lg:block font-semibold">Templates</span>
        </button>
        <button
          onClick={handleComingSoon}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-[0.98]"
          type="button"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="hidden lg:block font-semibold">Settings</span>
        </button>
      </nav>
    </aside>
  );
}

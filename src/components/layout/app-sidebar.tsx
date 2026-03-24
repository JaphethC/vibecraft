"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButtons } from "@/components/auth/auth-buttons";

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "New Chat",
      href: "/dashboard",
      icon: "add_comment",
      active: pathname === "/dashboard",
    },
    {
      label: "History",
      href: "/dashboard/history",
      icon: "history",
      active: pathname === "/dashboard/history",
    },
    {
      label: "Templates",
      href: "/dashboard/templates",
      icon: "layers",
      active: pathname === "/dashboard/templates",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      active: pathname === "/dashboard/settings",
    },
  ];

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

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-2 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-2xl transition-all active:scale-[0.98]
              ${
                item.active
                  ? "bg-surface-container text-primary font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }
            `}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="hidden lg:block font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Upgrade CTA */}
      <div className="p-4 mt-auto">
        <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-xl font-semibold hover:bg-opacity-80 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">star</span>
          <span className="hidden lg:block">Upgrade Plan</span>
        </button>
      </div>
    </aside>
  );
}

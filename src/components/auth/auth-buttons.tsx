"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

interface AuthButtonsProps {
  /**
   * "header" - Shows compact buttons in navigation bar, UserButton avatar when signed in
   * "cta" - Shows large CTA buttons for hero/CTA sections, links to dashboard when signed in
   */
  variant?: "header" | "cta";
}

export function AuthButtons({ variant = "header" }: AuthButtonsProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    if (variant === "cta") {
      return (
        <div className="h-16 w-48 bg-surface-container-highest rounded-xl animate-pulse" />
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-20 bg-surface-container-highest rounded-xl animate-pulse" />
      </div>
    );
  }

  // Header variant - compact navigation buttons
  if (variant === "header") {
    if (isSignedIn) {
      return (
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full",
              userButtonPopoverCard: "bg-surface-container-lowest shadow-xl",
              userButtonPopoverActionButton: "text-on-surface hover:bg-surface-container",
            },
          }}
          afterSignOutUrl="/"
        />
      );
    }

    return (
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <button className="btn-secondary">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn-primary">
            Get Started
          </button>
        </SignUpButton>
      </div>
    );
  }

  // CTA variant - large prominent buttons for hero/CTA sections
  if (isSignedIn) {
    return (
      <Link href="/dashboard">
        <button className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-surface-container transition-colors text-lg">
          Open Dashboard
        </button>
      </Link>
    );
  }

  return (
    <div className="flex gap-4">
      <SignInButton mode="modal">
        <button className="btn-primary" style={{ height: '4rem', fontSize: '1.125rem', padding: '0 2.5rem' }}>
          Start Building Free
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-surface-container transition-colors text-lg">
          Get Started
        </button>
      </SignUpButton>
    </div>
  );
}

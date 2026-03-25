import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { MobileBlocker } from "@/components/layout/mobile-blocker";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      {/* Mobile Blocker - Shows only on small screens */}
      <MobileBlocker />

      {/* Desktop Dashboard - Hidden on small screens */}
      <div className="hidden md:flex h-screen flex-col bg-surface">
        {/* Sidebar Navigation - Fixed Position */}
        <AppSidebar />

        {/* Main Content Area - Offset by sidebar width */}
        <div className="flex-1 flex flex-col ml-20 lg:ml-64 overflow-hidden">
          {/* Dashboard Header - Clean bar with just user profile */}
          <header className="h-16 bg-surface-container-low border-b border-outline-variant/10 flex items-center justify-end px-6">
            <AuthButtons variant="header" />
          </header>

          {/* Main Content - Chat and Canvas (key forces re-mount on navigation) */}
          <DashboardContent key="new-chat" />
        </div>
      </div>
    </>
  );
}

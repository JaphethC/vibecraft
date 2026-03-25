import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

interface DashboardPageProps {
  params: Promise<{ projectId?: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const resolvedParams = await params;
  const projectId = resolvedParams.projectId;
  const userEmail = user.emailAddresses[0]?.emailAddress || "User";

  return (
    <div className="h-screen flex flex-col bg-surface">
      {/* Sidebar Navigation - Fixed Position */}
      <AppSidebar userId={userEmail} />

      {/* Main Content Area - Offset by sidebar width */}
      <div className="flex-1 flex flex-col ml-20 lg:ml-64 overflow-hidden">
        {/* Dashboard Header - Clean bar with just user profile */}
        <header className="h-16 bg-surface-container-low border-b border-outline-variant/10 flex items-center justify-end px-6">
          <AuthButtons variant="header" />
        </header>

        {/* Main Content - Chat and Canvas */}
        <DashboardContent userEmail={userEmail} projectId={projectId} />
      </div>
    </div>
  );
}

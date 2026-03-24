import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="h-screen flex flex-col bg-surface">
      {/* Dashboard Header */}
      <header className="h-16 bg-surface-container-low border-b border-outline-variant/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-sm">auto_awesome</span>
          </div>
          <div>
            <h1 className="headline-md text-on-surface">VibeCraft</h1>
            <p className="label-sm text-on-surface-variant">Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-sm">person</span>
            </div>
            <span className="body-sm text-on-surface-variant hidden sm:inline">
              {user.firstName || user.emailAddresses[0]?.emailAddress}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen Placeholder */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Coffee Chat Placeholder */}
        <section className="w-full md:w-[35%] border-r border-outline-variant/10 bg-surface-container-low flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-on-primary-container text-2xl">chat</span>
            </div>
            <h2 className="headline-md text-on-surface mb-2">Coffee Chat</h2>
            <p className="body-md text-on-surface-variant">
              Describe your workflow problem here
            </p>
          </div>
        </section>

        {/* Right Panel - Live Canvas Placeholder */}
        <section className="hidden md:flex flex-1 flex-col dot-grid items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-on-tertiary-container text-2xl">dashboard</span>
            </div>
            <h2 className="headline-md text-on-surface mb-2">Live Canvas</h2>
            <p className="body-md text-on-surface-variant">
              Your tool will appear here
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AuthButtons } from "@/components/auth/auth-buttons";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="h-screen flex flex-col bg-surface">
      {/* Sidebar Navigation - Fixed Position */}
      <AppSidebar />

      {/* Main Content Area - Offset by sidebar width */}
      <div className="flex-1 flex flex-col ml-20 lg:ml-64 overflow-hidden">
        {/* Dashboard Header - Clean bar with just user profile */}
        <header className="h-16 bg-surface-container-low border-b border-outline-variant/10 flex items-center justify-end px-6">
          <AuthButtons variant="header" />
        </header>

        {/* Main Content - Split Screen Layout (35% / 65%) */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel - Coffee Chat (35%) */}
          <section className="w-full md:w-[35%] flex flex-col bg-surface-container-low border-r border-outline-variant/10">
            {/* Chat Header */}
            <header className="p-6 bg-surface-container-low flex justify-between items-center border-b border-outline-variant/5">
              <h1 className="text-xl font-headline font-bold text-on-surface">Tell me about your workflow</h1>
              <button className="p-2 text-primary hover:bg-surface-container transition-colors rounded-full active:scale-90">
                <span className="material-symbols-outlined">add</span>
              </button>
            </header>

            {/* Message Area - Placeholder */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* AI Welcome Bubble */}
              <div className="flex items-start gap-4 max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-primary-container" data-icon="smart_toy">smart_toy</span>
                </div>
                <div className="bg-surface-container rounded-2xl rounded-tl-none p-5 shadow-sm">
                  <p className="text-on-surface leading-relaxed">Hi! What repetitive task is slowing you down today?</p>
                </div>
              </div>

              {/* Generation Indicator */}
              <div className="flex items-center gap-3 text-on-surface-variant italic text-sm">
                <span className="material-symbols-outlined animate-pulse">auto_awesome</span>
                <span>Ready to build your tool...</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-surface-container-low">
              <div className="relative flex items-center gap-3">
                <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden focus-within:ring-2 ring-primary/20 transition-all">
                  <input
                    className="w-full h-14 px-6 bg-transparent border-none focus:ring-0 text-on-surface"
                    placeholder="Explain your needs..."
                    type="text"
                  />
                </div>
                <button className="h-14 px-6 rounded-xl bg-primary text-on-primary font-bold flex items-center gap-2 hover:bg-primary-dim transition-all active:scale-95 shadow-lg shadow-primary/20">
                  <span>Send</span>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right Panel - Live Canvas (65%) */}
          <section className="hidden md:flex flex-1 flex-col dot-grid relative overflow-hidden">
            {/* Top Bar */}
            <nav className="h-16 flex justify-between items-center px-8 bg-white/80 backdrop-blur-md z-10 border-none">
              <div className="flex items-center gap-4">
                <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95">
                  <span className="material-symbols-outlined">undo</span>
                </button>
                <div className="h-6 w-px bg-outline-variant/30"></div>
                <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Editing Preview</span>
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

            {/* Canvas Center - Empty State */}
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-on-surface-variant text-4xl">dashboard</span>
                </div>
                <h2 className="headline-lg text-on-surface mb-3">Your tool will appear here</h2>
                <p className="body-lg text-on-surface-variant max-w-md">
                  Describe your workflow in the chat on the left, and watch as a functional tool takes shape on this canvas.
                </p>
              </div>
            </div>

            {/* Decorative Live Sync Badge */}
            <div className="absolute bottom-8 right-8 flex gap-3">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">Live Sync Active</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

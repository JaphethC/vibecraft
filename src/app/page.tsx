import Link from "next/link";
import { AuthButtons } from "@/components/auth/auth-buttons";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Navigation */}
      <header className="border-b border-outline-variant/10 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">auto_awesome</span>
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold text-primary">VibeCraft</h1>
              <p className="text-xs text-on-surface-variant">Your Tactile Companion</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <AuthButtons variant="header" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h2 className="display-lg text-on-surface mb-6">
              Build software by describing your work
            </h2>
            <p className="body-lg text-on-surface-variant mb-10">
              VibeCraft bridges the gap between people who deeply understand industry workflows
              and the ability to create software to optimize them. No coding. No drag-and-drop.
              Just conversation.
            </p>
            <div className="flex gap-4">
              <AuthButtons variant="cta" />
              <a
                href="#how-it-works"
                className="btn-secondary"
                style={{ height: '4rem', fontSize: '1rem', padding: '0 2rem' }}
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-surface-container py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="headline-lg text-on-surface mb-12 text-center">
              How VibeCraft Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="card">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-on-primary-container text-xl">chat</span>
                </div>
                <h4 className="headline-md text-on-surface mb-2">1. Describe Your Problem</h4>
                <p className="body-md text-on-surface-variant">
                  Tell us about a repetitive task or workflow that&apos;s slowing you down. Use your own words,
                  no technical jargon needed.
                </p>
              </div>

              {/* Step 2 */}
              <div className="card">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-on-primary-container text-xl">auto_awesome</span>
                </div>
                <h4 className="headline-md text-on-surface mb-2">2. Watch It Take Shape</h4>
                <p className="body-md text-on-surface-variant">
                  See a functional tool appear on screen as you talk. The interface evolves in real-time
                  based on your needs.
                </p>
              </div>

              {/* Step 3 */}
              <div className="card">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-on-primary-container text-xl">rocket_launch</span>
                </div>
                <h4 className="headline-md text-on-surface mb-2">3. Use Your Tool</h4>
                <p className="body-md text-on-surface-variant">
                  Start using your custom workflow tool immediately. Refine it through conversation
                  until it fits your work perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Use Cases */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <h3 className="headline-lg text-on-surface mb-12 text-center">
            Built for Real Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container">factory</span>
                </div>
                <h4 className="headline-md text-on-surface">Sheet Metal Shop</h4>
              </div>
              <p className="body-md text-on-surface-variant mb-4">
                &ldquo;I need a way to calculate quotes based on material type, thickness, and quantity.&rdquo;
              </p>
              <span className="label-sm text-primary">Quote Calculator →</span>
            </div>

            <div className="card-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container">bakery_dining</span>
                </div>
                <h4 className="headline-md text-on-surface">Bakery Orders</h4>
              </div>
              <p className="body-md text-on-surface-variant mb-4">
                &ldquo;I want to track custom cake orders with pickup dates and customer contact info.&rdquo;
              </p>
              <span className="label-sm text-primary">Order Tracker →</span>
            </div>

            <div className="card-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container">construction</span>
                </div>
                <h4 className="headline-md text-on-surface">Construction Crew</h4>
              </div>
              <p className="body-md text-on-surface-variant mb-4">
                &ldquo;I need a daily check-in form for my crew to report their location and tasks.&rdquo;
              </p>
              <span className="label-sm text-primary">Crew Check-in →</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-container py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="headline-lg text-on-primary-container mb-4">
              Ready to build your first tool?
            </h3>
            <p className="body-lg text-on-primary-container mb-8">
              Join industry experts who are creating software without learning to code.
            </p>
            <AuthButtons variant="cta" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-sm">auto_awesome</span>
              </div>
              <span className="font-headline font-bold text-primary">VibeCraft</span>
            </div>
            <p className="body-sm text-on-surface-variant">
              © 2026 VibeCraft. Built for industry experts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

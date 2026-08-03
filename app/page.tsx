/**
 * Point Goddess CC — AI Platform Homepage
 * Business & marketing landing page with full TypeScript documentation.
 * Optimized for conversion, SEO, and GitHub Copilot / Codex agent workflows.
 *
 * @module HomePage
 */

import { MarketingCTA } from './components/MarketingCTA';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Point Goddess CC
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            AI-Powered Business & Marketing Platform
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Professional agents, conversion-ready components, and documented JavaScript
            modules built for modern marketing teams. Powered by Gemini + Codex workflows.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MarketingCTA
              label="Start Free Trial"
              href="/demo"
              variant="primary"
            />
            <MarketingCTA
              label="View Live Docs"
              href="https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform"
              variant="outline"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-white">
            Built for Business Growth
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Documented JS Components"
              description="Every module ships with clear TypeScript JSDoc so GitHub Copilot and Codex can extend them instantly."
            />
            <FeatureCard
              title="Vercel-Ready Deployments"
              description="Push to main and go live in seconds. Edge-optimized, analytics-ready, and production hardened."
            />
            <FeatureCard
              title="Marketing Conversion Focus"
              description="CTAs, tracking helpers, and SEO utilities designed for high-converting business websites."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-800 px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to scale your marketing?</h2>
        <p className="mt-4 text-slate-400">
          Connect GitHub Copilot with your ChatGPT account via BYOK and start shipping documented code today.
        </p>
        <div className="mt-8">
          <MarketingCTA
            label="Open GitHub Repository"
            href="https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform"
            variant="primary"
          />
        </div>
      </section>
    </main>
  );
}

/**
 * Simple feature card used on the homepage.
 * Fully documented for Copilot / Codex reuse.
 */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#12121a] p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

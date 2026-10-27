/**
 * TextPlus — professional communication workspace landing page.
 *
 * This page is intentionally transparent: UI and navigation are available,
 * while real SMS/voice delivery requires a configured and verified provider.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TextPlus | Modern Messaging Workspace',
  description:
    'A professional workspace for organizing virtual-number messaging workflows, with clear setup, provider status, and delivery testing.',
  openGraph: {
    title: 'TextPlus | Modern Messaging Workspace',
    description:
      'Organize messaging workflows with a clear path from setup to verified delivery.',
    type: 'website',
  },
};

const features = [
  {
    number: '01',
    title: 'One clear inbox',
    description:
      'A focused foundation for organizing conversations and keeping communication workflows easy to follow.',
  },
  {
    number: '02',
    title: 'Provider-aware setup',
    description:
      'Keep account configuration, number capabilities, and delivery checks visible instead of guessing what is connected.',
  },
  {
    number: '03',
    title: 'Delivery verification',
    description:
      'Use explicit health checks and controlled test messages to confirm a provider works before relying on it.',
  },
];

const steps = [
  ['Connect a provider', 'Add credentials in the provider dashboard using encrypted environment variables. Never paste secrets into code or chat.'],
  ['Configure a supported number', 'Confirm the number supports the SMS or voice features you intend to use and that the account is approved.'],
  ['Send a controlled test', 'Test with a number you own, inspect delivery status and logs, and only then enable customer workflows.'],
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b12] text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.20),transparent_62%)]" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="TextPlus home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg font-black text-white shadow-lg shadow-blue-500/20">T+</span>
          <span>
            <span className="block text-lg font-bold tracking-tight">TextPlus</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Communication workspace</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Main navigation">
          <a className="transition hover:text-white" href="#features">Features</a>
          <a className="transition hover:text-white" href="#setup">How it works</a>
          <a className="transition hover:text-white" href="#status">Service status</a>
        </nav>
        <a href="#setup" className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold transition hover:border-blue-400/60 hover:bg-blue-400/10">
          Get started <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/[0.08] px-3.5 py-2 text-xs font-semibold text-blue-200">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            A smarter way to manage communication
          </div>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Messaging that feels <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">clearer.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            A clean, modern workspace for virtual-number communication workflows — built around visibility, straightforward setup, and verified delivery.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#setup" className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-400">
              Configure your service <span className="ml-2" aria-hidden="true">→</span>
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.06]">
              Explore the platform
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
            <span>✓ Clear setup guidance</span><span>✓ Provider-first architecture</span><span>✓ No unsupported delivery promises</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-2xl" />
          <div className="relative rounded-[1.7rem] border border-white/10 bg-[#101622]/95 p-4 shadow-2xl shadow-black/40 sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 font-bold">T+</div>
                <div><p className="text-sm font-semibold">Communication overview</p><p className="mt-0.5 text-xs text-slate-400">Workspace preview</p></div>
              </div>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold text-amber-200">Setup required</span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"><p className="text-xs text-slate-400">Messaging</p><p className="mt-2 text-xl font-semibold">Ready to configure</p><p className="mt-1 text-[11px] text-slate-500">Provider connection needed</p></div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"><p className="text-xs text-slate-400">Voice</p><p className="mt-2 text-xl font-semibold">Ready to configure</p><p className="mt-1 text-[11px] text-slate-500">Number capability check needed</p></div>
            </div>
            <div className="rounded-2xl border border-blue-300/15 bg-blue-400/[0.06] p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-400/15 text-blue-200">i</span>
                <div><p className="text-sm font-semibold">Make the first test count</p><p className="mt-1 text-xs leading-5 text-slate-300">Connect your SMS or voice provider, then test with a number you control. A deployment being online does not by itself confirm message delivery.</p></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0a0f18] px-4 py-3">
              <span className="text-xs text-slate-400">Security principle</span>
              <span className="text-xs font-semibold text-emerald-300">Secrets stay server-side</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-y border-white/[0.07] bg-white/[0.02] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">Designed for clarity</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">The right foundation for reliable communication.</h2><p className="mt-4 leading-7 text-slate-400">A polished experience should be backed by honest status, secure configuration, and a clear path to proving every feature works.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.number} className="rounded-2xl border border-white/10 bg-[#0d121c] p-6 transition hover:-translate-y-1 hover:border-blue-300/30">
                <p className="text-sm font-semibold text-blue-300">{feature.number}</p><h3 className="mt-5 text-xl font-semibold">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="setup" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">Simple setup</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">From configuration to a verified test.</h2><p className="mt-4 leading-7 text-slate-400">Follow these steps to activate real service safely. Credentials are added in the provider dashboard, not on this public page.</p></div>
          <div className="space-y-4">
            {steps.map(([title, description], i) => <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-sm font-bold text-blue-200">{i + 1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="status" className="relative z-10 px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-blue-300/15 bg-gradient-to-br from-blue-500/[0.10] via-[#101622] to-indigo-500/[0.08] p-7 sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">Service status</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">The site is the start — delivery must be verified.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">This interface is available, but live SMS and calls require valid provider credentials, an eligible number, and successful end-to-end tests. No verification-code delivery or third-party compatibility is guaranteed until tested.</p></div>
            <a href="https://vercel.com/pse-sent/orgsuite-textplus-live" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100">Open project settings ↗</a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.07] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} TextPlus. Communication, made clearer.</span><span>Built with a focus on clarity, privacy, and verified delivery.</span></div>
      </footer>
    </main>
  );
}

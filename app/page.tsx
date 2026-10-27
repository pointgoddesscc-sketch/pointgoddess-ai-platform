"use client";

import { useMemo, useState } from "react";
import {
  Archive, Bell, CheckCheck, ChevronDown, CircleHelp, FileText, Inbox,
  MessageCircle, MoreHorizontal, Paperclip, Plus, Search, Send, Settings,
  ShieldCheck, Smartphone, Sparkles, Star, Users, Wifi, X
} from "lucide-react";

type Message = { from: "me" | "them"; text: string; time: string };
type Thread = {
  id: number; name: string; initials: string; number: string; color: string;
  preview: string; time: string; unread: number; messages: Message[];
};

const seedThreads: Thread[] = [
  { id: 1, name: "Jordan Lee", initials: "JL", number: "+1 (415) 555-0134", color: "blue", preview: "Perfect, I'll send that over shortly.", time: "10:42 AM", unread: 2, messages: [
    { from: "them", text: "Hey! Are we still on for the meeting this afternoon?", time: "10:38 AM" },
    { from: "me", text: "Absolutely. I'll send the details in a minute.", time: "10:40 AM" },
    { from: "them", text: "Perfect, I'll send that over shortly.", time: "10:42 AM" },
  ]},
  { id: 2, name: "Studio Team", initials: "ST", number: "+1 (628) 555-0198", color: "violet", preview: "Thanks everyone 🙌", time: "9:16 AM", unread: 0, messages: [
    { from: "them", text: "The new campaign assets are ready for review.", time: "9:12 AM" },
    { from: "me", text: "Great work. I'll review them this morning.", time: "9:14 AM" },
    { from: "them", text: "Thanks everyone 🙌", time: "9:16 AM" },
  ]},
  { id: 3, name: "Morgan Chen", initials: "MC", number: "+1 (212) 555-0171", color: "amber", preview: "Could you confirm the time?", time: "Yesterday", unread: 0, messages: [
    { from: "them", text: "Could you confirm the time?", time: "Yesterday" },
  ]},
  { id: 4, name: "Taylor Brooks", initials: "TB", number: "+1 (312) 555-0146", color: "emerald", preview: "Got it, thank you!", time: "Yesterday", unread: 0, messages: [
    { from: "me", text: "I've shared the updated schedule.", time: "Yesterday" },
    { from: "them", text: "Got it, thank you!", time: "Yesterday" },
  ]},
  { id: 5, name: "Alex Rivera", initials: "AR", number: "+1 (646) 555-0112", color: "rose", preview: "Photo attached", time: "Mon", unread: 0, messages: [
    { from: "them", text: "Photo attached", time: "Mon" },
  ]},
];

const palettes: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700", violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-700", emerald: "bg-emerald-100 text-emerald-700",
  rose: "bg-rose-100 text-rose-700",
};

export default function TextPlusInbox() {
  const [threads, setThreads] = useState(seedThreads);
  const [activeId, setActiveId] = useState(1);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [authMode, setAuthMode] = useState<"email" | "phone">("email");
  const [showSignIn, setShowSignIn] = useState(false);
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState<"all" | "unread" | "starred">("all");
  const active = threads.find((t) => t.id === activeId) ?? threads[0];
  const filtered = useMemo(() => threads.filter((t) => {
    const matches = (t.name + " " + t.number + " " + t.preview).toLowerCase().includes(query.toLowerCase());
    return matches && (tab !== "unread" || t.unread > 0);
  }), [threads, query, tab]);

  function selectThread(thread: Thread) {
    setActiveId(thread.id);
    setThreads((old) => old.map((t) => t.id === thread.id ? { ...t, unread: 0 } : t));
    setNotice("");
  }
  function sendDemoMessage() {
    if (!draft.trim()) return;
    setNotice("Preview only — connect your SMS provider and configure its webhook before sending real messages.");
    setDraft("");
  }

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[76px] shrink-0 flex-col items-center border-r border-slate-200 bg-white py-6 md:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white shadow-lg shadow-blue-200">T+</div>
          <div className="mt-10 flex flex-col gap-3">
            <button aria-label="Inbox" className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Inbox size={20}/></button>
            <button aria-label="Contacts" onClick={() => setNotice("Contacts will be available after account and database setup.")} className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800"><Users size={20}/></button>
            <button aria-label="Saved messages" onClick={() => setNotice("Saved messages will be available after account and database setup.")} className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800"><Star size={20}/></button>
            <button aria-label="Settings" onClick={() => setShowAccount(true)} className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800"><Settings size={20}/></button>
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <button aria-label="Help" onClick={() => setNotice("TextPlus setup: connect authentication, configure a dedicated SMS-capable number, then verify inbound and outbound delivery.")} className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"><CircleHelp size={20}/></button>
            <button aria-label="Profile" onClick={() => setShowAccount(true)} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">TP</button>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white md:hidden">T+</div>
              <div><h1 className="text-lg font-bold tracking-tight">Messages</h1><p className="hidden text-xs text-slate-500 sm:block">Your conversations, in one calm workspace.</p></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-amber-500"/> Preview mode</span>
              <button aria-label="Notifications" onClick={() => setNotice("Notifications require a signed-in account.")} className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"><Bell size={19}/></button>
              <button onClick={() => setShowSignIn(true)} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">Sign in</button>
            </div>
          </header>

          <div className="border-b border-blue-100 bg-blue-50/80 px-5 py-3 sm:px-8">
            <div className="mx-auto flex max-w-[1500px] items-start gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-blue-700" size={18}/>
              <p className="text-xs leading-5 text-blue-950"><strong>Welcome to TextPlus.</strong> This preview uses sample conversations. Sign-in, real SMS delivery, and incoming messages are not active until the authentication and SMS provider are configured.</p>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1600px] flex-1 min-h-0 p-3 sm:p-5 lg:p-7">
            <div className="flex min-h-[650px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <section className="flex w-full shrink-0 flex-col border-r border-slate-200 md:w-[330px] lg:w-[360px]">
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between"><div><h2 className="text-base font-bold">Inbox</h2><p className="mt-1 text-xs text-slate-500">{threads.length} sample conversations</p></div><button onClick={() => setNotice("New conversations become available after sign-in and provider setup.")} aria-label="New message" className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700"><Plus size={18}/></button></div>
                  <label className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-400"><Search size={16} className="text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"/><kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 sm:block">⌘ K</kbd></label>
                  <div className="mt-4 flex gap-1 rounded-xl bg-slate-100 p-1">
                    {(["all", "unread", "starred"] as const).map((item) => <button key={item} onClick={() => setTab(item === "starred" ? "all" : item)} className={"flex-1 rounded-lg px-2 py-2 text-xs font-semibold capitalize transition " + (tab === item || (item === "starred" && tab === "all") ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800")}>{item}</button>)}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-3">
                  {filtered.map((thread) => <button key={thread.id} onClick={() => selectThread(thread)} className={"flex w-full gap-3 rounded-xl px-3 py-3.5 text-left transition " + (activeId === thread.id ? "bg-blue-50" : "hover:bg-slate-50")}>
                    <span className={"relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold " + palettes[thread.color]}>{thread.initials}{thread.unread > 0 && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-blue-600"/>}</span>
                    <span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold">{thread.name}</span><span className="shrink-0 text-[10px] text-slate-400">{thread.time}</span></span><span className="mt-1 block truncate text-xs text-slate-500">{thread.preview}</span><span className="mt-1.5 block truncate text-[10px] text-slate-400">{thread.number}</span></span>
                  </button>)}
                  {filtered.length === 0 && <p className="px-4 py-10 text-center text-sm text-slate-500">No conversations match your search.</p>}
                </div>
                <div className="border-t border-slate-100 p-4"><button onClick={() => setShowAccount(true)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-50"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700"><Smartphone size={17}/></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold">Your TextPlus number</span><span className="mt-0.5 block text-[11px] text-slate-500">Not connected yet</span></span><ChevronDown size={16} className="text-slate-400"/></button></div>
              </section>

              <section className="hidden min-w-0 flex-1 flex-col bg-[#fbfcff] md:flex">
                {active ? <>
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                    <div className="flex items-center gap-3"><span className={"flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold " + palettes[active.color]}>{active.initials}</span><div><h2 className="text-sm font-bold">{active.name}</h2><p className="mt-1 text-xs text-slate-500">{active.number} <span className="mx-1 text-slate-300">•</span> Sample conversation</p></div></div>
                    <div className="flex items-center gap-1"><button onClick={() => setNotice("Conversation search will be available after database setup.")} aria-label="Search in conversation" className="rounded-lg p-2.5 text-slate-500 hover:bg-slate-100"><Search size={18}/></button><button onClick={() => setNotice("Conversation options will be available after database setup.")} aria-label="More options" className="rounded-lg p-2.5 text-slate-500 hover:bg-slate-100"><MoreHorizontal size={20}/></button></div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6 lg:p-8">
                    <div className="mx-auto rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-500">Today · Sample messages</div>
                    {active.messages.map((message, i) => <div key={i} className={"flex " + (message.from === "me" ? "justify-end" : "justify-start")}><div className={"max-w-[78%] rounded-2xl px-4 py-3 shadow-sm " + (message.from === "me" ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800")}><p className="whitespace-pre-wrap text-sm leading-6">{message.text}</p><div className={"mt-1.5 flex items-center justify-end gap-1 text-[10px] " + (message.from === "me" ? "text-blue-100" : "text-slate-400")}>{message.time}{message.from === "me" && <CheckCheck size={13}/>}</div></div></div>)}
                    <div className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white/70 p-4 text-center text-xs text-slate-500"><ShieldCheck size={15} className="text-slate-400"/> Real conversations will appear here after you connect a number.</div>
                  </div>
                  <div className="border-t border-slate-200 bg-white p-4 lg:p-5">
                    {notice && <div className="mb-3 flex items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900"><span>{notice}</span><button aria-label="Dismiss" onClick={() => setNotice("")}><X size={15}/></button></div>}
                    <form onSubmit={(e) => { e.preventDefault(); sendDemoMessage(); }} className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-300">
                      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendDemoMessage(); } }} rows={2} placeholder="Write a message… (preview only)" className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"/>
                      <div className="flex items-center justify-between px-2 pb-1"><div className="flex items-center gap-1"><button type="button" onClick={() => setNotice("Attachments require an authenticated account and message storage.")} aria-label="Attach file" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Paperclip size={17}/></button><button type="button" onClick={() => setNotice("Templates will be available when your account is configured.")} aria-label="Message templates" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><FileText size={17}/></button><span className="ml-2 text-[10px] text-slate-400">Enter to send · Shift + Enter for new line</span></div><button type="submit" className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"><Send size={14}/> Send</button></div>
                    </form>
                  </div>
                </> : <div className="flex flex-1 items-center justify-center text-sm text-slate-500">Choose a conversation</div>}
              </section>
            </div>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-2 px-6 pb-5 text-[10px] text-slate-400"><span>TextPlus · Private by design</span><span className="flex items-center gap-1"><ShieldCheck size={12}/> Your numbers and messages should remain private to your account.</span></footer>
        </section>
      </div>

      {showSignIn && <div role="dialog" aria-modal="true" aria-labelledby="signin-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">T+</div><h2 id="signin-title" className="mt-5 text-2xl font-bold">Welcome to TextPlus</h2><p className="mt-2 text-sm leading-6 text-slate-500">Sign in with email or phone. Authentication is not yet connected on this preview.</p></div><button onClick={() => setShowSignIn(false)} aria-label="Close sign in" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18}/></button></div><div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1"><button onClick={() => setAuthMode("email")} className={"rounded-lg py-2.5 text-sm font-semibold " + (authMode === "email" ? "bg-white shadow-sm" : "text-slate-500")}>Email address</button><button onClick={() => setAuthMode("phone")} className={"rounded-lg py-2.5 text-sm font-semibold " + (authMode === "phone" ? "bg-white shadow-sm" : "text-slate-500")}>Phone number</button></div><form onSubmit={(e) => { e.preventDefault(); setNotice("Sign-in is not active yet. Connect Firebase Authentication or an equivalent identity provider to enable secure accounts."); setShowSignIn(false); }} className="mt-5 space-y-3"><label className="block text-xs font-semibold text-slate-700">{authMode === "email" ? "Email address" : "Phone number"}<input required type={authMode === "email" ? "email" : "tel"} placeholder={authMode === "email" ? "you@example.com" : "+1 555 000 0000"} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"/></label><button type="submit" className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-700">{authMode === "email" ? "Continue with email" : "Continue with phone"}</button></form><p className="mt-4 flex gap-2 text-[11px] leading-5 text-slate-400"><ShieldCheck size={14} className="mt-0.5 shrink-0"/> No password or verification code is collected by this preview. Real authentication must be enabled on the server.</p></div></div>}

      {showAccount && <div role="dialog" aria-modal="true" aria-labelledby="account-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><h2 id="account-title" className="text-xl font-bold">Account & number</h2><p className="mt-2 text-sm leading-6 text-slate-500">Your personal number and inbox are not connected yet.</p></div><button onClick={() => setShowAccount(false)} aria-label="Close account settings" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18}/></button></div><div className="mt-5 rounded-2xl border border-slate-200 p-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Smartphone size={19}/></span><div><p className="text-sm font-semibold">Dedicated SMS number</p><p className="mt-1 text-xs text-slate-500">Requires a provider account and number assignment.</p></div></div></div><div className="mt-3 rounded-2xl border border-slate-200 p-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Wifi size={19}/></span><div><p className="text-sm font-semibold">Inbound & outbound SMS</p><p className="mt-1 text-xs text-slate-500">Requires a webhook, database, and delivery-status handling.</p></div></div></div><a href="https://vercel.com/pse-sent/orgsuite-textplus-live" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"><Settings size={16}/> Open service configuration</a></div></div>}
    </main>
  );
}

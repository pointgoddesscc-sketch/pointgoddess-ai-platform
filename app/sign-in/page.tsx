"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { RecaptchaVerifier, createUserWithEmailAndPassword, onAuthStateChanged, PhoneAuthProvider, PhoneMultiFactorGenerator, PhoneAuthProvider as PhoneProvider, signInWithEmailAndPassword, signOut, signInWithPhoneNumber, type ConfirmationResult, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

type Mode = "email" | "phone";

export default function TextPlusSignInPage() {
  const [mode, setMode] = useState<Mode>("email");
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const verifier = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    try { return onAuthStateChanged(getFirebaseAuth(), setUser); }
    catch (e) { setNotice(e instanceof Error ? e.message : "Authentication is not configured."); }
  }, []);

  function getVerifier() {
    const auth = getFirebaseAuth();
    if (!verifier.current) verifier.current = new RecaptchaVerifier(auth, "textplus-recaptcha", { size: "invisible" });
    return verifier.current;
  }

  async function submitEmail(e: FormEvent) {
    e.preventDefault(); setBusy(true); setNotice("");
    try {
      const auth = getFirebaseAuth();
      if (register) await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) { setNotice(e instanceof Error ? e.message : "Email sign-in failed."); }
    finally { setBusy(false); }
  }

  async function requestCode(e: FormEvent) {
    e.preventDefault(); setBusy(true); setNotice("");
    try {
      const result = await signInWithPhoneNumber(getFirebaseAuth(), phone.trim(), getVerifier());
      setConfirmation(result); setNotice("Verification code sent if this number can receive SMS.");
    } catch (e) {
      verifier.current?.clear(); verifier.current = null;
      setNotice(e instanceof Error ? e.message : "Could not send a verification code.");
    } finally { setBusy(false); }
  }

  async function verifyCode(e: FormEvent) {
    e.preventDefault(); if (!confirmation) return; setBusy(true); setNotice("");
    try { await confirmation.confirm(code.trim()); }
    catch (e) { setNotice(e instanceof Error ? e.message : "The code could not be verified."); }
    finally { setBusy(false); }
  }

  async function sendTestSms() {
    const to = window.prompt("Recipient number in international format (for example +14155550123)");
    const body = window.prompt("Message to send");
    if (!to || !body || !user) return;
    setBusy(true); setNotice("");
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/textplus/sms", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }, body: JSON.stringify({ to, body }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "SMS could not be sent.");
      setNotice("SMS accepted by provider. Status: " + data.status);
    } catch (e) { setNotice(e instanceof Error ? e.message : "SMS could not be sent."); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen bg-[#080b0a] text-white flex items-center justify-center p-5">
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111714] p-7 shadow-2xl">
      <div className="mb-7 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-xl font-black text-[#062014]">T+</div><div><p className="text-xl font-bold">TextPlus</p><p className="text-sm text-white/55">Your world. Your messages.</p></div></div>
      {user ? <div className="space-y-4"><h1 className="text-2xl font-bold">You’re signed in</h1><p className="break-all text-sm text-white/70">{user.email || user.phoneNumber || user.uid}</p><p className="text-sm text-amber-200">Account access is active. SMS and chat features still depend on server configuration.</p><button onClick={sendTestSms} disabled={busy} className="w-full rounded-xl bg-emerald-400 p-3 font-bold text-[#052016] disabled:opacity-50">{busy ? "Working…" : "Send an SMS"}</button><button onClick={() => signOut(getFirebaseAuth())} className="w-full rounded-xl border border-white/15 p-3">Sign out</button></div> : <>
      <h1 className="text-2xl font-bold">Welcome to TextPlus</h1><p className="mt-2 text-sm leading-6 text-white/60">Sign in with your email or verify a phone number to continue.</p>
      <div className="my-6 grid grid-cols-2 rounded-xl bg-black/30 p-1"><button onClick={() => {setMode("email");setNotice("");}} className={"rounded-lg p-2 text-sm "+(mode==="email"?"bg-emerald-400 font-semibold text-black":"text-white/65")}>Email</button><button onClick={() => {setMode("phone");setNotice("");}} className={"rounded-lg p-2 text-sm "+(mode==="phone"?"bg-emerald-400 font-semibold text-black":"text-white/65")}>Phone number</button></div>
      {mode==="email" ? <form onSubmit={submitEmail} className="space-y-3"><label className="block text-sm text-white/70">Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-emerald-400"/></label><label className="block text-sm text-white/70">Password<input type="password" required minLength={6} autoComplete={register?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-emerald-400"/></label><button disabled={busy} className="w-full rounded-xl bg-emerald-400 p-3 font-bold text-[#052016] disabled:opacity-50">{busy?"Please wait…":register?"Create account":"Sign in"}</button><button type="button" onClick={()=>setRegister(!register)} className="w-full p-2 text-sm text-emerald-300">{register?"Already have an account? Sign in":"New to TextPlus? Create an account"}</button></form> :
      <form onSubmit={confirmation?verifyCode:requestCode} className="space-y-3"><label className="block text-sm text-white/70">{confirmation?"Verification code":"Phone number in international format"}<input required inputMode="tel" autoComplete={confirmation?"one-time-code":"tel"} placeholder={confirmation?"6-digit code":"+14155550123"} value={confirmation?code:phone} onChange={e=>confirmation?setCode(e.target.value):setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-emerald-400"/></label><button disabled={busy} className="w-full rounded-xl bg-emerald-400 p-3 font-bold text-[#052016] disabled:opacity-50">{busy?"Please wait…":confirmation?"Verify code":"Send verification code"}</button>{confirmation&&<button type="button" onClick={()=>{setConfirmation(null);setCode("");}} className="w-full p-2 text-sm text-emerald-300">Use a different number</button>}<div id="textplus-recaptcha"/></form>}
      <p className="mt-6 text-xs leading-5 text-white/40">Never share verification codes. Phone verification requires Firebase Phone Authentication to be enabled and the app domain authorized in Firebase Console.</p>
      </>}
      {notice&&<p role="status" className="mt-4 break-words rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/80">{notice}</p>}
    </section>
  </main>;
}

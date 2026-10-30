import { NextResponse } from "next/server";
import twilio from "twilio";
import { FieldValue } from "firebase-admin/firestore";
import { db, requireUser } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = await request.json().catch(() => ({}));
    const to = typeof payload.to === "string" ? payload.to.trim() : "";
    const body = typeof payload.body === "string" ? payload.body.trim() : "";
    if (!/^\+[1-9]\d{7,14}$/.test(to)) {
      return NextResponse.json({ error: "Enter a valid phone number in international format, such as +14155550123." }, { status: 400 });
    }
    if (!body || body.length > 1000) {
      return NextResponse.json({ error: "Message must contain 1–1000 characters." }, { status: 400 });
    }
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const apiKeySid = process.env.TWILIO_API_KEY;
    const apiKeySecret = process.env.TWILIO_API_SECRET;
    const from = process.env.TWILIO_PHONE_NUMBER;
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    const hasApiKey = Boolean(apiKeySid && apiKeySecret);
    const hasAuthToken = Boolean(token);
    if (!sid || (!hasApiKey && !hasAuthToken) || (!from && !messagingServiceSid)) {
      return NextResponse.json({ error: "SMS service is not configured. Add Twilio credentials and a sending number in Vercel." }, { status: 503 });
    }

    const dbx = db();
    const rateRef = dbx.collection("textplusRateLimits").doc(user.uid);
    const now = Date.now();
    const windowMs = 24 * 60 * 60 * 1000;
    const allowed = await dbx.runTransaction(async tx => {
      const snap = await tx.get(rateRef);
      const data = snap.data();
      const windowStart = typeof data?.windowStart === "number" ? data.windowStart : now;
      const count = windowStart + windowMs > now ? Number(data?.count || 0) : 0;
      if (count >= 30) return false;
      tx.set(rateRef, { windowStart: windowStart + windowMs > now ? windowStart : now, count: count + 1, updatedAt: FieldValue.serverTimestamp() });
      return true;
    });
    if (!allowed) return NextResponse.json({ error: "Daily SMS limit reached. Try again later." }, { status: 429 });

    // Prefer a revocable Standard API Key for REST calls in production.
    // Keep TWILIO_AUTH_TOKEN configured separately for webhook signature validation.
    const client = hasApiKey
      ? twilio(apiKeySid!, apiKeySecret!, { accountSid: sid })
      : twilio(sid, token!);
    const message = await client.messages.create({
      to,
      body,
      ...(messagingServiceSid ? { messagingServiceSid } : { from }),
      statusCallback: process.env.TWILIO_STATUS_CALLBACK_URL || undefined,
    });
    await dbx.collection("textplusMessages").add({
      uid: user.uid, direction: "outbound", channel: "sms", to, body,
      providerMessageSid: message.sid, status: message.status,
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, messageSid: message.sid, status: message.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send SMS.";
    const status = /Sign in|token|Firebase Admin is not configured/i.test(message) ? 401 : 500;
    return NextResponse.json({ error: status === 500 ? "SMS could not be sent. Check server configuration and logs." : message }, { status });
  }
}

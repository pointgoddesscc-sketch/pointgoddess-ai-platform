import { NextResponse } from "next/server";
import twilio from "twilio";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const publicUrl = process.env.TWILIO_INBOUND_WEBHOOK_URL;
  if (!authToken || !publicUrl) {
    return new NextResponse("Webhook is not configured", { status: 503 });
  }
  const formData = await request.formData();
  const params: Record<string, string> = {};
  formData.forEach((value, key) => { params[key] = String(value); });
  const signature = request.headers.get("x-twilio-signature") || "";
  if (!twilio.validateRequest(authToken, signature, publicUrl, params)) {
    return new NextResponse("Invalid webhook signature", { status: 403 });
  }
  const from = params.From || "";
  const to = params.To || "";
  const body = (params.Body || "").slice(0, 1600);
  const sid = params.MessageSid || params.SmsSid || "";
  if (!from || !to || !sid) return new NextResponse("Missing message fields", { status: 400 });

  // Inbound SMS is stored in a provider inbox until a user explicitly claims/maps the number.
  // Never guess which account owns a number.
  await db().collection("textplusInboundSms").doc(sid).set({
    from, to, body, providerMessageSid: sid, status: "received",
    receivedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return new NextResponse("<Response></Response>", {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

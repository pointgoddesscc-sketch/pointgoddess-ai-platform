import { NextResponse } from "next/server";
import twilio from "twilio";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const publicUrl = process.env.TWILIO_STATUS_CALLBACK_URL;
  if (!authToken || !publicUrl) return new NextResponse("Webhook is not configured", { status: 503 });
  const formData = await request.formData();
  const params: Record<string, string> = {};
  formData.forEach((value, key) => { params[key] = String(value); });
  const signature = request.headers.get("x-twilio-signature") || "";
  if (!twilio.validateRequest(authToken, signature, publicUrl, params)) {
    return new NextResponse("Invalid webhook signature", { status: 403 });
  }
  const sid = params.MessageSid || "";
  if (sid) {
    const matches = await db().collection("textplusMessages").where("providerMessageSid", "==", sid).limit(1).get();
    if (!matches.empty) await matches.docs[0].ref.update({
      status: params.MessageStatus || "unknown",
      errorCode: params.ErrorCode || null,
      statusUpdatedAt: FieldValue.serverTimestamp(),
    });
  }
  return NextResponse.json({ ok: true });
}

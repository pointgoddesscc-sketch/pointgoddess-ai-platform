import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { requireUser } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const payload = await request.json().catch(() => ({}));
    const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
    if (!prompt || prompt.length > 4000) {
      return NextResponse.json({ error: "Enter a question up to 4,000 characters." }, { status: 400 });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "The optional TextPlus assistant is not configured yet." }, { status: 503 });
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the optional TextPlus assistant. Help the signed-in user draft messages, summarize text they explicitly provide, and answer everyday questions. Be concise, respectful, and transparent. You cannot send messages, access conversations, or see contacts unless their content is explicitly included in the user's prompt. Never claim a message was sent.",
      },
    });
    return NextResponse.json({ answer: response.text || "I couldn't produce an answer. Please try again." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Assistant request failed.";
    const status = /Sign in|token|Firebase Admin is not configured/i.test(message) ? 401 : 500;
    return NextResponse.json({ error: status === 500 ? "The assistant is temporarily unavailable." : message }, { status });
  }
}

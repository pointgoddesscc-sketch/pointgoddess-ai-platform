# Point Goddess CC — AI Platform

Professional AI-powered business and marketing platform ready for Google Gemini + GitHub Copilot / Codex workflows.

**Connected account:** pointgoddesscc@gmail.com  
**GitHub Repository:** https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform  
**Live Production:** https://pointgoddess-ai-platform-pse-sent.vercel.app

## What's New (Aug 2026)

- Professional homepage with conversion-focused marketing sections
- Fully documented `MarketingCTA` component (TypeScript + JSDoc)
- Complete GitHub Copilot + Codex BYOK setup guide
- Dark business theme optimized for marketing websites

## Features

- Modern Next.js 15 + TypeScript + Tailwind CSS
- Clean, professional dark UI optimized for business use
- Gemini API integration ready (`@google/genai`)
- Marketing-focused landing page and agent showcase
- Fully responsive and production-ready
- Local development runs on **port 4000**
- GitHub Copilot / Codex BYOK ready (see docs)

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage with documented marketing sections |
| `app/components/MarketingCTA.tsx` | Reusable, accessible CTA component |
| `app/globals.css` | Dark theme + CTA utility classes |
| `docs/COPILOT-BYOK-SETUP.md` | Full instructions to connect ChatGPT account to Copilot |

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform.git
cd pointgoddess-ai-platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env.local
# Add your Gemini API key from https://aistudio.google.com
```

### 4. Run locally (Port 4000)
```bash
npm run dev
```

Open **http://localhost:4000**

## GitHub Copilot + Codex BYOK

Connect your personal ChatGPT account (`pointgoddesscc@gmail.com`) to GitHub Copilot so Codex models generate documented JavaScript for this platform.

→ Full guide: [docs/COPILOT-BYOK-SETUP.md](docs/COPILOT-BYOK-SETUP.md)

## Real Links

| Resource | URL |
|----------|-----|
| Live Site | https://pointgoddess-ai-platform-pse-sent.vercel.app |
| GitHub Repo | https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform |
| GitHub Profile | https://github.com/pointgoddesscc-sketch |
| Contact Email | pointgoddesscc@gmail.com |
| Google AI Studio | https://aistudio.google.com |

## JavaScript / TypeScript Integration

```typescript
import { GoogleGenAI } from "@google/genai";
import { MarketingCTA } from "./components/MarketingCTA";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateMarketingCopy(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });
  return response.text;
}
```

## Contact

Email: **pointgoddesscc@gmail.com**

Built with professional standards for business and marketing teams.

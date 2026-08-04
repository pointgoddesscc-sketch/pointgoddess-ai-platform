# Point Goddess CC — AI Platform

Professional AI-powered business and marketing platform ready for Google Gemini + GitHub Copilot / Codex workflows + **OpenAI automated PR reviews**.

**Connected account:** pointgoddesscc@gmail.com  
**GitHub Repository:** https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform  
**Live Production:** https://pointgoddess-ai-platform-pse-sent.vercel.app

## What's New (Aug 2026)

- **OpenAI PR Review Automation** – every JavaScript/TypeScript pull request is automatically reviewed for security, documentation, accessibility, and marketing quality
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
- **Automated OpenAI code reviews** on every PR that touches JS/TS files

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage with documented marketing sections |
| `app/components/MarketingCTA.tsx` | Reusable, accessible CTA component |
| `app/globals.css` | Dark theme + CTA utility classes |
| `docs/COPILOT-BYOK-SETUP.md` | Full instructions to connect ChatGPT account to Copilot |
| `docs/OPENAI-PR-REVIEW.md` | Setup & customization guide for the automated PR reviewer |
| `.github/workflows/openai-pr-review.yml` | The GitHub Actions workflow that powers the reviews |

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

## OpenAI Automated PR Reviews

Every pull request that changes `.ts`, `.tsx`, `.js` or `.jsx` files is automatically reviewed by OpenAI.

The reviewer checks:

1. Security (secrets, XSS, injection)
2. TypeScript quality & modern patterns
3. Complete JSDoc documentation
4. Accessibility & marketing UX patterns
5. Performance & maintainability

**One-time setup required:**

1. Go to repository **Settings → Secrets and variables → Actions**
2. Add a new secret named `OPENAI_API_KEY` with your key from https://platform.openai.com/api-keys

Full guide: [docs/OPENAI-PR-REVIEW.md](docs/OPENAI-PR-REVIEW.md)

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

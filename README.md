# Point Goddess CC — AI Platform

Professional AI-powered business and marketing platform ready for Google Gemini integration.

**Connected account:** Pointgoddesscc@gmail.com  
**GitHub Repository:** https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform  
**Live Production:** https://pointgoddess-ai-platform-pse-sent.vercel.app

## Features

- Modern Next.js 15.3.3 + TypeScript + Tailwind CSS
- Clean, professional dark UI optimized for business use
- Gemini API integration ready (`@google/genai`)
- Marketing-focused landing page and agent showcase
- Fully responsive and production-ready
- Local development runs on **port 4000**

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

## Real Links

| Resource | URL |
|----------|-----|
| Live Site | https://pointgoddess-ai-platform-pse-sent.vercel.app |
| GitHub Repo | https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform |
| GitHub Profile | https://github.com/pointgoddesscc-sketch |
| Contact Email | Pointgoddesscc@gmail.com |
| Google AI Studio | https://aistudio.google.com |

## JavaScript / TypeScript Integration

```typescript
import { GoogleGenAI } from "@google/genai";

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

Email: **Pointgoddesscc@gmail.com**

Built with professional standards for business and marketing teams.

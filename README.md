# Point Goddess CC — AI Platform

Professional AI-powered business and marketing platform ready for Google Gemini integration.

**Connected account:** Pointgoddesscc@gmail.com  
**GitHub:** [pointgoddesscc-sketch/pointgoddess-ai-platform](https://github.com/pointgoddesscc-sketch/pointgoddess-ai-platform)

## Live Demo

Deployed on Vercel — check the latest production URL in your Vercel dashboard.

## Features

- Modern Next.js 15 + TypeScript + Tailwind CSS
- Clean, professional dark UI optimized for business use
- Gemini API integration ready (`@google/genai`)
- Marketing-focused landing page and agent showcase
- Fully responsive and production-ready

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

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## JavaScript Integration Example

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

- Email: **Pointgoddesscc@gmail.com**
- GitHub: [pointgoddesscc-sketch](https://github.com/pointgoddesscc-sketch)

Built with professional standards for business and marketing teams.

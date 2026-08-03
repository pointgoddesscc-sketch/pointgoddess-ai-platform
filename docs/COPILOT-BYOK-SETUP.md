# GitHub Copilot + Codex BYOK Setup

**Account:** pointgoddesscc@gmail.com  
**GitHub:** pointgoddesscc-sketch  
**Goal:** Connect your personal ChatGPT / OpenAI account to GitHub Copilot so Codex models power coding, agent mode, and documented JavaScript generation for business & marketing websites.

## Why this matters for Point Goddess CC

- Use your own OpenAI billing and quotas
- Access Codex-class models for cleaner, better-documented TypeScript / JavaScript
- Keep GitHub Copilot Chat, agent mode, and Spaces fully functional
- Perfect for marketing site components, conversion CTAs, and Vercel deployments

## Step-by-step (secure)

### 1. Create the OpenAI API key
1. Sign in at https://platform.openai.com with **pointgoddesscc@gmail.com**
2. Go to **API keys** → **Create new secret key**
3. Name it `GitHub-Copilot-Codex-PointGoddess`
4. Copy the key immediately and store it in your password manager / OS keychain
5. Optional: set a monthly spend limit in the OpenAI dashboard

### 2. Add the key in GitHub Copilot (BYOK)

**VS Code / Cursor**
- Command Palette → `Chat: Manage Language Models`
- Add Models → **OpenAI Compatible** or **Custom Endpoint**
- Base URL: `https://api.openai.com/v1`
- API Key: paste the key you created
- Model IDs: `gpt-4.1`, `gpt-4.1-mini`, or any Codex model shown

**GitHub Copilot App**
- Settings → Model Providers → Add provider → OpenAI
- Paste endpoint + key
- Keys stay in the local OS keychain

**GitHub.com / Enterprise**
- Organization or Enterprise settings → Copilot → Models → Custom models
- Provider: OpenAI → Add API key → select models

### 3. Verify
Open Copilot Chat, switch the model picker to your new OpenAI / Codex model, and ask:

> Generate a documented MarketingCTA component in TypeScript for a business website

You should receive clean, JSDoc-rich code matching the style already in this repository.

## Security rules (non-negotiable)
- Never commit the API key to any repository
- Never paste the key into this chat or any public issue
- Prefer project-scoped keys on the OpenAI platform
- Rotate the key every 90 days or after any suspected exposure

## Related files in this repo
- `app/components/MarketingCTA.tsx` — example of the documented style Codex will produce
- `app/page.tsx` — homepage that consumes the component
- `README.md` — project overview and live links

Once the key is added, GitHub Copilot + your ChatGPT account are fully connected.  
Push any change to `main` and Vercel will redeploy automatically.

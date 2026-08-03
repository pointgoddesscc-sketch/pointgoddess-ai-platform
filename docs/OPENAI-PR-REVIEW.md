# OpenAI PR Review Automation

Professional automated code review for the **Point Goddess CC AI Platform**.

This GitHub Action uses the OpenAI API to review every pull request that touches JavaScript or TypeScript files. The review focuses on the exact standards we care about for business and marketing websites:

- Security (secrets, XSS, injection)
- Clean TypeScript / modern ES modules
- Complete JSDoc documentation
- Accessibility & conversion-friendly UX patterns
- Maintainability and performance

## How it works

1. Triggered on `opened`, `synchronize`, and `reopened` events against the `main` branch.
2. Collects only changed `.ts`, `.tsx`, `.js`, `.jsx` files.
3. Sends a carefully crafted prompt + the diff to OpenAI (`gpt-4o-mini` by default for cost efficiency).
4. Posts a structured markdown comment on the PR with:
   - Overall status (PASS / NEEDS IMPROVEMENT / CRITICAL ISSUES)
   - Prioritized findings (P0 / P1 / P2)
   - Positive notes
   - Concrete next steps

The workflow never auto-approves or blocks merges. Human review remains the final gate.

## Setup (one-time)

### 1. Add the OpenAI API key as a repository secret

1. Go to the repository on GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `OPENAI_API_KEY`
4. Value: your secret key from https://platform.openai.com/api-keys
5. Save

> Recommendation: Create a project-scoped key with a monthly spend limit for safety.

### 2. (Optional) Adjust the model

Edit `.github/workflows/openai-pr-review.yml` and change the `model` field if you prefer a stronger model (e.g. `gpt-4o` or a Codex-class model).

### 3. Verify

Open a test pull request that changes any `.ts` / `.tsx` file. Within a minute you should see a comment titled **OpenAI Automated Review**.

## Customization for marketing teams

The system prompt inside the workflow already prioritizes:

- JSDoc on every exported component and utility
- Accessibility attributes
- Conversion-oriented patterns (clear CTAs, semantic structure)
- No hardcoded secrets or unsafe client-side logic

You can further refine the prompt in the workflow file if your team has additional brand or SEO guidelines.

## Cost control tips

- Default model `gpt-4o-mini` keeps costs very low.
- Diff is automatically truncated if extremely large.
- Only JS/TS source files are reviewed (configs, images, lockfiles are ignored).
- Concurrent runs for the same PR are cancelled when new commits arrive.

## Related files

| File | Purpose |
|------|---------|
| `.github/workflows/openai-pr-review.yml` | The automation workflow |
| `docs/COPILOT-BYOK-SETUP.md` | How to connect your personal OpenAI account to GitHub Copilot |
| `app/components/MarketingCTA.tsx` | Example of the documented style the reviewer expects |

## Support

Questions or improvements? Open an issue or update this document in a PR — the automation will review the documentation changes as well.

Built for professional business & marketing website development.

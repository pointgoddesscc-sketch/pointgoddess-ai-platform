# Custom Conversion Events — Point Goddess CC

All marketing conversion events are tracked through Vercel Web Analytics using the helper in `lib/analytics.ts`.

## Standard Event Names

| Event              | When it fires                          | Typical properties          |
|--------------------|----------------------------------------|-----------------------------|
| `cta_click`        | Any MarketingCTA is clicked            | location, label, page       |
| `demo_request`     | User requests a demo                   | location, plan              |
| `lead_submitted`   | Lead form is successfully submitted    | source, page                |
| `trial_started`    | Free trial begins                      | plan                        |
| `pricing_view`     | Pricing section or page is viewed      | page                        |
| `form_submit`      | Generic form submission                | form_id, page               |
| `newsletter_signup`| Newsletter subscription                | source                      |

## How it works

1. `MarketingCTA` automatically calls `trackCTAClick()` on every click.
2. The helper enriches the event with the current page path.
3. Events appear in the Vercel project dashboard under **Analytics → Custom Events**.

## Manual tracking example

```ts
import { trackConversion } from '@/lib/analytics';

// Anywhere in a client component
trackConversion('lead_submitted', {
  location: 'contact-form',
  source: 'homepage',
});
```

## Server-side tracking (Pro plan)

```ts
import { track } from '@vercel/analytics/server';

export async function submitLead(formData: FormData) {
  'use server';
  await track('lead_submitted', {
    source: formData.get('source') as string,
  });
}
```

## Enable in Vercel

1. Open the project in the Vercel dashboard.
2. Go to **Analytics** → Enable Web Analytics.
3. Redeploy (or wait for the next push).
4. Custom events become visible after the first production traffic.

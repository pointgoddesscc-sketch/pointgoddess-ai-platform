/**
 * Point Goddess CC — Conversion Analytics Helper
 * Centralized, fully documented functions for tracking marketing conversion events.
 * Works with Vercel Web Analytics (client + server) and is ready for GA4 / Meta CAPI extension.
 *
 * @module analytics
 * @example
 * import { trackConversion } from '@/lib/analytics';
 * trackConversion('cta_click', { location: 'hero', plan: 'trial' });
 */

'use client';

import { track } from '@vercel/analytics';

/**
 * Standard conversion event names used across Point Goddess CC marketing sites.
 * Keep this list short and consistent for clean dashboards.
 */
export type ConversionEvent =
  | 'cta_click'
  | 'demo_request'
  | 'lead_submitted'
  | 'trial_started'
  | 'pricing_view'
  | 'form_submit'
  | 'newsletter_signup';

export interface ConversionProperties {
  /** Where the event happened (hero, pricing, footer, etc.) */
  location?: string;
  /** Optional plan or product name */
  plan?: string;
  /** Current page path */
  page?: string;
  /** Any extra business metadata */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track a client-side conversion event.
 * Fires to Vercel Web Analytics. Appears under Custom Events in the dashboard.
 *
 * @param event - One of the standard ConversionEvent names
 * @param properties - Optional business context
 */
export function trackConversion(
  event: ConversionEvent,
  properties: ConversionProperties = {}
): void {
  // Always attach current page if running in browser
  const enriched = {
    ...properties,
    page: properties.page ?? (typeof window !== 'undefined' ? window.location.pathname : undefined),
  };

  track(event, enriched);
}

/**
 * Convenience helper for MarketingCTA clicks.
 * Automatically records location and label for conversion reporting.
 */
export function trackCTAClick(label: string, location: string = 'unknown'): void {
  trackConversion('cta_click', {
    location,
    label,
  });
}

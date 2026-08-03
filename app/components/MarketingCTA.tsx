/**
 * Marketing Call-to-Action Button
 * Professional, accessible CTA component with built-in conversion tracking.
 * Optimized for Point Goddess CC business & marketing websites.
 *
 * Automatically fires a Vercel Analytics `cta_click` event when clicked.
 * Compatible with GitHub Copilot / Codex BYOK and Vercel Edge deployments.
 *
 * @module MarketingCTA
 * @example
 * <MarketingCTA
 *   label="Start Free Trial"
 *   href="/demo"
 *   variant="primary"
 *   location="hero"
 * />
 */

'use client';

import React from 'react';
import { trackCTAClick } from '@/lib/analytics';

export type CTAVariant = 'primary' | 'secondary' | 'outline';

export interface MarketingCTAProps {
  /** Visible button text (e.g. "Get Your Free Demo") */
  label: string;
  /** Destination URL or path */
  href: string;
  /** Visual style variant */
  variant?: CTAVariant;
  /** Location on the page for conversion reporting (hero, pricing, footer...) */
  location?: string;
  /** Optional additional analytics callback fired after tracking */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Renders a fully accessible marketing CTA button.
 * Tracks conversion events automatically via Vercel Web Analytics.
 */
export function MarketingCTA({
  label,
  href,
  variant = 'primary',
  location = 'unknown',
  onClick,
  className = '',
}: MarketingCTAProps) {
  const baseClass = 'cta-button';
  const variantClass = `cta-button--${variant}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Fire conversion event first
    trackCTAClick(label, location);

    // Then call any custom handler
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <a
      href={href}
      className={`${baseClass} ${variantClass} ${className}`}
      role="button"
      aria-label={label}
      onClick={handleClick}
    >
      {label}
    </a>
  );
}

export default MarketingCTA;

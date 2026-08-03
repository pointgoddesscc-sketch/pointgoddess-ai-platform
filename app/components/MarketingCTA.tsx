/**
 * Marketing Call-to-Action Button
 * Professional, accessible CTA component optimized for conversion tracking
 * on Point Goddess CC business & marketing websites.
 *
 * Compatible with GitHub Copilot / Codex BYOK and Vercel Edge deployments.
 *
 * @module MarketingCTA
 * @example
 * <MarketingCTA
 *   label="Start Free Trial"
 *   href="/demo"
 *   variant="primary"
 *   onClick={() => trackEvent('cta_click', { location: 'hero' })}
 * />
 */

'use client';

import React from 'react';

export type CTAVariant = 'primary' | 'secondary' | 'outline';

export interface MarketingCTAProps {
  /** Visible button text (e.g. "Get Your Free Demo") */
  label: string;
  /** Destination URL or path */
  href: string;
  /** Visual style variant */
  variant?: CTAVariant;
  /** Optional analytics callback fired on click */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Renders a fully accessible marketing CTA button.
 * Uses semantic <a> with role="button" for screen readers and SEO.
 */
export function MarketingCTA({
  label,
  href,
  variant = 'primary',
  onClick,
  className = '',
}: MarketingCTAProps) {
  const baseClass = 'cta-button';
  const variantClass = `cta-button--${variant}`;

  return (
    <a
      href={href}
      className={`${baseClass} ${variantClass} ${className}`}
      role="button"
      aria-label={label}
      onClick={onClick}
    >
      {label}
    </a>
  );
}

export default MarketingCTA;

/**
 * Root layout — Point Goddess CC AI Platform
 * Includes Vercel Web Analytics for automatic page views + custom conversion events.
 */
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Point Goddess CC | AI-Powered Business & Marketing Platform',
  description: 'Professional AI agents and marketing tools powered by Gemini. Built for modern businesses.',
  keywords: ['AI agents', 'marketing automation', 'Gemini', 'business platform', 'Point Goddess'],
  authors: [{ name: 'Point Goddess CC', url: 'https://github.com/pointgoddesscc-sketch' }],
  openGraph: {
    title: 'Point Goddess CC | AI Platform',
    description: 'Professional AI-powered business and marketing solutions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0a0a0f] text-slate-100">
        {children}
        {/* Vercel Web Analytics — tracks page views + custom conversion events */}
        <Analytics />
      </body>
    </html>
  );
}

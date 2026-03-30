import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '../components/ServiceWorkerRegistration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OneClickAPI | Instant API Tester & Code Generator',
  description: 'The fastest way to test APIs and get code snippets. No login, no bloat.',
  verification: {
    google: 'uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc',
  },
  openGraph: {
    title: 'Stop setting up Postman. Paste API here.',
    description: '0.8 seconds to see your API response and get the code.',
    type: 'website',
    url: 'https://oneclickapi.dev',
    images: [
      {
        url: 'https://oneclickapi.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OneClickAPI - Instant API Tester',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop setting up Postman. Paste API here.',
    description: '0.8 seconds to see your API response and get the code.',
    images: ['https://oneclickapi.dev/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
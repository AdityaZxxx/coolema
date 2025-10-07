import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import type React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coolema - Terminal Color Schemas',
  description:
    'Curated color schemas for your terminal ricing journey. Explore, copy, and export to Kitty, Alacritty, and more.',
  keywords: [
    'terminal',
    'color scheme',
    'ricing',
    'kitty',
    'alacritty',
    'themes',
  ],
  authors: [{ name: 'Coolema' }],
  openGraph: {
    title: 'Coolema - Terminal Color Schemas',
    description: 'Curated color schemas for your terminal ricing journey',
    type: 'website',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/chroma-js@2/chroma.min.js"
          async
        />
      </head>
      <body className="font-mono antialiased bg-[#0f1419] text-[#e6e1dc] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1f29',
              color: '#e6e1dc',
              border: '1px solid #2d3748',
            },
          }}
        />
      </body>
    </html>
  );
}

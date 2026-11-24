import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MotionRoot } from '@/components/motion/MotionRoot';
import { ScrollProgressRail } from '@/components/motion/ScrollProgressRail';
import { EditorialCursor } from '@/components/motion/EditorialCursor';
import { STUDIO_META } from '@/data/studio';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://void.studio'),
  title: {
    default: `${STUDIO_META.name} — ${STUDIO_META.tagline}`,
    template: `%s — ${STUDIO_META.name}`,
  },
  description:
    'VOID is an independent digital creative studio crafting minimalist brand flagships, 12-column editorial architectures, and kinetic web experiences.',
  openGraph: {
    title: `${STUDIO_META.name} — ${STUDIO_META.tagline}`,
    description:
      'Brutalist digital flagships, 12-column Swiss architectures, and GSAP kinetic experiences.',
    siteName: STUDIO_META.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${STUDIO_META.name} — ${STUDIO_META.tagline}`,
    description:
      'Brutalist digital flagships, 12-column Swiss architectures, and GSAP kinetic experiences.',
  },
};

export const viewport: Viewport = {
  themeColor: '#060606',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-void-bg text-void-ink antialiased">
        <a href="#main-content" className="void-skip-link">
          Skip to main content
        </a>
        <MotionRoot />
        <Header />
        <ScrollProgressRail />
        <EditorialCursor />
        <main id="main-content" className="flex w-full flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

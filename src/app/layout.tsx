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

const SITE_URL = 'https://voidstudio.falconit.xyz';
const SITE_DESCRIPTION =
  'VOID is an independent digital creative studio specializing in architectural minimalism, 12-column Swiss editorial grids, fluid clamp() typography, and precision GSAP kinetic web flagships engineered with Next.js, TypeScript, and Tailwind CSS.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: `${STUDIO_META.name} Studio`,
  title: {
    default: `${STUDIO_META.name} — ${STUDIO_META.tagline}`,
    template: `%s — ${STUDIO_META.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'VOID Studio',
    'Digital Creative Studio',
    'Creative Frontend Engineering',
    'Swiss Grid Web Design',
    'Editorial Web Architecture',
    'Next.js App Router',
    'GSAP Motion Design',
    'Tailwind CSS',
    'Design Systems',
    'Interactive Flagship',
  ],
  authors: [{ name: 'VOID Studio', url: SITE_URL }],
  creator: 'VOID Studio',
  publisher: 'VOID Studio',
  category: 'design',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: SITE_URL,
    title: `${STUDIO_META.name} — ${STUDIO_META.tagline}`,
    description: SITE_DESCRIPTION,
    siteName: `${STUDIO_META.name} Studio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${STUDIO_META.name} — ${STUDIO_META.tagline}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
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

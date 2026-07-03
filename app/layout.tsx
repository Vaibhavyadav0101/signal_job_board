import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/layout/back-to-top';
import { Toaster } from '@/components/ui/toaster';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const siteUrl = 'https://signal-jobs.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Signal — Job search, without the noise',
    template: '%s · Signal',
  },
  description:
    'Signal is a job discovery platform that surfaces roles matched to your skills using a transparent match score, instead of an endless undifferentiated feed.',
  keywords: ['job board', 'careers', 'hiring', 'remote jobs', 'tech jobs', 'job search'],
  openGraph: {
    title: 'Signal — Job search, without the noise',
    description: 'Find roles matched to your skills, not buried in a feed.',
    url: siteUrl,
    siteName: 'Signal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal — Job search, without the noise',
    description: 'Find roles matched to your skills, not buried in a feed.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-foreground"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

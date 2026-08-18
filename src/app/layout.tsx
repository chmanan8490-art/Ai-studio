import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'VisionCode AI Studio - Next.js 14 & Gemini Vision Code Engine',
  description: 'Convert UI screenshots into clean Next.js 14+ App Router TypeScript code and UX/CRO Audit Reports powered by Gemini Vision.',
  openGraph: {
    title: 'VisionCode AI Studio',
    description: 'Screenshot to Next.js 14+ Tailwind CSS & UX/CRO Audit Engine.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

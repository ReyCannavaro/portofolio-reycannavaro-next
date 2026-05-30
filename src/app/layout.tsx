import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer & Designer",
  description:
    "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, React, Next.js, IoT, dan AI.",
  keywords: [
    "Rey Cannavaro", "Reyjuno Al Cannavaro", "fullstack developer Sidoarjo",
    "designer developer Indonesia", "Laravel developer Indonesia",
    "React developer Sidoarjo", "Next.js developer Indonesia",
    "portfolio Rey Cannavaro", "SMK Telkom Sidoarjo",
  ],
  authors: [{ name: "Rey Cannavaro", url: "https://reycannavaro.vercel.app" }],
  creator: "Rey Cannavaro",
  openGraph: {
    title: "Rey Cannavaro | Fullstack Developer & Designer",
    description: "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia.",
    url: "https://reycannavaro.vercel.app",
    siteName: "Rey Cannavaro Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rey Cannavaro | Fullstack Developer & Designer",
    description: "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia.",
    creator: "@reycannavaro",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://reycannavaro.vercel.app" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        {/* Fallback untuk browser tanpa JS */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          />
        </noscript>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

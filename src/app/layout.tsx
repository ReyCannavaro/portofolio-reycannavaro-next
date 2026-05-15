import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./global.css";
import { GlitchProvider } from "./components/GlitchContext";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer & Designer",
  description:
    "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, React, Next.js, IoT, dan AI.",
  keywords: [
    "Rey Cannavaro",
    "Reyjuno Al Cannavaro",
    "fullstack developer Sidoarjo",
    "designer developer Indonesia",
    "Laravel developer Indonesia",
    "React developer Sidoarjo",
    "Next.js developer Indonesia",
    "portfolio Rey Cannavaro",
    "SMK Telkom Sidoarjo",
  ],
  authors: [{ name: "Rey Cannavaro", url: "https://reycannavaro.vercel.app" }],
  creator: "Rey Cannavaro",
  openGraph: {
    title: "Rey Cannavaro | Fullstack Developer & Designer",
    description:
      "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia.",
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
      <body
        className={`${anton.variable} ${hanken.variable} ${bricolage.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <GlitchProvider>{children}</GlitchProvider>
      </body>
    </html>
  );
}
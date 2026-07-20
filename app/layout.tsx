import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { siteConfig } from "@/config/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Premium pairing used by the marketing hero/navbar only — the rest of the
// site keeps Geist as its default typography. Weight 400 (Syne's lightest
// real weight) is additive, for the Services Hero's thin-italic accent line.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// Stylish-but-professional heading font used for the Services accordion titles.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
};

import { CustomCursor } from "@/components/shared/CustomCursor";
import { FloatingAssistant } from "@/components/shared/FloatingAssistant";
import { ScrollWaveTheme } from "@/components/layout/ScrollWaveTheme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ScrollWaveTheme />
        <CustomCursor />
        <FloatingAssistant />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sipsip.in"),
  title: {
    default: "SIP — Digital Loyalty Cards for Small Businesses",
    template: "%s | SIP",
  },
  description:
    "SIP helps local businesses turn every visit into loyalty, love and long-term growth. Build stronger customer relationships with digital loyalty programs.",
  applicationName: "SIP",
  keywords: [
    "digital loyalty card",
    "customer loyalty program",
    "qr code loyalty program",
    "digital rewards program",
    "loyalty program for small business",
    "customer retention",
    "digital stamp card",
  ],
  authors: [{ name: "SIP" }],
  creator: "SIP",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SIP",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sabordesip",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

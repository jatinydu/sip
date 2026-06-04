import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
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
  title: "Sip — Small moments. Big relationships.",
  description:
    "Sip helps local businesses turn every visit into loyalty, love and long-term growth. Build stronger customer relationships with digital loyalty programs.",
  keywords: [
    "loyalty program",
    "local business",
    "rewards",
    "customer retention",
  ],
  openGraph: {
    title: "Sip — Small moments. Big relationships.",
    description: "Build loyalty. Delight customers. Grow together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

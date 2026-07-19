import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghazal-habiba.vercel.app"),
  title: "Mohamed & Habiba's Engagement",
  description: "Joyfully invite you to celebrate their engagement weekend",
  openGraph: {
    title: "Mohamed & Habiba's Engagement",
    description: "Joyfully invite you to celebrate their engagement weekend",
    images: [
      {
        url: "/assets/bg.png",
        width: 1200,
        height: 630,
        alt: "Mohamed & Habiba's Engagement",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed & Habiba's Engagement",
    description: "Joyfully invite you to celebrate their engagement weekend",
    images: ["/assets/bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

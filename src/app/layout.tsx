import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spider-verse-store.vercel.app";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SPIDER//VERSE | Premium Spider-Man Apparel & Collectibles",
    template: "%s | SPIDER//VERSE",
  },
  description:
    "Shop premium Spider-Man apparel and collectibles at SPIDER//VERSE. Oversized tees, hoodies, caps, backpacks and web-shooter replicas for your friendly neighborhood hero.",
  applicationName: "SPIDER//VERSE",
  keywords: [
    "Spider-Man",
    "Spider-Man apparel",
    "Spider-Man merchandise",
    "Spider-Verse",
    "Miles Morales",
    "oversized tee",
    "graphic hoodie",
    "collectibles",
    "web shooter replica",
    "streetwear",
  ],
  authors: [{ name: "SPIDER//VERSE" }],
  creator: "SPIDER//VERSE",
  publisher: "SPIDER//VERSE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SPIDER//VERSE",
    title: "SPIDER//VERSE | Premium Spider-Man Apparel & Collectibles",
    description:
      "Suit up like a hero. Premium Spider-Man tees, hoodies, caps, backpacks and replicas, built brutalist and bold.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPIDER//VERSE | Premium Spider-Man Apparel & Collectibles",
    description:
      "Suit up like a hero. Premium Spider-Man tees, hoodies, caps, backpacks and replicas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="font-display">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PWAProvider } from "@/components/pwa/pwa-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1A237E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RCCG Rehoboth",
  },
};

export const metadata: Metadata = {
  title: {
    default: "RCCG Rehoboth Assembly | Utako, Abuja",
    template: "%s | RCCG Rehoboth Assembly",
  },
  description:
    "The Redeemed Christian Church of God, Rehoboth Assembly Parish - Silla-Zeka Plaza, Adebayo Adedeji Street, Utako, FCT, Abuja, Nigeria. Worship with us!",
  keywords: [
    "RCCG",
    "Redeemed Christian Church of God",
    "Rehoboth Assembly",
    "Church in Abuja",
    "Church in Utako",
    "Christian church Nigeria",
    "Worship",
    "Prayer",
    "Sermons",
  ],
  authors: [{ name: "RCCG Rehoboth Assembly" }],
  creator: "RCCG Rehoboth Assembly",
  publisher: "RCCG Rehoboth Assembly",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "RCCG Rehoboth Assembly | Utako, Abuja",
    description:
      "The Redeemed Christian Church of God, Rehoboth Assembly Parish - Worship with us in Utako, Abuja.",
    siteName: "RCCG Rehoboth Assembly",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "RCCG Rehoboth Assembly",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "RCCG Rehoboth Assembly",
    description:
      "The Redeemed Christian Church of God, Rehoboth Assembly Parish - Utako, Abuja.",
    images: ["/icons/icon-192x192.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RCCG Rehoboth" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <PWAProvider>
          {children}
        </PWAProvider>
        <Toaster />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const siteUrl = "https://fjordanglers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FjordAnglers — Find Fishing Guides in Scandinavia",
    template: "%s | FjordAnglers",
  },
  description:
    "Discover expert fishing guides across Norway, Sweden, and Iceland. Search by species, technique, and location to book your next Nordic fishing adventure.",
  keywords: [
    "fishing guides Scandinavia",
    "fishing Norway",
    "fishing Sweden",
    "fishing Iceland",
    "fjord fishing",
    "salmon fishing Norway",
    "Nordic fishing guides",
    "fly fishing Scandinavia",
    "sea trout Norway",
    "Arctic char Iceland",
    "halibut fishing Norway",
    "Lofoten fishing",
    "fishing guide booking",
  ],
  authors: [{ name: "FjordAnglers" }],
  creator: "FjordAnglers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FjordAnglers",
    title: "FjordAnglers — Find Fishing Guides in Scandinavia",
    description:
      "Discover expert fishing guides across Norway, Sweden, and Iceland. Search by species, technique, and location to book your next Nordic fishing adventure.",
    images: [
      {
        url: "/home/hero.jpg",
        width: 1200,
        height: 630,
        alt: "FjordAnglers — Nordic Fishing Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FjordAnglers — Find Fishing Guides in Scandinavia",
    description:
      "Discover expert fishing guides across Norway, Sweden, and Iceland. Search by species, technique, and location.",
    images: ["/home/hero.jpg"],
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
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

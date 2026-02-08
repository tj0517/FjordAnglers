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

export const metadata: Metadata = {
  title: "FjordAnglers — Epic Fjord Fishing Experiences",
  description:
    "Find expert fishing guides in Norway's legendary fjords and across Scandinavia. 100+ verified guides, 50+ species.",
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

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationPopup from "@/components/ConsultationPopup";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Living | Bespoke Interior Architecture & Sanctuaries",
  description:
    "An award-winning interior architecture studio crafting quiet luxury, natural daylight harmony, and tactile residential sanctuaries worldwide.",
  keywords: [
    "Interior Architecture",
    "Luxury Interior Design",
    "Atelier Living",
    "Bespoke Residences",
    "Architectural Lighting",
    "Minimalist Sanctuary",
  ],
  authors: [{ name: "Atelier Living Studio" }],
  openGraph: {
    title: "Atelier Living | Architectural Residences",
    description: "Spaces shaped by light, tactile simplicity, and living architecture.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-amber-200/20 selection:text-amber-100 antialiased overflow-x-hidden relative">
        {children}
        <WhatsAppButton />
        <ConsultationPopup />
      </body>
    </html>
  );
}


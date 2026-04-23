import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul Sami — Full-Stack Developer",
  description:
    "Full-Stack Developer — MERN & PERN stack, POS systems, and production deployments.",
  icons: {
    icon: "/images/logo/LOGO.png",
  },
};

import { LanguageProvider } from "./context/LanguageContext";
import { CustomCursor } from "./components/ui/custom-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

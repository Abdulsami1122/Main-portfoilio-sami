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
    icon: "/favicon.jpeg",
  },
};

import { LanguageProvider } from "./context/LanguageContext";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/chat-widget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ChatProvider>
              {children}
              <ChatWidget />
            </ChatProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

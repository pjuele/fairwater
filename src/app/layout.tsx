import type { Metadata } from "next";
import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { FullLogo } from "@/components/logo-full";
import { AppHeader } from "@/components/app-header";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "FairWater",
  description: "Inform adaptation & mitigation initiatives by analysing progress on human rights obligations",
  icons: {
    icon: "/favicon.ico",
  }};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          // "prose prose-slate-dark dark:prose-invert",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

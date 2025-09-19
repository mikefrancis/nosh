import { GeistSans } from "geist/font/sans";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

import "./globals.css";

import { FeedProvider } from "@/components/feed-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Nosh",
  description: "Modern RSS reader",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="">
      <body
        className={`${GeistSans.className} text-black dark:text-white antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FeedProvider>{children}</FeedProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}

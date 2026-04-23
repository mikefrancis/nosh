import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "./globals.css";

import { FeedProvider } from "@/components/feed-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Nosh",
	description: "Modern RSS reader",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="text-black dark:text-white antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<FeedProvider>{children}</FeedProvider>
				</ThemeProvider>
				<Toaster />
				<Analytics />
			</body>
		</html>
	);
}

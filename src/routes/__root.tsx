// src/routes/__root.tsx
/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { FeedProvider } from "@/components/feed-provider";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "nosh",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
});

function ClientOnly({ children }: Readonly<{ children: ReactNode }>) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted ? (children as React.ReactElement) : null;
}

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<FeedProvider>
					<ClientOnly>{children}</ClientOnly>
				</FeedProvider>
				<Toaster />
				<Scripts />
			</body>
		</html>
	);
}

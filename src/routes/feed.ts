import { createFileRoute } from "@tanstack/react-router";
import Parser from "rss-parser";
import { z } from "zod";
import type { Feed, FeedItem } from "@/types";

const parser: Parser<Feed, FeedItem> = new Parser({
	customFields: {
		item: ["contentSnippet"],
	},
});

const schema = z.object({
	url: z.url(),
});

export const Route = createFileRoute("/feed")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const result = schema.safeParse(
					Object.fromEntries(new URL(request.url).searchParams),
				);

				if (!result.success) {
					return Response.json(
						{
							message: result.error.message,
						},
						{
							status: 400,
						},
					);
				}

				const url = result.data.url;

				try {
					const feed = await parser.parseURL(url);
					const urlParts = new URL(url);

					let icon = null;
					const iconUrl = `https://${urlParts.hostname}/favicon.ico`;

					try {
						const response = await fetch(iconUrl);

						if (response.status !== 200) {
							throw new Error(`Could not get icon for feed: ${url}`);
						}

						icon = iconUrl;
					} catch (error) {
						console.log("Error getting icon for feed:", url, error);
					}

					return Response.json({
						url,
						icon,
						title: feed.title,
						description: feed.description,
						link: feed.link,
						items: feed.items
							? feed.items.map((item) => ({
									title: item.title,
									description: item.contentSnippet,
									link: item.link,
									author: item.author,
									pubDate: item.pubDate,
									content: item.content,
									read: false,
								}))
							: [],
					});
				} catch (error) {
					console.error("Error fetching/parsing feed:", url, error);
					return Response.json(
						{
							message:
								error instanceof Error
									? error.message
									: "Something went wrong, please try again later",
						},
						{
							status: 500,
						},
					);
				}
			},
		},
	},
});

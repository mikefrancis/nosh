import { createFileRoute } from "@tanstack/react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { FeedItems } from "@/components/feed-items";
import { ItemDisplay } from "@/components/item-display";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 overflow-hidden">
					<FeedItems />
					<ItemDisplay />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

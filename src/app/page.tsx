"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { FeedItems } from "@/components/feed-items";
import { ItemDisplay } from "@/components/item-display";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Page = () => {
	return (
		<SidebarProvider className="h-svh">
			<AppSidebar />
			<SidebarInset className="overflow-hidden">
				<SiteHeader />
				<div className="flex flex-1 overflow-hidden">
					<FeedItems />
					<ItemDisplay />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Page;

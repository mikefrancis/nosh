"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { FeedItems } from "@/components/feed-items";
import { ItemDisplay } from "@/components/item-display";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <SiteHeader />
        <div className="h-screen grid grid-cols-1 md:grid-cols-12">
          <FeedItems />
          <ItemDisplay />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;

"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { FeedItems } from "@/components/feed-items";
import { ItemDisplay } from "@/components/item-display";
import { SidebarProvider } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="grid grid-cols-1 md:grid-cols-12">
          <FeedItems />
          <ItemDisplay />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Page;

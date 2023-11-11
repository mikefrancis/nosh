"use client";

import { FeedItems } from "@/components/FeedItems";
import { ItemDisplay } from "@/components/ItemDisplay";
import { Navigation } from "@/components/Navigation";

const Page = () => {
  return (
    <div className="flex h-screen text-black dark:text-white">
      <Navigation />
      <FeedItems />
      <ItemDisplay />
    </div>
  );
};

export default Page;

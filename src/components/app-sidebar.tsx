import Image from "next/image";
import { toast } from "sonner";
import { FormEvent, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFeeds } from "./feed-provider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { Input } from "./ui/input";

const randomFeeds = [
  "https://smashingmagazine.com/feed",
  "https://news.ycombinator.com/rss",
  "https://www.reddit.com/r/reactjs.rss",
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "http://feeds.bbci.co.uk/sport/rss.xml?edition=int#",
  "http://feeds.feedburner.com/Techcrunch",
  "http://feeds.wired.com/wired/index",
  "https://www.polygon.com/rss/index.xml",
];

export function AppSidebar() {
  const { feeds, selectFeed, selectedFeedIndex, addFeed } = useFeeds();
  const [isAddFeedDialogOpen, setAddFeedDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const subscribe = async (url: string) => {
    if (feeds.find((feed) => feed.url === url)) {
      toast("Already subscribed to this feed", { description: url });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/feed?url=${url}`);
      if (!response.ok) {
        throw new Error("Error parsing the feed URL.");
      }
      const data = await response.json();

      addFeed(data);

      toast("Feed added");

      setAddFeedDialogOpen(false);
    } catch (error) {
      toast.warning("Sorry, we couldn't add that feed", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    const url = randomFeeds[Math.floor(Math.random() * randomFeeds.length)];

    await subscribe(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await subscribe(url);
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>Feeds</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarMenu>
            {feeds.map((feed, i) => {
              const unreadCount = feed.items.reduce(
                (prev, current) => prev + (current.read ? 0 : 1),
                0
              );

              return (
                <SidebarMenuItem key={`feed-${i}`}>
                  <SidebarMenuButton
                    className="w-full space-x-2"
                    onClick={() => selectFeed(i)}
                  >
                    {feed.icon ? (
                      <Image
                        className="rounded w-4 h-4"
                        src={feed.icon}
                        alt={feed.title}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <span className="bg-slate-500 flex items-center justify-center text-xs rounded w-4 h-4">
                        {feed.title[0]}
                      </span>
                    )}
                    <span className="flex-1 text-left line-clamp-1">
                      {feed.title}
                    </span>
                    {unreadCount > 0 ? (
                      <span className="text-xs">{unreadCount}</span>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            <SidebarMenuItem>
              <Dialog
                open={isAddFeedDialogOpen}
                onOpenChange={setAddFeedDialogOpen}
              >
                <DialogTrigger asChild>
                  <SidebarMenuButton>
                    <PlusCircle className="mr-2 w-4 h-4" />
                    <span className="flex-1 text-left">New feed</span>
                  </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Subscribe to new feed</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <fieldset className="mb-5">
                      <Input
                        required
                        disabled={loading}
                        id="url"
                        name="url"
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="URL"
                      />
                    </fieldset>
                    <DialogFooter>
                      <Button disabled={loading} type="submit">
                        {loading ? (
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        ) : null}
                        Subscribe
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleRandom}
                        type="button"
                      >
                        Add random feed
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

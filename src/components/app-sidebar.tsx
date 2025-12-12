import { Loader2, PlusCircle, Soup } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
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
import { useFeeds } from "@/components/feed-provider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const randomFeeds = [
  "https://smashingmagazine.com/feed",
  "https://news.ycombinator.com/rss",
  "https://www.reddit.com/r/reactjs.rss",
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "http://feeds.bbci.co.uk/sport/rss.xml",
  "http://feeds.feedburner.com/Techcrunch",
  "https://www.polygon.com/rss/index.xml",
];

export function AppSidebar() {
  const { feeds, selectFeed, addFeed } = useFeeds();
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
      const response = await fetch(`/api/feed?url=${url}`);
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <Soup className="!size-5" />
                <span className="text-base font-semibold">Nosh</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Feeds</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Dialog
                open={isAddFeedDialogOpen}
                onOpenChange={setAddFeedDialogOpen}
              >
                <DialogTrigger asChild>
                  <SidebarMenuButton className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
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
            {feeds.map((feed, i) => {
              const unreadCount = feed.items.reduce(
                (prev, current) => prev + (current.read ? 0 : 1),
                0
              );

              return (
                <SidebarMenuItem key={`feed-${i}`}>
                  <SidebarMenuButton onClick={() => selectFeed(i)}>
                    {feed.icon ? (
                      <img
                        className="rounded size-4"
                        src={feed.icon}
                        alt={feed.title}
                      />
                    ) : (
                      <span className="bg-background text-foreground flex items-center justify-center text-xs rounded size-4">
                        {feed.title[0]}
                      </span>
                    )}
                    <span className="mx-2 flex-1 text-left line-clamp-1">
                      {feed.title}
                    </span>
                    {unreadCount > 0 ? (
                      <span className="text-xs">{unreadCount}</span>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

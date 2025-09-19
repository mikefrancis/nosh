import dayjs from "dayjs";
import { ExternalLink, Mail, MailOpen, Share } from "lucide-react";
import { toast } from "sonner";

import { useFeeds } from "@/components/feed-provider";
import { Button } from "@/components/ui/button";

export const ItemDisplay = () => {
  const { feeds, selectedFeedIndex, selectedItemIndex, readItem } = useFeeds();
  const selectedItem =
    typeof selectedFeedIndex !== "undefined" &&
    typeof selectedItemIndex !== "undefined"
      ? feeds[selectedFeedIndex].items[selectedItemIndex]
      : undefined;

  const handleShare = () => {
    try {
      navigator.share({
        url: selectedItem?.link,
        title: selectedItem?.title,
      });
    } catch {
      toast.warning(
        "Sorry, the sharing feature is not supported by your browser."
      );
    }
  };

  return selectedItem ? (
    <article className="sticky top-0 bg-background md:col-span-7">
      <div className="p-5 space-y-5">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold leading-normal text-pretty">
            {selectedItem.title}
          </h1>
          <div className="flex items-center gap-5">
            {selectedItem.author ? (
              <p className="text-sm text-muted-foreground">
                {selectedItem.author}
              </p>
            ) : null}
            {selectedItem.pubDate ? (
              <p className="text-sm text-muted-foreground">
                {dayjs(selectedItem.pubDate).format("D MMM, YYYY")}
              </p>
            ) : null}
            <ul className="ml-auto flex items-center">
              <li>
                {selectedItem.read ? (
                  <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={() => readItem(selectedItemIndex as number, false)}
                  >
                    <MailOpen className="w-4 h-4" aria-label="Mark as unread" />
                  </Button>
                ) : (
                  <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={() => readItem(selectedItemIndex as number, true)}
                  >
                    <Mail className="w-4 h-4" aria-label="Mark as read" />
                  </Button>
                )}
              </li>
              <li>
                <Button asChild className="h-8 w-8" variant="ghost" size="icon">
                  <a href={selectedItem.link} target="_blank" rel="noopener">
                    <ExternalLink
                      className="w-4 h-4"
                      aria-label="Visit external link"
                    />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  className="h-8 w-8"
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share className="w-4 h-4" aria-label="Share article" />
                </Button>
              </li>
            </ul>
          </div>
        </header>
        <main className="prose dark:prose-invert">
          <div
            dangerouslySetInnerHTML={{
              __html: selectedItem.content,
            }}
          ></div>
        </main>
      </div>
    </article>
  ) : null;
};

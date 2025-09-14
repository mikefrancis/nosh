import dayjs from "dayjs";

import { useFeeds } from "@/components/feed-provider";

export const FeedItems = () => {
  const { feeds, selectItem, selectedFeedIndex, selectedItemIndex, readItem } =
    useFeeds();

  return typeof selectedFeedIndex !== "undefined" ? (
    <div className="bg-background md:col-span-5 flex-1 border-r">
      <ul id="feed-items">
        {feeds[selectedFeedIndex].items.map((item, i) => (
          <li
            key={`feed-item-${i}`}
            role="button"
            className={`relative group border-b p-4 pl-10 ${
              selectedItemIndex === i ? "bg-accent" : ""
            }`}
            onClick={() => {
              selectItem(i);
              readItem(i, true);
            }}
          >
            {!item.read ? (
              <span className="animate-pulse absolute w-2 h-2 bg-blue-500 rounded-full left-4 top-6"></span>
            ) : null}
            <h3 className="text-sm font-semibold line-clamp-1 mb-1">
              {item.title}
            </h3>
            <p className="text-sm line-clamp-1 mb-1">{item.description}</p>
            <div className="flex items-center justify-between space-x-5 text-muted-foreground">
              <span className="text-xs line-clamp-1">{item.author}</span>
              <span className="text-xs shrink-0">
                {dayjs(item.pubDate).format("D MMM, YYYY")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

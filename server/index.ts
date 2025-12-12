import express from 'express';
import cors from 'cors';
import Parser from 'rss-parser';
import { z } from 'zod';
import type { Feed, FeedItem } from '../src/types';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const parser: Parser<Feed, FeedItem> = new Parser({
  customFields: {
    item: ['contentSnippet'],
  },
});

const schema = z.object({
  url: z.string().url(),
});

app.get('/api/feed', async (req, res) => {
  const result = schema.safeParse({ url: req.query.url });

  if (!result.success) {
    return res.status(400).json({
      message: result.error.message,
    });
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
        throw new Error('Could not get icon');
      }

      icon = iconUrl;
    } catch (error) {
      console.log('Error getting icon', error);
    }

    return res.json({
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
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong, please try again later',
    });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

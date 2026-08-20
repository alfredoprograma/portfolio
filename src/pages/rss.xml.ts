import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@data/copy";

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const articles = await getCollection("articles");

  return rss({
    title: `${SITE.meta.blog} | ${SITE.meta.brand}`,
    description: SITE.blogList.description,
    site: context.site!,
    // Newest first, matching the order in ArticlesList.astro.
    items: articles
      .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((article) => ({
        title: article.data.title,
        description: article.data.excerpt,
        pubDate: article.data.date,
        categories: [...article.data.tags],
        link: `/blog/${article.data.slug}/`,
      })),
    customData: "<language>en-us</language>",
  });
};

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@data/copy";
import { renderOgImage, type OgCard } from "@utils/og";

export const prerender = true;

export async function getStaticPaths() {
  const articles = await getCollection("articles");

  return [
    {
      params: { route: "home" },
      props: {
        title: `${SITE.hero.name} — ${SITE.hero.role}`,
        eyebrow: SITE.meta.brand,
      },
    },
    {
      params: { route: "blog" },
      props: {
        title: SITE.blogList.description,
        eyebrow: `${SITE.meta.brand} · ${SITE.meta.blog}`,
      },
    },
    ...articles.map((article) => ({
      // Rest param keeps posts nested under /og/blog/ and out of the way of
      // the two static cards above.
      params: { route: `blog/${article.data.slug}` },
      props: {
        title: article.data.title,
        eyebrow: `${SITE.meta.brand} · ${SITE.meta.blog}`,
        tags: article.data.tags,
        date: article.data.date,
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as OgCard);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

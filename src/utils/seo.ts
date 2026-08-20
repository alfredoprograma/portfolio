import type { CollectionEntry } from "astro:content";
import { SITE } from "@data/copy";
import { SEO, SITE_URL } from "@data/seo";

/**
 * Absolute URL for a site-relative path, trailing slash included. Astro builds
 * directory-style routes and the sitemap emits trailing slashes, so JSON-LD
 * has to match or Google sees two URLs for one page.
 */
export const absolute = (path: string) =>
  new URL(path.endsWith("/") ? path : `${path}/`, SITE_URL).href;

/** Absolute URL for a file (no trailing slash — it would break the extension). */
export const absoluteAsset = (path: string) => new URL(path, SITE_URL).href;

/** Stable @id so Person can be referenced from every BlogPosting. */
const PERSON_ID = `${SITE_URL}/#person`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SEO.author.name,
    jobTitle: SEO.author.jobTitle,
    url: SITE_URL,
    email: `mailto:${SEO.author.email}`,
    description: SEO.description,
    sameAs: SEO.author.sameAs,
    knowsAbout: SEO.knowsAbout,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.meta.brand,
    description: SEO.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function blogSchema() {
  return {
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: absolute("/blog"),
    name: `${SITE.meta.blog} | ${SEO.author.name}`,
    description: SITE.blogList.description,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function blogPostingSchema(
  article: CollectionEntry<"articles">,
  ogImage: string,
) {
  const url = absolute(`/blog/${article.data.slug}`);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.data.title,
    description: article.data.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.data.date.toISOString(),
    dateModified: (article.data.updatedDate ?? article.data.date).toISOString(),
    keywords: article.data.tags,
    image: absoluteAsset(ogImage),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** Wrap schemas in a single @graph so one <script> covers the page. */
export function graph(...schemas: object[]) {
  return { "@context": "https://schema.org", "@graph": schemas };
}

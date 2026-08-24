import type { CollectionEntry } from "astro:content";

type Article = CollectionEntry<"articles">;

// Tags are typed by hand into frontmatter with no enum and no lint, so matching
// folds case and trims. Cards still render whatever casing the post declared.
const normalize = (tag: string) => tag.trim().toLowerCase();

/**
 * Posts to offer at the foot of an article: most shared tags first, newest
 * within a tie. Excluded by slug rather than id, because slug is what the route
 * and the card href are built from — id only happens to match today.
 *
 * Posts with no tag overlap rank last but are not dropped, so the block always
 * fills. On an archive this small the alternative is a lone orphan card or an
 * empty section, both of which read as broken. If the archive ever grows large
 * enough for an unrelated post to feel arbitrary, filter `shared > 0` before the
 * slice — the section already renders nothing on an empty list, so nothing else
 * has to change.
 */
export function relatedArticles(current: Article, all: Article[], limit = 2) {
  const currentTags = new Set(current.data.tags.map(normalize));

  return all
    .filter((article) => article.data.slug !== current.data.slug)
    .map((article) => ({
      article,
      shared: article.data.tags.filter((tag) => currentTags.has(normalize(tag)))
        .length,
    }))
    .toSorted(
      (a, b) =>
        b.shared - a.shared ||
        b.article.data.date.valueOf() - a.article.data.date.valueOf()
    )
    .slice(0, limit)
    .map(({ article }) => article);
}

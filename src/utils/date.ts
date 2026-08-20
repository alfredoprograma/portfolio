const DATE_LOCALE = "en-US";

// Frontmatter dates are date-only ("2025-10-09"), which z.coerce.date() parses
// as UTC midnight. Formatting must pin to UTC too, or a build machine west of
// Greenwich renders the previous day and the visible date drifts from the
// <time datetime> / JSON-LD datePublished value.
const formatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatDate(date: Date) {
  return formatter.format(date);
}

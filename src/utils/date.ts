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

// Certifications are only issued with month precision, so their dates arrive as
// "YYYY-MM" and get a day appended to parse. Pinned to UTC for the same reason
// as formatDate: the value parses as UTC midnight, and formatting locally would
// slip to the previous month on a build machine west of Greenwich.
const monthYearFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonthYear(month: string) {
  return monthYearFormatter.format(new Date(`${month}-01T00:00:00Z`));
}

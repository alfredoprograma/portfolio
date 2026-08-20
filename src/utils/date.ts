const DATE_LOCALE = "en-US";

const formatter = new Intl.DateTimeFormat(DATE_LOCALE, { dateStyle: "long" });

export function formatDate(date: Date) {
  return formatter.format(date);
}

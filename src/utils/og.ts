import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { BRAND_COLORS, SITE_URL } from "@data/seo";
import { formatDate } from "@utils/date";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Resolved from the project root rather than import.meta.url: this module is
// bundled into .astro/ during `astro build`, which would break a relative URL.
const FONT_DIR = join(process.cwd(), "src/assets/fonts");

/**
 * Satori can't read WOFF2 (no Brotli decompression), so these are static TTF
 * instances of the same families the site renders with. Loaded once per build.
 */
const fonts = await Promise.all([
  readFile(join(FONT_DIR, "Archivo-SemiBold.ttf")).then((data) => ({
    name: "Archivo",
    data,
    weight: 600 as const,
    style: "normal" as const,
  })),
  readFile(join(FONT_DIR, "PublicSans-Regular.ttf")).then((data) => ({
    name: "Public Sans",
    data,
    weight: 400 as const,
    style: "normal" as const,
  })),
  readFile(join(FONT_DIR, "PublicSans-Medium.ttf")).then((data) => ({
    name: "Public Sans",
    data,
    weight: 500 as const,
    style: "normal" as const,
  })),
]);

export interface OgCard {
  title: string;
  eyebrow: string;
  tags?: readonly string[];
  date?: Date;
}

/** Satori accepts this React-element shape directly, so no JSX step is needed. */
const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: children === undefined ? { style } : { style, children },
});

function card({ title, eyebrow, tags = [], date }: OgCard) {
  // Long titles need to shrink or they overflow the 630px frame.
  const fontSize = title.length > 70 ? 62 : title.length > 45 ? 72 : 84;

  return el(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: BRAND_COLORS.white,
      padding: "72px 80px",
      fontFamily: "Public Sans",
    },
    [
      // Brand eyebrow: accent bar + wordmark, mirroring the site header.
      el("div", { display: "flex", alignItems: "center", gap: 16 }, [
        el("div", {
          width: 10,
          height: 34,
          backgroundColor: BRAND_COLORS.accent600,
        }),
        el(
          "div",
          {
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: BRAND_COLORS.neutral900,
          },
          eyebrow,
        ),
      ]),

      // Title + the 56x3 accent rule from the post header.
      el("div", { display: "flex", flexDirection: "column" }, [
        el(
          "div",
          {
            fontFamily: "Archivo",
            fontWeight: 600,
            fontSize,
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            color: BRAND_COLORS.neutral900,
          },
          title,
        ),
        el("div", {
          width: 56,
          height: 3,
          marginTop: 32,
          backgroundColor: BRAND_COLORS.accent600,
        }),
      ]),

      // Tags left, date right.
      el(
        "div",
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        [
          el(
            "div",
            { display: "flex", gap: 10 },
            tags.slice(0, 4).map((tag) =>
              el(
                "div",
                {
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 500,
                  color: BRAND_COLORS.accent700,
                  backgroundColor: "#f1f9f3",
                  border: `1px solid ${BRAND_COLORS.neutral200}`,
                  borderRadius: 4,
                  padding: "7px 16px",
                },
                tag,
              ),
            ),
          ),
          el(
            "div",
            { fontSize: 20, color: BRAND_COLORS.neutral500 },
            // The index cards carry no date; the domain keeps the row from
            // reading as an empty gutter.
            date ? formatDate(date) : SITE_URL.replace("https://", ""),
          ),
        ],
      ),
    ],
  );
}

export async function renderOgImage(input: OgCard): Promise<Buffer> {
  const svg = await satori(card(input) as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}

import { SITE, SOCIAL_LINKS } from "@data/copy";

/** Canonical origin. Everything absolute is built from `site` in astro.config.mjs. */
export const SITE_URL = "https://alfredoprograma.dev";

/**
 * Accent tokens from global.css, resolved to hex. Satori and the favicon
 * pipeline can't parse oklch(), so keep these in sync by hand if the theme
 * moves; global.css stays the source of truth for the browser.
 */
export const BRAND_COLORS = {
  accent600: "#10703a",
  accent700: "#0a562b",
  neutral900: "#171717",
  neutral500: "#737373",
  neutral200: "#e5e5e5",
  white: "#ffffff",
} as const;

export const SEO = {
  /** ~155 chars so it survives a SERP without truncation. */
  description:
    "Alfredo Arvelaez is a Cloud / DevOps engineer focused on cloud architecture, hands on AWS, containerized workloads and CI/CD for web and backend platforms.",
  locale: "en_US",
  themeColor: BRAND_COLORS.accent600,
  author: {
    name: SITE.hero.name,
    jobTitle: SITE.hero.role,
    email: SITE.contact.emailLinkText,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  },
  knowsAbout: [
    "Cloud Infrastructure",
    "DevOps",
    "AWS",
    "Amazon ECS",
    "CI/CD",
    "GitHub Actions",
    "Docker",
    "Kubernetes",
    "Linux",
    "Terraform",
    "Observability",
    "Prometheus",
    "Grafana",
    "Bash",
    "Golang",
    "TypeScript",
  ],
} as const;

/** Site-relative path of the generated OG card for a given route. */
export const ogImagePath = (route: string) => `/og/${route}.png`;

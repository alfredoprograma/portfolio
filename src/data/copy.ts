type ExperienceRole = {
  role: string;
  period: string;
  highlights: string[];
};

type ExperienceCompany = {
  company: string;
  period: string;
  roles: ExperienceRole[];
};

export const SITE = {
  meta: {
    brand: "AlfredoPrograma",
    home: "Portfolio",
    blog: "Blog",
  },
  nav: {
    about: "About",
    blog: "Blog",
    contact: "Contact",
  },
  hero: {
    name: "Alfredo Arvelaez",
    role: "Cloud / DevOps Engineer",
    description:
      "Cloud / DevOps Engineer with over three years of experience operating cloud native systems in production. Specialized in CI/CD, containers, Linux, and AWS infrastructure for scalable web and backend platforms.",
    cta: "Get in touch",
    secondaryCta: "Read the blog",
    currentlyLabel: "Currently",
    scrollCue: "Experience",
  },
  experience: {
    title: "Professional experience",
    subtitle:
      "Roles where I blend frontend craftsmanship, backend systems, and AWS to launch dependable financial products",
    companies: [
      {
        company: "Magnet.cl",
        period: "Oct 2022 — Present",
        roles: [
          {
            role: "Cloud Engineer / DevOps",
            period: "Nov 2023 — Present",
            highlights: [
              "Initialized and configured optimized Linux servers for production grade web services over HTTP and HTTPS, ensuring reliability, security, and performance.",
              "Designed and implemented CI/CD pipelines to automate test execution, container image builds, and application deployments, improving delivery speed and consistency.",
              "Provisioned, configured, and managed cloud infrastructure across the organization, including compute resources, networking, security configurations, and storage services.",
              "Implemented AWS services to support secure authentication flows and static asset delivery.",
            ],
          },
          {
            role: "Full Stack Developer",
            period: "Oct 2022 — Nov 2023",
            highlights: [
              "Designed and supported a web based insurance simulator by exposing backend services and APIs that enabled profitability projections across multiple insurance products, collaborating with product teams to align system behavior with business requirements.",
              "Contributed to the development of a product recommendation engine for retail banking users by implementing backend logic and data integrations to match customers with relevant financial products, enhancing customer personalization and platform engagement.",
            ],
          },
        ],
      },
      {
        company: "Ingeniust",
        period: "Feb 2022 — Oct 2022",
        roles: [
          {
            role: "Full Stack Developer",
            period: "Feb 2022 — Oct 2022",
            highlights: [
              "Implemented an inventory management module within a web based ERP system, enhancing transaction traceability and stock control for over 150 products, improving operational efficiency and audit readiness.",
              "Designed and built the backend of a personal finance management platform using Golang and PostgreSQL, implementing complex business logic and transaction processing, and supporting a React based frontend with reliable APIs for financial data analysis and reporting.",
            ],
          },
        ],
      },
      {
        company: "Classgap",
        period: "Oct 2021 — Feb 2022",
        roles: [
          {
            role: "Software Development Tutor",
            period: "Oct 2021 — Feb 2022",
            highlights: [
              "Prepared over 30 students for online university projects and exams, resulting in improved academic performance and successful course completion.",
              "Mentored junior and inexperienced developers by resolving technical questions and accelerating their learning and problem solving skills.",
              "Earned 40 top rated reviews on the platform, demonstrating consistently high learner satisfaction and teaching effectiveness.",
            ],
          },
        ],
      },
    ] satisfies ExperienceCompany[],
  },
  blogList: {
    title: "Blog",
    description:
      "Thoughts on development, cloud design, and the ever-evolving backend, infrastructure and devops topics",
    articlesCount: "articles",
    readArticle: "Read article",
  },
  contact: {
    title: "Let's work together",
    description:
      "I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project or just say hello",
    emailIntro: "Or send me an email at",
    emailLinkText: "alfredoprograma.dev@gmail.com",
    resumeCta: "Download resume",
  },
  post: {
    backToBlog: "Back to blog",
    onThisPage: "On this page",
  },
} as const;

export type SiteCopy = typeof SITE;

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/alfredoprograma/", text: "LinkedIn" },
  { href: "https://github.com/AlfredoPrograma", text: "Github" },
] as const;

export const RESUME_PATH = "/Alfredo-Arvelaez-CV.pdf";

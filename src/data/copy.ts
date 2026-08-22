import { monthsSince } from "@utils/date";

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

type TechGroup = {
	label: string;
	items: string[];
};

type Certification = {
	name: string;
	issuer: string;
	/** Month precision ("YYYY-MM") — that is all the issuers record. */
	issuedOn: string;
	expiresOn: string;
	credentialUrl: string;
};

/**
 * First day of the first professional role (Ingeniust, Feb 2022). The hero
 * tenure is derived from it at build time, so a rebuild keeps the claim honest
 * instead of the sentence quietly going stale between deploys.
 */
const CAREER_START = "2022-02";

const YEAR_WORDS = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
] as const;

/**
 * Completed years only, spelled out. "over" is dropped during the anniversary
 * month so the claim is never a month ahead of the actual time served.
 */
function tenure(startMonth: string) {
	const months = monthsSince(startMonth);
	const years = Math.floor(months / 12);
	const spelled = YEAR_WORDS[years] ?? String(years);

	return months % 12 === 0 ? `${spelled} years` : `over ${spelled} years`;
}

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
		description: `Cloud / DevOps Engineer with ${tenure(CAREER_START)} operating cloud native systems in production. Specialized in multi-cloud architecture centered on AWS, containerized workloads with Docker and Kubernetes, and the CI/CD automation that ships them.`,
		cta: "Get in touch",
		secondaryCta: "Read the blog",
		currentlyLabel: "Currently",
		scrollCue: "Experience",
	},
	experience: {
		title: "Professional experience",
		subtitle:
			"Roles where I design, automate, and operate cloud infrastructure, mostly on AWS, to keep production systems reliable",
		companies: [
			{
				company: "Magnet.cl",
				period: "Oct 2022 — Present",
				roles: [
					{
						role: "Cloud Engineer / DevOps",
						period: "Oct 2022 — Present",
						highlights: [
							"Designed a greenfield three-tier product on AWS, provisioned with Terraform across development, staging and production: frontend, API and asynchronous BullMQ workers as ECS Fargate services behind an ALB, backed by RDS Postgres and ElastiCache Redis.",
							"Isolated the network per environment, with services in private subnets reaching out through NAT egress, RDS Postgres and ElastiCache Redis held in private isolated subnets, and internal AWS traffic kept on VPC endpoints.",
							"Established a site-to-site VPN linking AWS workloads to a client's on-premises Palo Alto firewall, then diagnosed a BGP session failure that left both tunnels up but no routes advertised, tracing it through the tunnel logs with the client's network team to correct the peering configuration on their side.",
							"Eliminated static AWS credentials from CI by building a GitHub Actions pipeline on OIDC role assumption, scoped per repo and branch, that ships a merge to a running ECS task in around 8 minutes. Development and staging on merge, production gated behind a tagged release.",
							"Provisioned Azure AI Foundry model deployments for AI backed application features, standing up both DeepSeek and GPT family models, configuring each deployment and raising its assigned quota so serving throughput kept pace with what the applications demanded.",
							"Hardened Debian and Ubuntu servers for production HTTP and HTTPS workloads, restricting SSH access, adding fail2ban for brute force mitigation, tuning an nginx reverse proxy and issuing TLS certificates through Let's Encrypt with certbot.",
						],
					},
				],
			},
			{
				company: "Ingeniust",
				period: "Feb 2022 — Oct 2022",
				roles: [
					{
						role: "Backend Engineer",
						period: "Feb 2022 — Oct 2022",
						highlights: [
							"Built the inventory module of a multi module ERP on NestJS and PostgreSQL, modeling stock movements as purchases from providers and sales to clients across a schema where products, providers and clients all referenced one another. Every movement that changed stock ran inside a database transaction, so a partial failure could not leave balances and the operations behind them disagreeing.",
							"Standardized the NestJS API layer on Prisma with class validator DTOs at every endpoint, JWT authentication issued through Amazon Cognito for access and refresh tokens, and role based access control over a permission catalog generated from the ERP modules, which let administrators compose their own roles through the API on top of the default system ones. Every endpoint shipped an OpenAPI schema, served through Scalar.",
							"Moved the slow work off the request path into Go services for background processing, mail dispatch and scraping, each pulling its jobs from Amazon SQS queues instead of holding an API request open. Wrote them on echo with sqlc generated queries and goose migrations, covered by table driven tests under testify.",
							"Built a Go scraper that collected client documents from ten public registries, fanning the sources across a worker pool of five goroutines fed over channels so several registries were worked at once rather than walked in order. Colly drove the HTML sources, PDFs were handled on a separate path, and the extracted document metadata landed in PostgreSQL. A source that failed was logged and skipped so the rest of the run still finished, leaving that one document for a manual fetch.",
							"Packaged both stacks as multi stage Docker images so the shipped layer carried only the compiled binary or the production Node dependencies, with docker compose standing up PostgreSQL to run the whole ERP locally.",
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
							"Tutored over 30 university students through software development coursework, projects and exams, working through their technical questions session by session.",
							"Finished the engagement with 40 top rated reviews on the platform.",
						],
					},
				],
			},
		] satisfies ExperienceCompany[],
	},
	stack: {
		title: "Tech stack",
		subtitle:
			"The tools I reach for across cloud, containers, backend services and delivery",
		groups: [
			{
				label: "Cloud",
				items: ["AWS", "Microsoft Azure", "Google Cloud Platform"],
			},
			{ label: "Infrastructure as code", items: ["Terraform", "AWS CDK"] },
			{
				label: "Containers",
				items: ["Docker", "Kubernetes", "Amazon ECS", "Amazon EKS"],
			},
			{
				label: "CI/CD",
				items: ["GitHub Actions", "Jenkins", "Bitbucket Pipelines"],
			},
			{
				label: "Observability",
				items: ["Amazon CloudWatch", "Grafana", "Prometheus"],
			},
			{
				label: "Backend",
				items: [
					"NestJS",
					"Node.js",
					"REST APIs",
					"PostgreSQL",
					"Prisma",
					"Redis",
					"Amazon SQS",
					"RabbitMQ",
				],
			},
			{ label: "Languages", items: ["Go", "Python", "TypeScript", "Bash"] },
		] satisfies TechGroup[],
	},
	certifications: {
		title: "Certifications",
		subtitle:
			"Credentials backing the cloud, container and architecture side of the work",
		items: [
			{
				name: "AWS Certified Cloud Practitioner",
				issuer: "Amazon Web Services",
				issuedOn: "2025-01",
				expiresOn: "2028-07",
				credentialUrl:
					"https://www.credly.com/badges/d656d1c7-6bd7-4c64-9597-528a84993349/public_url",
			},
			{
				name: "AWS Certified Solutions Architect – Associate",
				issuer: "Amazon Web Services",
				issuedOn: "2025-07",
				expiresOn: "2028-07",
				credentialUrl:
					"https://www.credly.com/badges/a12940cc-dce7-47e2-b848-03685198971e/public_url",
			},
			{
				name: "Kubernetes and Cloud Native Associate (KCNA)",
				issuer: "Cloud Native Computing Foundation",
				issuedOn: "2025-09",
				expiresOn: "2027-09",
				credentialUrl:
					"https://www.credly.com/badges/06999c67-c051-4158-9fda-afbcc7a7eabb/public_url",
			},
		] satisfies Certification[],
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
	{ href: "https://github.com/AlfredoPrograma", text: "GitHub" },
] as const;

export const RESUME_PATH = "/Alfredo-Arvelaez-CV.pdf";

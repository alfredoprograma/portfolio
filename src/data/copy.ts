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
		companies: [
			{
				company: "Magnet.cl",
				period: "Oct 2022 — Present",
				roles: [
					{
						role: "Cloud Engineer / DevOps",
						period: "Oct 2022 — Present",
						highlights: [
							"Designed and shipped a greenfield three-tier product on AWS, running services on ECS Fargate behind an ALB with RDS Postgres and ElastiCache Redis, provisioned through Terraform across development, staging and production.",
							"Eliminated static AWS credentials from CI by moving GitHub Actions onto OIDC role assumption, which ships a merge to a running ECS task in around 8 minutes, with production gated behind a tagged release.",
							"Isolated each environment's network by keeping services in private subnets with NAT egress, datastores in private isolated subnets, and internal AWS traffic on VPC endpoints.",
							"Diagnosed a site-to-site VPN failure at a client's on-premises Palo Alto firewall, where both tunnels stayed up while BGP advertised no routes, then traced the tunnel logs to a peering misconfiguration on their side.",
							"Provisioned Azure AI Foundry model deployments and raised their assigned quota to match application serving demand.",
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
							"Built the ERP inventory module on NestJS and PostgreSQL, wrapping stock movements in database transactions, authenticating through Cognito issued JWTs and layering role based access control over a permission catalog generated from the ERP modules.",
							"Moved background processing, mail dispatch and scraping off the request path into Go services consuming Amazon SQS, shipped as multi stage Docker images.",
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
							"Tutored over 30 university students through software development coursework and projects, finishing the engagement with 40 top rated reviews.",
						],
					},
				],
			},
		] satisfies ExperienceCompany[],
	},
	stack: {
		title: "Tech stack",
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
				label: "Data and messaging",
				items: ["PostgreSQL", "Redis", "Amazon SQS", "RabbitMQ"],
			},
			{ label: "Languages", items: ["Go", "Python", "TypeScript", "Bash"] },
		] satisfies TechGroup[],
	},
	certifications: {
		title: "Certifications",
		viewCredential: "View credential",
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

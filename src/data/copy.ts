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
			"Cloud / DevOps Engineer with nearly four years operating cloud native systems in production. Specialized in cloud architecture across AWS and Azure, containerized workloads with Docker and Kubernetes, and the CI/CD automation that ships them.",
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
						role: "Full Stack Developer",
						period: "Feb 2022 — Oct 2022",
						highlights: [
							"Implemented an inventory management module within a web based ERP system, enhancing transaction traceability and stock control for over 150 products, improving operational efficiency and audit readiness.",
							"Designed and built the backend of a transaction heavy web platform using Golang and PostgreSQL, implementing complex business logic and transaction processing, and supporting a React based frontend with reliable APIs for data analysis and reporting.",
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
	stack: {
		title: "Tech stack",
		subtitle: "The tools I reach for across cloud, containers and delivery",
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

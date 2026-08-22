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
			"Cloud / DevOps Engineer with nearly four years of experience operating cloud native systems in production. Specialized in CI/CD, containers, Linux, and cloud infrastructure, most of it on AWS, for scalable web and backend platforms.",
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
							"Designed and provisioned greenfield three-tier product on AWS with Terraform. Frontend, API and asynchronous BullMQ workers run as ECS Fargate services behind an ALB with host-based routing, backed by RDS Postgres and ElastiCache Redis.",
							"Structured the Terraform codebase around reusable child modules composed per environment, with remote state in a bootstrapped S3 backend, so an image tag change rolls through plan and apply into a new ECS task definition.",
							"Organized workloads across an AWS Organizations multi-account layout, one account per client project, each with isolated VPCs per environment, databases in private isolated subnets and services in private subnets with NAT egress.",
							"Eliminated static AWS credentials from CI by building a Github Actions pipeline on OIDC role assumption, scoped per repo and branch, that ships a merge to a running ECS task in around 8 minutes. Development and staging on merge, production gated behind a tagged release.",
							"Scoped least-privilege IAM policies per service and split them across ECS execution and task roles, keeping application secrets in Secrets Manager instead of baked into images or pipeline variables.",
							"Built CloudWatch dashboards for a Django CMS platform covering ECS service CPU and task counts, ALB request volume and S3 with CloudFront transfer, and stood up Grafana backed by Prometheus for lower level time series metrics.",
							"Reduced recurring spend by moving infrequently accessed S3 objects to colder storage classes through lifecycle rules, and by routing internal AWS traffic over VPC endpoints rather than paying NAT gateway egress.",
							"Hardened Debian and Ubuntu servers for production HTTP and HTTPS workloads, restricting SSH access, adding fail2ban for brute force mitigation, tuning an nginx reverse proxy and issuing TLS certificates through Let's Encrypt with certbot.",
							"Established a site-to-site VPN linking AWS workloads to a client's on-premise Palo Alto firewall, configuring the customer gateway, virtual private gateway, route tables and tunnels to their network team's specification so an EC2 hosted API could reach an internal service behind their perimeter.",
							"Diagnosed a BGP session failure that left both tunnels up but no routes advertised, tracing it through the tunnel logs and working with the client's network team to correct the peering configuration on their side.",
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
	certifications: {
		title: "Certifications",
		subtitle:
			"Credentials backing the cloud, container and architecture side of the work, each verifiable on Credly",
		items: [
			{
				name: "AWS Certified Solutions Architect – Associate",
				issuer: "Amazon Web Services",
				issuedOn: "2025-07",
				expiresOn: "2028-07",
				credentialUrl:
					"https://www.credly.com/earner/earned/badge/a12940cc-dce7-47e2-b848-03685198971e",
			},
			{
				name: "Kubernetes and Cloud Native Associate (KCNA)",
				issuer: "Cloud Native Computing Foundation",
				issuedOn: "2025-09",
				expiresOn: "2027-09",
				credentialUrl:
					"https://www.credly.com/earner/earned/badge/06999c67-c051-4158-9fda-afbcc7a7eabb",
			},
			{
				name: "AWS Certified Cloud Practitioner",
				issuer: "Amazon Web Services",
				issuedOn: "2025-01",
				expiresOn: "2028-07",
				credentialUrl:
					"https://www.credly.com/earner/earned/badge/d656d1c7-6bd7-4c64-9597-528a84993349",
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
	{ href: "https://github.com/AlfredoPrograma", text: "Github" },
] as const;

export const RESUME_PATH = "/Alfredo-Arvelaez-CV.pdf";

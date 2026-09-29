import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../dist/public/", import.meta.url));
const origin = "https://mewaqarulmulk.netlify.app";
const name = "Muhammad Waqar Ul Mulk";
const email = "mwaqarmulk@gmail.com";
const whatsapp = "https://wa.me/923010492137";
const github = "https://github.com/Mwaqarulmulk";
const profiles = [
  ["GitHub", github],
  ["LinkedIn", "https://www.linkedin.com/in/mwaqarulmulk/"],
  ["Fiverr", "https://www.fiverr.com/mwaqarulmulk"],
  ["Freelancer", "https://www.freelancer.com/u/mwaqarulmulk"],
  ["Guru", "https://www.guru.com/freelancers/muhammad-waqar-ul-mulk"],
];
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const list = entries => `<ul>${entries.map(entry => `<li>${entry}</li>`).join("")}</ul>`;
const profileLinks = list(profiles.map(([label, url]) => link(url, label)));
const services = [
  ["/services/ai-chatbots-automation/", "AI chatbots and business automation"],
  ["/services/full-stack-development/", "Full-stack web development"],
  ["/services/python-data-applications/", "Python and data applications"],
];
const cases = [
  ["/case-studies/clinic-chatbot/", "ClinicChatbot: appointment workflows and retrieval"],
  ["/case-studies/resume-ai-screening/", "ResumeAI: resume analysis with Python"],
  ["/case-studies/clinic-website/", "Smile District: a Next.js clinic website"],
];
const links = entries => list(entries.map(([url, label]) => link(url, label)));
const contact = `<h2>Discuss your project</h2><p>Share the problem, current tools, desired result and any deadline. Waqar can review the scope and discuss an appropriate next step.</p><p><a class="geo-cta" href="${whatsapp}">Chat on WhatsApp</a></p><p>${link(`mailto:${email}`, email)} · ${link("/contact/", "Contact options")}</p>`;
const evidence = (repo, file, label) => `<p>Project evidence: ${link(`${github}/${repo}`, `${repo} repository`)} and ${link(`${github}/${repo}/blob/HEAD/${file}`, label)}. This write-up describes the public source and documentation reviewed on September 29, 2026. It does not claim independently measured client results.</p>`;

const pages = [
  { route: "/", title: `${name} | Software Engineer & AI Developer`, description: "Muhammad Waqar Ul Mulk builds AI chatbots, full-stack web applications and Python tools. Explore public project case studies and discuss your project.", body: `<p class="geo-lead">Software engineer in Lahore, Pakistan, working on AI, full-stack applications, data and automation.</p><h2>Services</h2>${links(services)}<h2>Project case studies</h2>${links(cases)}<p>Explore the public repositories behind the project notes, or use the interactive portfolio for more background.</p><h2>Professional profiles</h2>${profileLinks}${contact}` },
  { route: "/services/", title: "Software development services", description: "Explore AI chatbot, full-stack web development and Python application services from Muhammad Waqar Ul Mulk, with public project evidence.", body: `<p class="geo-lead">Choose the kind of system you need, then explore the related code and project notes.</p>${links(services)}<h2>How to start</h2><p>Send a short description of the workflow or product, the people who will use it, and the systems it needs to connect. Scope, milestones, deployment and ongoing support can then be discussed for your project.</p>${contact}` },
  { route: services[0][0], title: services[0][1], type: "Service", description: "AI chatbot and workflow automation development by Muhammad Waqar Ul Mulk. Explore appointment booking, retrieval and human handoff in ClinicChatbot.", body: `<p class="geo-lead">Connect conversational interfaces to useful business actions: answering knowledge-base questions, checking availability, booking appointments and handing conversations to a person.</p><h2>What a project can include</h2>${list(["A clearly scoped assistant with an approved knowledge source and defined limits.", "API integrations for booking or operational workflows, with input validation and access controls.", "A browser interface, staff tools and a handoff path when automation cannot resolve a request."])}<h2>Related work</h2><p>${link(cases[0][0], "ClinicChatbot")} documents a TypeScript application using Hono, Groq, LanceDB and libSQL/Turso. Its repository includes appointment tools, retrieval, reminders and human handoff.</p><h2>Planning the integration</h2><p>Useful starting information includes your existing booking system, approved FAQs, languages, staff availability and escalation process. Messaging provider access, consent requirements and deployment costs must be scoped for the particular business.</p><p>A demonstration does not establish production reliability. Before launch, integrations need testing with your actual rules and authorized test data.</p>${contact}` },
  { route: services[1][0], title: services[1][1], type: "Service", description: "React, Next.js and TypeScript web development by Muhammad Waqar Ul Mulk. Review public website and application projects before discussing your build.", body: `<p class="geo-lead">Build a web application or business website around a clear user journey, from the first page to the action the visitor needs to complete.</p><h2>Project scope</h2>${list(["Responsive React or Next.js interfaces with clear navigation and accessible forms.", "Backend APIs and application integrations when the workflow needs them.", "Deployment configuration, crawlable content and a documented handover."])}<h2>Public examples</h2><p>${link(cases[2][0], "Smile District clinic website")} demonstrates Next.js, React, Tailwind CSS and Three.js in a public marketing-site codebase. ${link(`${github}/waqar-ai-portfolio`, "This portfolio repository")} combines a React/Vite frontend with a separate Express/tRPC backend.</p><h2>Choose scope before stack</h2><p>A marketing site, internal tool and SaaS MVP have different needs. Share the essential user actions, roles, data sources and current hosting so that the first version focuses on the required workflow.</p><p>Database, authentication, payments and third-party services are project-specific decisions; a public website example is not evidence of all those features.</p>${contact}` },
  { route: services[2][0], title: services[2][1], type: "Service", description: "Python, text analysis and data application development by Muhammad Waqar Ul Mulk, supported by the public ResumeAI Screening Pro project.", body: `<p class="geo-lead">Turn documents or structured data into a tool that helps a person inspect, compare and act on the information.</p><h2>Potential applications</h2>${list(["Python tools for document parsing, text processing and repeatable analysis.", "Interactive data applications and exportable reports.", "Validation and evaluation against representative inputs before relying on automated results."])}<h2>Project evidence</h2><p>${link(cases[1][0], "ResumeAI Screening Pro")} is a Python and Streamlit project whose documentation describes resume comparison, skills-gap analysis, text extraction and report exports. Its listed machine-learning stack includes scikit-learn and NLTK.</p><h2>What to bring to a discovery discussion</h2><p>Provide an anonymized example of the inputs, the output you need, the rules that define a correct result, and expected volume. Sensitive production documents should not be sent with the initial inquiry.</p><p>Model scores need validation for the intended use. A portfolio demonstration is not a measured accuracy or business-impact guarantee.</p>${contact}` },
  { route: "/case-studies/", title: "Software project case studies", description: "Read source-backed case studies of ClinicChatbot, ResumeAI Screening Pro and a Next.js clinic website from Muhammad Waqar Ul Mulk's public GitHub.", body: `<p class="geo-lead">Project notes connected to public code, with the documented implementation and its limits made clear.</p>${links(cases)}<h2>How to assess the work</h2><p>Each write-up links to its repository so you can inspect the implementation and setup. The notes describe portfolio work; they do not assert client adoption, audited performance or revenue results.</p>${contact}` },
  { route: cases[0][0], title: "ClinicChatbot: appointment workflows and retrieval", type: "Article", description: "A source-backed case study of ClinicChatbot: TypeScript, Hono, Groq, LanceDB retrieval, appointment scheduling, reminders and human handoff.", body: `<p class="geo-lead">A conversational booking project that connects questions and appointment requests to application tools and stored business information.</p><h2>The problem</h2><p>A booking assistant needs more than fluent answers. It must check the business schedule, persist appointments and recognize when a staff member should take over.</p><h2>The documented implementation</h2>${list(["TypeScript and Hono provide the application and HTTP layer.", "Groq supplies language-model responses; LanceDB provides knowledge retrieval with a fallback path.", "libSQL/Turso and Drizzle store application data; appointment and reminder services implement the booking workflow.", "The repository describes browser testing, admin controls, Urdu/English replies and human handoff."])}<h2>What the evidence shows</h2><p>The public repository documents the architecture, setup and features. It supplies inspectable implementation evidence rather than a client-impact measurement.</p><h2>Integration limits</h2><p>The documented WhatsApp transport uses Baileys, an unofficial linked-device integration. An official provider integration would need separate evaluation. Availability rules, security configuration, backups and retrieval quality require testing before deployment for a real clinic.</p>${evidence("ClinicChatbot", "README.md", "Architecture and setup documentation")}<p>Related service: ${link(services[0][0], services[0][1])}.</p>${contact}` },
  { route: cases[1][0], title: "ResumeAI: resume analysis with Python", type: "Article", description: "Explore ResumeAI Screening Pro, a Python/Streamlit project documenting resume comparison, keyword analysis, skills gaps and downloadable reports.", body: `<p class="geo-lead">An interactive document-analysis application for comparing resumes with job descriptions and inspecting opportunities to improve the content.</p><h2>The workflow</h2><p>The documented application accepts resumes, evaluates several dimensions of their content, compares two resumes against a job description and exports analysis reports.</p><h2>The documented implementation</h2>${list(["Streamlit provides the interface and multiple analysis views.", "scikit-learn supplies TF-IDF and logistic-regression components; NLTK supports text processing.", "PyPDF2, python-docx and pdfplumber are listed for document extraction.", "The README describes keyword scoring, skills-gap analysis, history and TXT, JSON or CSV exports."])}<h2>How to interpret the result</h2><p>The scores are application-defined indicators. No independent benchmark is provided here showing equivalence to commercial applicant tracking systems, hiring accuracy or improved employment outcomes. A person should review any result before using it in a decision.</p>${evidence("ResumeAI-Screening-Pro", "README.md", "Feature and stack documentation")}<p>Related service: ${link(services[2][0], services[2][1])}.</p>${contact}` },
  { route: cases[2][0], title: "Smile District: a Next.js clinic website", type: "Article", description: "A public-code case study of the Smile District clinic website: Next.js, React, Tailwind CSS, Three.js and 3D asset tooling.", body: `<p class="geo-lead">A clinic marketing-site codebase with a React interface and 3D presentation components.</p><h2>Project identity</h2><p>The public GitHub repository is named <code>clinic</code>. Its package identifies the project as <code>smile-district-web</code> and describes a Smile District Dental &amp; Aesthetic Clinic marketing website.</p><h2>Inspectable technical choices</h2>${list(["Next.js 14 and React 18 for the web application.", "Tailwind CSS and Framer Motion for styling and interaction.", "Three.js with React Three Fiber and Drei for 3D presentation.", "A model-optimization script and glTF tooling for 3D assets."])}<h2>Scope of this case study</h2><p>The package and public source support the website and tooling description. This write-up does not establish patient-record management, production adoption or the business results of a live clinic. It is a separate project from AestheticsPlace.pk shown elsewhere in the portfolio.</p>${evidence("clinic", "package.json", "Package configuration")}<p>Related service: ${link(services[1][0], services[1][1])}.</p>${contact}` },
  { route: "/contact/", title: `Contact ${name}`, type: "ContactPage", description: "Contact Muhammad Waqar Ul Mulk about AI chatbots, web applications or Python projects by email, LinkedIn or his public freelance profiles.", body: `<p class="geo-lead">Have a workflow to automate or an application to build? Send a short project brief.</p><p><a class="geo-cta" href="${whatsapp}">Chat on WhatsApp</a></p><p>${link(`mailto:${email}?subject=Project%20inquiry`, `Email ${email}`)}</p><p>The email link opens your email app. You must send the message there. If no email app is configured, copy the address or use one of the profiles below.</p><h2>Include in your brief</h2>${list(["The problem and who will use the solution.", "Existing tools or website links and the result you need.", "Your preferred timeline, scope and budget range if known."])}<h2>Professional profiles</h2>${profileLinks}<p>Based in Lahore, Pakistan; open to remote project discussions.</p><p>${link("/services/", "Explore services")} or ${link("/case-studies/", "review project evidence")}.</p>` },
];

function schema(page) {
  const url = origin + page.route;
  const person = { "@type": "Person", "@id": `${origin}/#person`, name, telephone: "+923010492137", url: `${origin}/`, jobTitle: "Software Engineer", description: "Software engineer working on AI, full-stack applications, data and automation.", sameAs: profiles.map(([, url]) => url), address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" } };
  const website = { "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: `${name} — Software Engineering Portfolio`, publisher: { "@id": person["@id"] }, inLanguage: "en" };
  const webpage = { "@type": page.type === "ContactPage" ? "ContactPage" : "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { "@id": website["@id"] }, about: { "@id": person["@id"] }, inLanguage: "en" };
  const graph = [person, website, webpage];
  if (page.type === "Service") graph.push({ "@type": "Service", "@id": `${url}#service`, name: page.title, description: page.description, url, provider: { "@id": person["@id"] }, mainEntityOfPage: { "@id": webpage["@id"] } });
  if (page.type === "Article") graph.push({ "@type": "Article", "@id": `${url}#article`, headline: page.title, description: page.description, url, author: { "@id": person["@id"] }, mainEntityOfPage: { "@id": webpage["@id"] } });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

function metadata(page) {
  const title = page.route === "/" ? page.title : `${page.title} | ${name}`;
  return `<title>${escape(title)}</title>
<meta name="description" content="${escape(page.description)}">
<meta name="author" content="${name}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${origin}${page.route}">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(page.description)}">
<meta property="og:type" content="${page.type === "Article" ? "article" : "website"}">
<meta property="og:url" content="${origin}${page.route}">
<meta property="og:site_name" content="${name}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(page.description)}">
<script type="application/ld+json">${schema(page)}</script>`;
}
const nav = `<nav aria-label="Main navigation">${link("/", "Interactive portfolio")}${link("/services/", "Services")}${link("/case-studies/", "Case studies")}${link("/contact/", "Contact")}</nav>`;
const shell = page => `<a class="geo-skip" href="#content">Skip to content</a><header>${link("/", name)}${nav}</header><main id="content"><h1>${escape(page.title)}</h1>${page.body}</main><footer><p>${name} · Lahore, Pakistan</p>${nav}<p>${link(whatsapp, "WhatsApp: +92 301 0492137")} · ${link(`mailto:${email}`, email)}</p></footer>`;

// Keep the existing SPA assets and behavior; its initial HTML also has readable content.
const homeFile = path.join(output, "index.html");
const home = await readFile(homeFile, "utf8");
const updated = home
  .replace(/<title>[\s\S]*?<\/title>/gi, "")
  .replace(/<meta\b[^>]*(?:name=["'](?:description|author|robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, "")
  .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
  .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<script\b[^>]*src=["'][^"']*%VITE_ANALYTICS_ENDPOINT%[^"']*["'][^>]*><\/script>/gi, "")
  .replace("</head>", `${metadata(pages[0])}<link rel="stylesheet" href="/geo.css"></head>`)
  .replace('<div id="root"></div>', `<div id="root"><div class="geo-page">${shell(pages[0])}</div></div>`);
if (updated === home || !updated.includes('id="content"')) throw new Error("Homepage template changed; verify static content injection.");
await writeFile(homeFile, updated);
for (const page of pages.slice(1)) {
  const dir = path.join(output, page.route.slice(1));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080a0f">${metadata(page)}<link rel="stylesheet" href="/geo.css"></head><body class="geo-page">${shell(page)}</body></html>`);
}
await writeFile(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${origin}${page.route}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Generated ${pages.length} crawlable pages and sitemap for ${origin}`);

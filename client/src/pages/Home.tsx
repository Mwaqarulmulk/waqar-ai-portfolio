// Signal / Systems: this page is a readable AI engineering instrument—indexed sections, honest proof chips, and motion used to explain systems.
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  Circle,
  Cloud,
  Code2,
  Command,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Github,
  GitBranch,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Play,
  ScanSearch,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const HERO_IMAGE = "/manus-storage/waqar-neural-aperture_80fad751.png";
const MEGILANCE_IMAGE = "/manus-storage/waqar-megilance-visual_b3262aaf.png";
const CAMPUSAXIS_IMAGE = "/manus-storage/waqar-campusaxis-visual_f6566d9d.png";
const PIPELINE_IMAGE = "/manus-storage/waqar-data-pipeline-visual_6b7464e5.png";
const MWM_MARK = "/manus-storage/waqar-mwm-mark_046bad0d.png";

const navItems = [
  ["About", "about"],
  ["Journey", "journey"],
  ["Work", "work"],
  ["AI Lab", "ai-lab"],
  ["Stack", "stack"],
  ["Contact", "contact"],
] as const;

const metrics = [
  ["70%", "manual data-entry reduction", "automation impact"],
  ["500+", "internal dashboard users", "adoption at scale"],
  ["300ms → 100ms", "API response optimization", "performance work"],
  ["95%+", "on-time delivery coordination", "operational reliability"],
] as const;

const projects = [
  {
    number: "01",
    title: "MegiLance",
    category: "AI + FULL-STACK + WEB3",
    description:
      "An AI and blockchain-powered freelancing marketplace concept focused on better matching, pricing, trust, and cross-border workflows.",
    tech: ["Next.js", "FastAPI", "Python", "AI / LLM", "Web3"],
    image: MEGILANCE_IMAGE,
    accent: "lime",
    tags: ["AI", "FULL-STACK", "WEB3"],
    flow: ["CLIENT", "AI MATCHING", "FREELANCER", "PROPOSAL", "CONTRACT"],
  },
  {
    number: "02",
    title: "CampusAxis",
    category: "EDTECH / FULL-STACK PLATFORM",
    description:
      "An academic resource and student support platform that brings campus utilities, GPA tools, faculty reviews, and community resources into one experience.",
    tech: ["React", "TypeScript", "Node.js", "SQL", "Product UI"],
    image: CAMPUSAXIS_IMAGE,
    accent: "ice",
    tags: ["FULL-STACK", "TOOLS"],
    flow: ["ACADEMICS", "REVIEWS", "TOOLS", "COMMUNITY", "RESOURCES"],
  },
  {
    number: "03",
    title: "ResumeAI Screening",
    category: "AI / DOCUMENT INTELLIGENCE",
    description:
      "A repository-backed experiment that explores resume upload, document parsing, NLP analysis, scoring, and skills-gap feedback without invented production metrics.",
    tech: ["Python", "NLP", "Document parsing", "Scoring"],
    image: PIPELINE_IMAGE,
    accent: "blue",
    tags: ["AI", "TOOLS"],
    flow: ["UPLOAD", "PARSING", "NLP", "SCORING", "SKILLS GAP"],
  },
];

const experience = [
  {
    year: "09.25 — NOW",
    role: "Data Engineer · AI Automation Engineer",
    company: "Mavericks United",
    location: "Lahore",
    summary:
      "Building scalable ETL / ELT pipelines and analytics datasets across ServiceNow, CRM, and operational sources.",
    stack: ["Python", "Airflow", "dbt", "SQL", "Azure Synapse", "ADF"],
    flow: ["SOURCE SYSTEMS", "INGESTION", "AIRFLOW", "DBT", "WAREHOUSE", "ANALYTICS"],
  },
  {
    year: "07.25 — NOW",
    role: "Business Development Executive",
    company: "Mavericks United",
    location: "Remote",
    summary:
      "Connecting lead generation, segmentation, proposal development, and technical discovery into a measurable client pipeline.",
    stack: ["LinkedIn", "Upwork", "CRM", "Analytics", "Proposals"],
    flow: ["LEADS", "DATA", "SEGMENTATION", "PROPOSAL", "CONVERSION"],
  },
  {
    year: "05.25 — 07.25",
    role: "Business Development Executive",
    company: "Cubic Solutions",
    location: "Pakistan",
    summary:
      "Worked across Python, SQL, data analysis, Power BI reporting, and cross-functional delivery.",
    stack: ["Python", "SQL", "Power BI", "Reporting"],
    flow: ["BRIEF", "ANALYSIS", "REPORT", "DECISION"],
  },
  {
    year: "09.24 — 11.24",
    role: "Lead Dispatcher",
    company: "OIG Dispatch",
    location: "Pakistan",
    summary:
      "Coordinated routes and drivers while monitoring logistics data, KPI movement, and operational reporting.",
    stack: ["Logistics data", "Excel", "Power BI", "KPI monitoring"],
    flow: ["REQUEST", "ROUTE", "DRIVER", "STATUS", "REPORT"],
  },
  {
    year: "2022 — 2023",
    role: "Business Development Specialist",
    company: "Freelance",
    location: "Remote",
    summary:
      "Supported startups with social campaigns, digital presence, engagement, online sales, and brand visibility.",
    stack: ["Social", "Campaigns", "Consulting", "Growth"],
    flow: ["INSIGHT", "CAMPAIGN", "ENGAGEMENT", "SALES"],
  },
];

const skillGroups: Record<string, { icon: typeof BrainCircuit; items: string[]; note: string }> = {
  AI: { icon: BrainCircuit, items: ["LLM applications", "RAG", "Embeddings", "AI automation", "Agent workflows", "NLP"], note: "Systems that reason, retrieve, call tools, and stay inspectable." },
  Frontend: { icon: Code2, items: ["React", "Next.js", "TypeScript", "JavaScript", "Product UI", "Motion"], note: "Interfaces that make complex products feel direct and useful." },
  Backend: { icon: Server, items: ["Node.js", "Python", "FastAPI", "REST APIs", "GraphQL", "Integrations"], note: "Service layers built for clarity, composability, and scale." },
  Data: { icon: Database, items: ["Python", "SQL", "Airflow", "dbt", "ETL / ELT", "Power BI"], note: "Reliable pipelines that move clean data toward decisions." },
  Cloud: { icon: Cloud, items: ["Azure", "AWS", "Docker", "CI / CD", "Blob Storage", "Synapse"], note: "Pragmatic infrastructure with an eye on observability and cost." },
};

const agentSteps = [
  { label: "PLANNER", detail: "Breaking the request into a sequence of actions." },
  { label: "RESEARCH AGENT", detail: "Collecting relevant options and constraints." },
  { label: "ANALYSIS AGENT", detail: "Comparing trade-offs across the candidate stack." },
  { label: "VALIDATOR", detail: "Checking the output against the request." },
  { label: "FINAL RESPONSE", detail: "A concise recommendation is ready." },
];

const ragSteps = ["DOCUMENT", "CHUNKING", "EMBEDDINGS", "VECTOR SEARCH", "RETRIEVAL", "LLM", "ANSWER"];
const pipelineSteps = ["CSV / API", "INGESTION", "VALIDATION", "TRANSFORMATION", "DBT", "WAREHOUSE", "ANALYTICS"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionKicker({ index, label, tone = "lime" }: { index: string; label: string; tone?: "lime" | "ice" }) {
  return (
    <div className="section-kicker">
      <span className={`kicker-dot ${tone}`} />
      <span>{index}</span>
      <span className="kicker-line" />
      <span>{label}</span>
    </div>
  );
}

function Chip({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <span className={`chip ${muted ? "muted" : ""}`}>{children}</span>;
}

function StatusPill({ children, tone = "lime" }: { children: React.ReactNode; tone?: "lime" | "ice" | "muted" }) {
  return (
    <span className={`status-pill ${tone}`}>
      <span className="status-pulse" />
      {children}
    </span>
  );
}

function Flow({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <div className={`flow ${compact ? "compact" : ""}`}>
      {items.map((item, index) => (
        <div className="flow-node" key={item}>
          <span>{item}</span>
          {index !== items.length - 1 && <ArrowRight size={13} strokeWidth={1.6} />}
        </div>
      ))}
    </div>
  );
}

function NeuralCore() {
  const nodes = [
    ["AI", "core-node n1"],
    ["DATA", "core-node n2"],
    ["API", "core-node n3"],
    ["CLOUD", "core-node n4"],
    ["LLM", "core-node n5"],
  ];
  return (
    <div className="neural-core" aria-label="Procedural neural intelligence core visual" role="img">
      <div className="core-grid" />
      <div className="core-orbit orbit-one" />
      <div className="core-orbit orbit-two" />
      <div className="core-orbit orbit-three" />
      <svg className="core-connections" viewBox="0 0 500 500" aria-hidden="true">
        <path d="M250 250 L112 154 M250 250 L394 157 M250 250 L420 334 M250 250 L112 360 M250 250 L250 50" />
        <path d="M112 154 L394 157 M394 157 L420 334 M420 334 L112 360 M112 360 L112 154" opacity=".35" />
      </svg>
      <div className="core-glass">
        <div className="core-kernel"><span /><span /><span /></div>
        <div className="core-ring ring-one" />
        <div className="core-ring ring-two" />
      </div>
      {nodes.map(([label, className]) => <div className={className} key={label}><span className="node-dot" />{label}</div>)}
      <div className="core-readout readout-top"><span>VISUAL INTERFACE</span><b>READY</b></div>
      <div className="core-readout readout-bottom"><span>MODE</span><b>PROCEDURAL / LOW COST</b></div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <article className={`project-card ${project.accent}`}>
      <div className="project-visual" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="project-visual-overlay" />
        <div className="project-orbit orbit-a" />
        <div className="project-orbit orbit-b" />
        <div className="project-card-top"><span>{project.number}</span><span>{project.category}</span></div>
        <div className="project-mini-flow"><Flow items={project.flow} compact /></div>
        <div className="project-hover-label"><Eye size={15} /> INSPECT SYSTEM <ArrowUpRight size={15} /></div>
      </div>
      <div className="project-body">
        <div className="project-title-row"><h3>{project.title}</h3><ArrowUpRight className="project-arrow" size={24} strokeWidth={1.5} /></div>
        <p>{project.description}</p>
        <div className="project-tags">{project.tech.map((item) => <Chip key={item}>{item}</Chip>)}</div>
        <div className="project-foot"><span className="proof-chip"><Check size={12} /> SOURCE-VERIFIED PROJECT</span><button type="button" onClick={() => scrollToId("contact")} className="text-link">View case study <ArrowRight size={15} /></button></div>
      </div>
    </article>
  );
}

function RecruiterPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="recruiter-panel" role="dialog" aria-modal="true" aria-labelledby="recruiter-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button panel-close" onClick={onClose} aria-label="Close recruiter mode"><X size={18} /></button>
        <SectionKicker index="/ QUICK READ" label="RECRUITER MODE" tone="ice" />
        <h2 id="recruiter-title">The short version<span className="accent-dot">.</span></h2>
        <p className="panel-intro">A focused read on role fit, core stack, and how to reach Muhammad without scanning the full lab.</p>
        <div className="recruiter-grid">
          <div><span className="meta-label">ROLE</span><strong>Software Engineer / AI Engineer</strong></div>
          <div><span className="meta-label">LOCATION</span><strong>Lahore, Pakistan</strong></div>
          <div><span className="meta-label">EXPERIENCE</span><strong>Data Engineering · AI Automation · Full-Stack</strong></div>
          <div><span className="meta-label">AVAILABILITY</span><strong>Remote / open to opportunities</strong></div>
        </div>
        <div className="panel-stack"><span className="meta-label">CORE STACK</span><div className="project-tags">{["Python", "FastAPI", "Node.js", "React", "Next.js", "SQL", "Airflow", "dbt", "Azure", "AWS"].map((item) => <Chip key={item}>{item}</Chip>)}</div></div>
        <div className="panel-actions"><button className="button-primary" onClick={() => { onClose(); scrollToId("contact"); }}>Let's connect <ArrowUpRight size={16} /></button><button className="button-secondary" onClick={() => { onClose(); scrollToId("open-source"); }}>Open source <ArrowRight size={16} /></button></div>
      </section>
    </div>
  );
}

function CommandPalette({ onClose, onRecruiter }: { onClose: () => void; onRecruiter: () => void }) {
  const commands = [...navItems.map(([label, id]) => ({ label: `Go to ${label}`, action: () => { onClose(); scrollToId(id); }, icon: ArrowRight })), { label: "Recruiter mode", action: () => { onClose(); onRecruiter(); }, icon: Zap }];
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="command-panel" role="dialog" aria-modal="true" aria-labelledby="command-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-heading"><div><span className="meta-label">SYSTEM COMMANDS</span><h2 id="command-title">Navigate the lab<span className="accent-dot">.</span></h2></div><kbd>ESC</kbd></div>
        <div className="command-list">{commands.map(({ label, action, icon: Icon }) => <button key={label} type="button" onClick={action}><Icon size={16} />{label}<span>↵</span></button>)}</div>
        <div className="command-footer"><Command size={14} /> Press <b>Ctrl K</b> anytime to reopen</div>
      </section>
    </div>
  );
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [commandOpen, setCommandOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState("ALL");
  const [activeSkill, setActiveSkill] = useState("AI");
  const [activeDemo, setActiveDemo] = useState("orchestrator");
  const [orchestrating, setOrchestrating] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [ragRun, setRagRun] = useState(false);
  const [pipelineRun, setPipelineRun] = useState(false);
  const [pipelineError, setPipelineError] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooting(false), 1700);
    const interval = window.setInterval(() => setBootProgress((current) => Math.min(current + 10, 100)), 150);
    return () => { window.clearTimeout(bootTimer); window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ["hero", ...navItems.map(([, id]) => id), "open-source"];
      const current = sections.reduce((closest, id) => {
        const node = document.getElementById(id);
        if (!node) return closest;
        return Math.abs(node.getBoundingClientRect().top - 120) < Math.abs((document.getElementById(closest)?.getBoundingClientRect().top ?? 9999) - 120) ? id : closest;
      }, "hero");
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen(true); }
      if (event.key === "Escape") { setCommandOpen(false); setRecruiterOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!orchestrating) return;
    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      setAgentStep(Math.min(tick, agentSteps.length - 1));
      if (tick >= agentSteps.length - 1) { window.clearInterval(timer); setOrchestrating(false); }
    }, reducedMotion ? 120 : 520);
    return () => window.clearInterval(timer);
  }, [orchestrating, reducedMotion]);

  const filteredProjects = useMemo(() => activeProjectFilter === "ALL" ? projects : projects.filter((project) => project.tags.includes(activeProjectFilter)), [activeProjectFilter]);
  const ActiveSkillIcon = skillGroups[activeSkill].icon;

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSent(true);
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className={`site-shell ${reducedMotion ? "reduced-motion" : ""}`}>
      {booting && <div className="preloader" aria-label="Loading portfolio"><div className="preloader-mark"><img src={MWM_MARK} alt="" /><span /></div><div className="preloader-copy"><span>BOOTING INTELLIGENCE</span><b>{String(bootProgress).padStart(3, "0")}</b></div><div className="preloader-progress"><span style={{ width: `${bootProgress}%` }} /></div><span className="preloader-hint">MWM / SOFTWARE ENGINEER / 2026</span></div>}

      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <a className="brand-lockup" href="#hero" aria-label="Muhammad Waqar Ul Mulk home"><span className="brand-mark"><img src={MWM_MARK} alt="" /></span><span className="brand-name"><b>MWM</b><small>AI / FULL-STACK / DATA</small></span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""}>{label}</a>)}</nav>
        <div className="nav-actions"><button className="command-trigger" type="button" onClick={() => setCommandOpen(true)} aria-label="Open command palette"><Command size={15} /><kbd>⌘ K</kbd></button><button className="recruiter-trigger" type="button" onClick={() => setRecruiterOpen(true)}>Recruiter mode <ArrowUpRight size={14} /></button><button className="mobile-menu-trigger" type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button></div>
      </header>

      {mobileOpen && <div className="mobile-nav-overlay"><div className="mobile-nav-top"><span className="meta-label">MWM / INDEX</span><button className="icon-button" onClick={closeMobile} aria-label="Close navigation"><X size={20} /></button></div><nav aria-label="Mobile navigation">{navItems.map(([label, id], index) => <a key={id} href={`#${id}`} onClick={closeMobile}><span>0{index + 1}</span>{label}<ArrowUpRight size={19} /></a>)}</nav><button className="button-primary mobile-recruiter" onClick={() => { closeMobile(); setRecruiterOpen(true); }}>Recruiter mode <ArrowUpRight size={16} /></button><div className="mobile-nav-footer"><span>Built for clear thinking.</span><span>LAHORE / REMOTE</span></div></div>}

      <aside className="signal-spine" aria-label="Portfolio section index"><div className="spine-mark"><img src={MWM_MARK} alt="" /></div><div className="spine-track">{[["00", "hero", "ENTRY"], ...navItems.map(([label, id], index) => [String(index + 1).padStart(2, "0"), id, label.toUpperCase()] as const)].map(([index, id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} aria-label={`Go to ${label.toLowerCase()}`}><span>{index}</span><i /></a>)}</div><span className="spine-caption">MWM / INDEX</span></aside>

      <main className={booting ? "is-booting" : ""}>
        <section id="hero" className="hero-section" data-section="hero">
          <div className="hero-index"><span>00 — ENTRY</span><span className="vertical-rule" /><span>SCROLL TO EXPLORE</span></div>
          <div className="hero-content container">
            <div className="hero-copy"><div className="eyebrow reveal-item"><span className="eyebrow-pulse" />REMOTE SOFTWARE ENGINEER · LAHORE, PAKISTAN</div><h1 className="hero-title reveal-item">I BUILD<br /><span>INTELLIGENT</span><br />SOFTWARE<span className="accent-dot">.</span></h1><p className="hero-description reveal-item">AI systems, full-stack products, and data automation engineered for teams moving from complexity to leverage.</p><div className="hero-actions reveal-item"><button className="button-primary" onClick={() => scrollToId("work")}>Explore my work <ArrowUpRight size={17} /></button><button className="button-secondary" onClick={() => scrollToId("contact")}>Let's connect <ArrowRight size={17} /></button></div><div className="hero-proof reveal-item"><span><Check size={13} /> AI & Full-Stack Developer</span><span><Check size={13} /> Agentic AI Specialist</span><span><Check size={13} /> Data & Automation Engineer</span></div></div>
            <div className="hero-visual reveal-item"><div className="hero-visual-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} /><div className="hero-visual-scrim" /><NeuralCore /><div className="hero-caption"><span>01 / NEURAL APERTURE</span><span>CURSOR-REACTIVE / PROCEDURAL</span></div></div>
          </div>
            <div className="hero-statusbar container"><div><StatusPill>VISUAL INTERFACE</StatusPill><span>Motion is optional. Clarity is not.</span></div><div><span className="status-label">SYSTEM STATE</span><b>READY TO INSPECT</b></div></div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="container"><SectionKicker index="01 / ABOUT" label="WHO I AM" /><div className="about-grid"><div className="about-headline"><h2>I build systems,<br /><em>not just screens.</em></h2><div className="about-aside"><span className="aside-line" /><span>AI · PRODUCT · DATA<br />CONNECTED BY CRAFT</span></div></div><div className="about-copy"><p className="lead-copy">I'm a Software Engineer and AI specialist based in Pakistan, focused on building scalable software, AI-powered workflows, data systems, and modern digital products.</p><p>My work moves between frontend architecture, backend services, automation, cloud infrastructure, and analytics. The throughline is simple: make the system understandable enough to trust, and useful enough to matter.</p><div className="about-signals"><div><Network size={18} /><span><b>PRODUCT THINKING</b><small>Interfaces with a job to do</small></span></div><div><Workflow size={18} /><span><b>SYSTEMS THINKING</b><small>Data flows you can inspect</small></span></div><div><ShieldCheck size={18} /><span><b>HONEST DELIVERY</b><small>Proof over inflated claims</small></span></div></div></div></div><div className="about-diagram"><div className="diagram-header"><span className="meta-label">SYSTEM MAP / 001</span><span><Circle size={8} fill="currentColor" /> HOVER A LAYER</span></div><div className="diagram-stack">{[["FRONTEND", "React · Next.js · TypeScript", Code2], ["BACKEND", "Node.js · Python · FastAPI", Server], ["AI", "LLM · RAG · Agents · Tools", BrainCircuit], ["DATA", "Python · SQL · Airflow · dbt", Database], ["CLOUD", "Azure · AWS · Docker · CI/CD", Cloud]].map(([title, text, Icon], index) => { const LayerIcon = Icon as typeof BrainCircuit; return <div className={`diagram-layer layer-${index}`} key={title as string}><span className="layer-number">0{index + 1}</span><LayerIcon size={17} /><strong>{title as string}</strong><span>{text as string}</span><ArrowUpRight size={15} /></div>; })}</div></div></div>
        </section>

        <section className="metrics-section"><div className="container"><div className="metrics-header"><SectionKicker index="02 / IMPACT" label="VERIFIED SIGNALS" tone="ice" /><span>Only metrics supplied in the profile are shown.</span></div><div className="metrics-grid">{metrics.map(([value, label, note], index) => <div className="metric" key={label}><span className="metric-index">0{index + 1}</span><strong>{value}</strong><span>{label}</span><small>{note}</small></div>)}</div></div></section>

        <section id="journey" className="journey-section section-pad"><div className="container"><SectionKicker index="03 / JOURNEY" label="ENGINEERING JOURNEY" /><div className="section-heading-row"><h2>Where the work<br /><em>gets real.</em></h2><p>Data engineering, business development, logistics, and product building—different contexts, one habit: connect the moving parts.</p></div><div className="journey-list">{experience.map((item, index) => <article className={`experience-item ${index === 0 ? "current" : ""}`} key={`${item.company}-${item.year}`}><div className="experience-time"><span>{item.year}</span><span className="experience-line" /></div><div className="experience-main"><div className="experience-title"><span className="experience-status">{index === 0 ? <StatusPill>ACTIVE</StatusPill> : <span className="status-pill muted"><span className="status-pulse" />PAST</span>}</span><h3>{item.role}</h3><span className="company">{item.company} <span>·</span> {item.location}</span></div><p>{item.summary}</p><div className="experience-flow"><Flow items={item.flow} compact /></div><div className="project-tags">{item.stack.map((itemStack) => <Chip muted key={itemStack}>{itemStack}</Chip>)}</div></div></article>)}</div></div></section>

        <section id="work" className="work-section section-pad"><div className="container"><SectionKicker index="04 / WORK" label="SELECTED SYSTEMS" /><div className="section-heading-row work-heading"><div><h2>Things I've<br /><em>built.</em></h2></div><div><p>Real projects stay separate from the lab simulations. Open a card to see the shape of the system and the decisions behind it.</p><div className="filter-row" role="group" aria-label="Filter projects">{["ALL", "AI", "FULL-STACK", "DATA", "TOOLS", "WEB3"].map((filter) => <button type="button" key={filter} className={activeProjectFilter === filter ? "active" : ""} onClick={() => setActiveProjectFilter(filter)}>{filter}</button>)}</div></div></div><div className="project-list">{filteredProjects.map((project) => <ProjectCard key={project.title} project={project} />)}</div><div className="work-note"><Terminal size={17} /><span>Repository-backed work is presented with the evidence available in the supplied profile. Live URLs are intentionally not fabricated.</span></div></div></section>

        <section id="ai-lab" className="ai-lab-section section-pad"><div className="container"><div className="ai-lab-top"><div><div className="system-brand-cue"><span className="brand-mark"><img src={MWM_MARK} alt="" /></span><span>MWM / ENGINEERED SYSTEMS</span></div><SectionKicker index="05 / AI LAB" label="INTERACTIVE DEMONSTRATIONS" /><h2>AI is not a button.<br /><em>It's a system.</em></h2></div><div className="ai-lab-intro"><StatusPill tone="ice">SIMULATED WORKFLOW</StatusPill><p>Don't just read about the architecture. Inspect a few small, sandboxed front-end demonstrations—no backend claims, no hidden API keys.</p></div></div><div className="ai-system-map"><div className="system-map-label">INPUT</div><ArrowRight size={16} /><div className="system-map-label">REASONING</div><ArrowRight size={16} /><div className="system-map-label">TOOLS</div><ArrowRight size={16} /><div className="system-map-label">MEMORY</div><ArrowRight size={16} /><div className="system-map-label">VALIDATION</div><ArrowRight size={16} /><div className="system-map-label active">OUTPUT</div></div><div className="lab-shell"><aside className="lab-sidebar"><span className="meta-label">CHOOSE A SYSTEM</span>{[["orchestrator", "Agent orchestrator", Network], ["rag", "RAG retrieval", ScanSearch], ["pipeline", "Data pipeline", Database], ["appointment", "Appointment agent", CalendarDays]].map(([id, label, Icon]) => { const LabIcon = Icon as typeof Network; return <button type="button" key={id as string} className={activeDemo === id ? "active" : ""} onClick={() => setActiveDemo(id as string)}><LabIcon size={17} /><span>{label as string}</span><ArrowUpRight size={14} /></button>; })}<div className="lab-side-note"><Sparkles size={15} /><span>Every demo is labeled as interactive and simulated.</span></div></aside><div className="lab-main">
          {activeDemo === "orchestrator" && <div className="demo-panel"><div className="demo-heading"><div><span className="demo-code">DEMO / 01</span><h3>Agent orchestrator</h3><p>One request, routed through a small team of specialized steps.</p></div><div className="demo-proof"><span className="proof-chip"><Check size={12} /> FRONT-END SIMULATION</span><StatusPill>INTERACTIVE DEMO</StatusPill></div></div><div className="agent-request"><span className="meta-label">USER REQUEST</span><strong>Find the best technology stack for an AI SaaS MVP.</strong><button type="button" className="mini-button" onClick={() => { setAgentStep(0); setOrchestrating(true); }}><Play size={13} fill="currentColor" /> {orchestrating ? "Running" : "Run workflow"}</button></div><div className="agent-timeline">{agentSteps.map((step, index) => <div className={`agent-step ${index < agentStep ? "done" : ""} ${index === agentStep ? "current" : ""}`} key={step.label}><div className="agent-step-marker">{index < agentStep ? <Check size={14} /> : index === agentStep && orchestrating ? <span className="spinner-dot" /> : <span>{String(index + 1).padStart(2, "0")}</span>}</div><div><span>{step.label}</span><p>{index <= agentStep ? step.detail : "Waiting for upstream signal."}</p></div><span className="agent-step-status">{index < agentStep ? "DONE" : index === agentStep && orchestrating ? "THINKING" : "IDLE"}</span></div>)}</div><div className="agent-result"><div><span className="meta-label">OUTPUT</span><strong>{orchestrating ? "Validation in progress..." : agentStep === agentSteps.length - 1 ? "Recommendation ready for inspection." : "Run the workflow to see each step."}</strong></div><pre>{`{\n  "mode": "simulated",\n  "steps": ${agentStep + 1},\n  "status": "${orchestrating ? "running" : agentStep === agentSteps.length - 1 ? "complete" : "idle"}"\n}`}</pre></div></div>}
          {activeDemo === "rag" && <div className="demo-panel"><div className="demo-heading"><div><span className="demo-code">DEMO / 02</span><h3>RAG retrieval</h3><p>See how a document becomes context before an answer is composed.</p></div><div className="demo-proof"><span className="proof-chip"><Check size={12} /> CONCEPTUAL ARCHITECTURE</span><StatusPill tone="ice">SIMULATED WORKFLOW</StatusPill></div></div><div className="rag-query"><label htmlFor="rag-question">ASK THE DOCUMENT</label><div><input id="rag-question" defaultValue="What is the refund policy?" /><button type="button" className="mini-button" onClick={() => setRagRun(true)}><ScanSearch size={13} /> Retrieve</button></div></div><div className="rag-flow">{ragSteps.map((step, index) => <div className={`rag-step ${ragRun && index <= 6 ? "lit" : ""}`} key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < ragSteps.length - 1 && <ArrowRight size={14} />}</div>)}</div><div className="rag-result"><div><span className="meta-label">RETRIEVED SOURCES</span><strong>{ragRun ? "2 relevant document chunks" : "Waiting for a question"}</strong></div><div><span className="meta-label">CONFIDENCE</span><strong>{ragRun ? "0.86 / contextual" : "—"}</strong></div><div><span className="meta-label">SYSTEM NOTE</span><strong>LLM ≠ RAG system</strong></div></div></div>}
          {activeDemo === "pipeline" && <div className="demo-panel"><div className="demo-heading"><div><span className="demo-code">DEMO / 03</span><h3>Data pipeline agent</h3><p>Records move through checks, transformations, and a retry path.</p></div><div className="demo-proof"><span className="proof-chip"><Check size={12} /> FRONT-END SIMULATION</span><StatusPill>INTERACTIVE DEMO</StatusPill></div></div><div className="pipeline-controls"><button type="button" className="mini-button" onClick={() => { setPipelineRun(true); setPipelineError(false); }}><Play size={13} fill="currentColor" /> Run pipeline</button><button type="button" className="mini-button danger" onClick={() => { setPipelineError(true); setPipelineRun(true); }}><Zap size={13} /> Inject quality error</button></div><div className="pipeline-visual" style={{ backgroundImage: `url(${PIPELINE_IMAGE})` }}><div className="pipeline-visual-overlay" />{pipelineSteps.map((step, index) => <div className={`pipeline-step ${pipelineRun && index <= 6 ? "lit" : ""} ${pipelineError && index === 2 ? "error" : ""}`} key={step}><span className="pipeline-dot" />{step}</div>)}</div><div className={`pipeline-state ${pipelineError ? "error" : pipelineRun ? "success" : "idle"}`}>{pipelineError ? <><span><Zap size={14} /> DATA QUALITY ERROR</span><strong>Agent detected issue → root cause analysis → fix proposed → pipeline retried</strong></> : pipelineRun ? <><span><Check size={14} /> SUCCESS</span><strong>Validation passed. Records are ready for analytics.</strong></> : <><span><Activity size={14} /> IDLE</span><strong>Run a workflow or simulate a data quality error.</strong></>}</div></div>}
          {activeDemo === "appointment" && <div className="demo-panel"><div className="demo-heading"><div><span className="demo-code">DEMO / 04</span><h3>Appointment agent</h3><p>Intent detection, availability, and confirmation as a small state machine.</p></div><div className="demo-proof"><span className="proof-chip"><Check size={12} /> MOCK DATA ONLY</span><StatusPill tone="ice">INTERACTIVE DEMO</StatusPill></div></div><div className="appointment-chat"><div className="chat-message user">I want to book a dentist appointment tomorrow.</div><div className="chat-message agent"><span className="agent-avatar"><Bot size={15} /></span><div><span>UNDERSTANDING REQUEST...</span><p>Intent: <b>Appointment booking</b><br />Date: <b>Tomorrow</b><br />Service: <b>Dentist</b></p></div></div><div className="appointment-slots"><span className="meta-label">AVAILABLE SLOTS / MOCK DATA</span><div>{["09:30", "11:00", "14:30"].map((slot) => <button type="button" key={slot} onClick={() => setFormSent(true)} className={formSent ? "selected" : ""}>{slot}<small>{formSent ? "selected" : "select"}</small></button>)}</div></div>{formSent && <div className="booking-confirmed"><Check size={16} /><span><b>BOOKING CONFIRMED</b><small>Interactive demo state only.</small></span></div>}</div></div>}
        </div></div></div></section>

        <section id="stack" className="stack-section section-pad"><div className="container"><SectionKicker index="06 / STACK" label="MY ENGINEERING STACK" /><div className="stack-heading"><h2>Pick a layer.<br /><em>See the leverage.</em></h2><p>No progress bars. The stack is a set of connected capabilities, each with a job inside the larger system.</p></div><div className="skill-ecosystem"><div className="skill-nav">{Object.entries(skillGroups).map(([name, group]) => { const SkillIcon = group.icon; return <button type="button" key={name} onClick={() => setActiveSkill(name)} className={activeSkill === name ? "active" : ""}><SkillIcon size={17} /><span>{name}</span><ArrowUpRight size={14} /></button>; })}</div><div className="skill-focus"><div className="skill-focus-orbit orbit-a" /><div className="skill-focus-orbit orbit-b" /><div className="skill-focus-core"><ActiveSkillIcon size={24} /><span>SOFTWARE<br />ENGINEERING</span></div><div className="skill-focus-copy"><span className="meta-label">ACTIVE LAYER / {activeSkill.toUpperCase()}</span><p>{skillGroups[activeSkill].note}</p><div className="skill-cloud">{skillGroups[activeSkill].items.map((item) => <Chip key={item}>{item}</Chip>)}</div></div></div></div><div className="credential-grid"><div><span className="meta-label">CERTIFICATIONS</span><div className="credential-list">{["Microsoft Certified: Data Analyst Associate", "AWS Certified Solutions Architect", "Developing SQL Databases", "AI Engineer for Developers Associate", "AI Engineer for Data Scientists Associate"].map((item, index) => <div className="credential" key={item}><span>0{index + 1}</span><strong>{item}</strong><small>Credential listed in profile</small><Check size={14} /></div>)}</div></div><div><span className="meta-label">EDUCATION</span><div className="education-list"><div className="education-item"><span>2020</span><div><strong>COMSATS University Islamabad</strong><small>Bachelor's Degree · Computer Software Engineering</small></div></div><div className="education-item"><span>2018</span><div><strong>Punjab Group of Colleges</strong><small>ICS · Computer Science</small></div></div><div className="education-item"><span>—</span><div><strong>Allied School Depalpur Campus</strong><small>Matric</small></div></div></div></div></div></div></section>

        <section id="open-source" className="open-source-section section-pad"><div className="container"><SectionKicker index="07 / OPEN SOURCE" label="CODE / REPOSITORIES" tone="ice" /><div className="open-source-grid"><div><h2>Code you can<br /><em>look through.</em></h2><p>The supplied profile points to a public GitHub presence with experiments across AI, education, healthcare, preparation tools, and portfolio work.</p><button type="button" className="button-secondary" onClick={() => scrollToId("contact")}>Request verified profile link <ArrowUpRight size={16} /></button></div><div className="repo-panel"><div className="repo-panel-head"><span className="meta-label">SELECTED REPOSITORIES</span><span className="repo-status"><span className="status-pulse" /> PUBLIC / VERIFIED LIST</span></div>{["ResumeAI-Screening-Pro", "clinic", "NTSPrep", "TextToHandwriting", "ClinicChatbot", "portfolio", "myportfolio"].map((repo, index) => <div className="repo-row" key={repo}><span className="repo-number">{String(index + 1).padStart(2, "0")}</span><GitBranch size={15} /><strong>{repo}</strong><span className="repo-language">{index % 3 === 0 ? "Python" : index % 3 === 1 ? "TypeScript" : "React"}</span><ArrowUpRight size={15} /></div>)}<div className="repo-disclaimer"><Github size={15} /><span>No fabricated contribution counts or activity metrics are shown.</span></div></div></div></div></section>

        <section id="contact" className="contact-section section-pad"><div className="container"><SectionKicker index="08 / CONTACT" label="OPEN A CHANNEL" /><div className="contact-heading"><h2>Let's build<br /><em>something intelligent.</em></h2><p>Have a product, workflow, or data system in mind? Send the shape of the problem. The first conversation should make the next step clearer.</p></div><div className="contact-grid"><form className="contact-form" onSubmit={handleContact}><div className="form-row"><label>NAME<input name="name" placeholder="Your name" required /></label><label>EMAIL<input type="email" name="email" placeholder="you@company.com" required /></label></div><label>PROJECT TYPE<select name="projectType" defaultValue="AI / LLM"><option>AI / LLM</option><option>FULL-STACK</option><option>DATA ENGINEERING</option><option>AUTOMATION</option><option>WEB APPLICATION</option><option>OTHER</option></select></label><label>MESSAGE<textarea name="message" placeholder="What are you trying to build or improve?" rows={5} required /></label><div className="form-submit-row"><button type="submit" className="button-primary">{formSent ? "Message staged" : "Transmit message"} {formSent ? <Check size={16} /> : <Send size={16} />}</button><span>{formSent ? "Preview complete — connect an email endpoint to transmit for real." : "Local preview only. No message is sent from this static build."}</span></div></form><div className="contact-visual"><div className="contact-globe"><div className="globe-lat lat-one" /><div className="globe-lat lat-two" /><div className="globe-long long-one" /><div className="globe-long long-two" /><div className="globe-core"><MapPin size={20} /><span>LHR</span></div><div className="globe-orbit orbit-one" /><div className="globe-orbit orbit-two" /></div><div className="contact-visual-copy"><span className="meta-label">REMOTE / UTC+5</span><strong>Lahore, Pakistan</strong><span>Open to remote conversations across US time zones.</span></div><div className="contact-links"><button type="button" onClick={() => scrollToId("contact")}><Linkedin size={17} /><span>Let's connect<span>Verified profile URL pending</span></span><ArrowUpRight size={15} /></button><button type="button" onClick={() => scrollToId("open-source")}><Github size={17} /><span>Open source<span>Profile URL pending verification</span></span><ArrowUpRight size={15} /></button><button type="button" onClick={() => document.querySelector<HTMLInputElement>('input[name="email"]')?.focus()}><Mail size={17} /><span>Email channel<span>Use the form above</span></span><ArrowUpRight size={15} /></button></div></div></div></div></section>

        <section className="final-section"><div className="container"><div className="final-rule" /><div className="final-content"><span className="meta-label">END OF INDEX / BEGINNING OF BUILD</span><h2>Your next<br /><em>system starts here.</em></h2><button type="button" className="button-primary" onClick={() => scrollToId("contact")}>Let's build <ArrowUpRight size={17} /></button></div><div className="final-grid"><span>MWM / 2026</span><span>AI · FULL-STACK · DATA · AUTOMATION</span><span>SCROLL TO RESTART ↑</span></div></div></section>
      </main>

      <footer className="site-footer"><div className="container"><div className="footer-top"><div className="footer-brand"><span className="brand-mark"><img src={MWM_MARK} alt="" /></span><div><b>MUHAMMAD WAQAR UL MULK</b><span>Software Engineer · AI · Full-Stack · Data</span></div></div><div className="footer-links"><a href="#work">Projects</a><a href="#ai-lab">AI Lab</a><a href="#contact">Contact</a></div></div><div className="footer-bottom"><span>Built with code, curiosity, and too much coffee.</span><span><span className="footer-indicator" /> SYSTEM / ONLINE · VISUAL ONLY</span></div></div></footer>

      {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} onRecruiter={() => setRecruiterOpen(true)} />}
      {recruiterOpen && <RecruiterPanel onClose={() => setRecruiterOpen(false)} />}
      <div className="scroll-progress" aria-hidden="true"><span /></div>
    </div>
  );
}

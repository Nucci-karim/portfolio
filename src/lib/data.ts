/**
 * Central data file for the portfolio.
 * Edit this file to update name, projects, skills, contact.
 * Everything else (components, layout, animations) reads from here.
 */

export const profile = {
  name: "Karim Nucci",
  title: "Frontend Developer",
  tagline: "React + TypeScript engineer building enterprise-grade interfaces.",
  longBio: [
    "I'm a frontend engineer with 3+ years at Accenture building production React and TypeScript applications for tier-1 European enterprise clients in regulated industries.",
    "My focus: component libraries, performance optimization, modern frontend tooling. I care about Core Web Vitals, accessibility, and shipping interfaces that feel as good as they look.",
    "On the side I ship Next.js websites with AI integrations for SMB clients. Italian and French native, professional English, basic Arabic. Currently in Rome, relocating to Dubai in Q3 2026.",
  ],
  location: "Rome, Italy → Dubai, UAE (Q3 2026)",
  email: "nuccikarim@gmail.com",
  phone: "+39 351 5327445",
  socials: {
    linkedin: "https://linkedin.com/in/karimnucci",
    github: "https://github.com/Nucci-karim",
  },
  cvUrl: "/karim-nucci-cv.pdf", // place the PDF in /public/karim-nucci-cv.pdf
} as const;

export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  description: string;
  stack: string[];
  metrics?: { label: string; value: string }[];
  highlight: string;
};

export const projects: Project[] = [
  {
    id: "enterprise-design-system",
    title: "Enterprise Design System",
    year: "2024",
    category: "Component Library",
    summary: "React + Lit + Storybook component library serving 4+ product teams across regulated-industry verticals.",
    description:
      "Architected and shipped a shared component library adopted across multiple enterprise applications. The system standardized UI patterns, reduced duplication, and accelerated feature delivery — while maintaining visual + behavioral consistency at scale.",
    stack: ["React", "TypeScript", "Lit", "Web Components", "Storybook", "Figma"],
    metrics: [
      { label: "Product teams", value: "4+" },
      { label: "UI delivery speed", value: "~25% faster" },
      { label: "Apps unified", value: "Multiple" },
    ],
    highlight: "Component library",
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization Initiative",
    year: "2024",
    category: "Performance",
    summary: "Reduced core client portal bundle size by ~30% and improved LCP by ~25% on 4G mobile.",
    description:
      "Led a performance optimization initiative across the core client-facing portal. Combined Webpack Bundle Analyzer audits with strategic code splitting, dynamic imports, and tree shaking to dramatically improve perceived performance — especially on mobile networks.",
    stack: ["React", "Webpack", "Bundle Analyzer", "Core Web Vitals"],
    metrics: [
      { label: "Bundle size", value: "-30%" },
      { label: "LCP improvement", value: "+25%" },
      { label: "Network target", value: "4G mobile" },
    ],
    highlight: "Performance",
  },
  {
    id: "microfrontend-migration",
    title: "Microfrontend Architecture Migration",
    year: "2023-2024",
    category: "Architecture",
    summary: "Contributed to migration from monolithic React SPA to micro-frontends using Webpack Module Federation.",
    description:
      "Helped migrate a legacy React monolithic SPA to a micro-frontend architecture using Webpack Module Federation. Enabled independent deployment cycles for 4+ product teams, reducing release coordination overhead and unlocking team autonomy.",
    stack: ["React", "Webpack Module Federation", "TypeScript", "CI/CD"],
    metrics: [
      { label: "Independent teams", value: "4+" },
      { label: "Release coupling", value: "Decoupled" },
    ],
    highlight: "Architecture",
  },
  {
    id: "email-templates-platform",
    title: "Responsive Email Templates Platform",
    year: "2024",
    category: "Email Engineering",
    summary: "15+ modular email templates with 95%+ cross-client rendering compatibility.",
    description:
      "Built a library of modular, responsive email templates with rigorous cross-client testing. Templates render reliably across Outlook (the hardest client), Gmail, Apple Mail, and major mobile clients — powering multi-region outbound marketing campaigns.",
    stack: ["HTML5", "MJML", "Cross-client testing"],
    metrics: [
      { label: "Templates", value: "15+" },
      { label: "Render compat", value: "95%+" },
    ],
    highlight: "Email engineering",
  },
  {
    id: "freelance-ai-sites",
    title: "AI-Integrated Next.js Websites (Freelance)",
    year: "2025",
    category: "Freelance · Next.js + AI",
    summary: "Production Next.js sites with LLM workflows, SEO-first architecture, and full lifecycle ownership.",
    description:
      "Independent client work: design and ship Next.js websites for SMB clients with focus on SEO, Core Web Vitals, and AI-powered features. Integrations include LLM content workflows, automation, and lead-qualification logic using OpenAI and Anthropic APIs. End-to-end ownership from requirements to hosting on Vercel.",
    stack: ["Next.js", "TypeScript", "Tailwind", "OpenAI API", "Anthropic API", "Vercel"],
    metrics: [
      { label: "Stack ownership", value: "End-to-end" },
      { label: "Focus", value: "SEO + Core Web Vitals" },
    ],
    highlight: "Freelance",
  },
];

export type SkillGroup = {
  category: string;
  items: { name: string; level?: "expert" | "advanced" | "proficient" | "familiar" }[];
};

export const skills: SkillGroup[] = [
  {
    category: "Core Stack",
    items: [
      { name: "React", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript (ES2022)", level: "expert" },
      { name: "Next.js", level: "advanced" },
      { name: "HTML5 / CSS3", level: "expert" },
    ],
  },
  {
    category: "State & Data",
    items: [
      { name: "Redux", level: "advanced" },
      { name: "Context API", level: "expert" },
      { name: "React Hooks", level: "expert" },
      { name: "REST APIs", level: "expert" },
    ],
  },
  {
    category: "Styling & Design Systems",
    items: [
      { name: "Tailwind CSS", level: "advanced" },
      { name: "SCSS", level: "advanced" },
      { name: "Styled-Components", level: "advanced" },
      { name: "Material-UI", level: "advanced" },
      { name: "Storybook", level: "advanced" },
      { name: "Lit / Web Components", level: "advanced" },
    ],
  },
  {
    category: "Testing & Tooling",
    items: [
      { name: "Jest", level: "advanced" },
      { name: "React Testing Library", level: "advanced" },
      { name: "Webpack", level: "advanced" },
      { name: "Vite", level: "proficient" },
      { name: "Git / GitHub", level: "expert" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "GitHub Actions", level: "advanced" },
      { name: "Azure DevOps", level: "advanced" },
      { name: "AWS", level: "proficient" },
      { name: "Vercel", level: "advanced" },
      { name: "CI/CD pipelines", level: "advanced" },
    ],
  },
  {
    category: "Practices",
    items: [
      { name: "Accessibility (WCAG 2.1)", level: "advanced" },
      { name: "Core Web Vitals", level: "advanced" },
      { name: "Agile / Scrum", level: "expert" },
      { name: "Figma handoff", level: "advanced" },
      { name: "Code review", level: "expert" },
    ],
  },
];

export const languages = [
  { name: "Italian", level: "Native" },
  { name: "French", level: "Native" },
  { name: "English", level: "Professional (IELTS B2)" },
  { name: "Arabic", level: "Elementary" },
  { name: "Spanish", level: "Elementary" },
];

export const experience = [
  {
    role: "Frontend Developer (Custom Software Engineer)",
    company: "Accenture",
    location: "Rome, Italy",
    period: "Jul 2023 — Present",
    bullets: [
      "Build React + TypeScript apps for tier-1 European enterprise clients (financial services, telecom)",
      "Lead component library work using Lit + Web Components + Storybook, adopted by 4+ teams",
      "Drive performance: ~30% bundle reduction, ~25% LCP improvement on 4G",
      "Maintain CI/CD on GitHub Actions + Azure DevOps for 5+ microfrontends",
    ],
  },
  {
    role: "Freelance Frontend Developer",
    company: "Independent",
    location: "Remote",
    period: "Jan 2025 — Present (alongside Accenture)",
    bullets: [
      "Design and ship React + Next.js websites for SMB clients",
      "Integrate LLM workflows + automation using OpenAI + Anthropic APIs",
      "Full ownership: requirements → implementation → hosting (Vercel/AWS) → iteration",
    ],
  },
  {
    role: "Full-Stack Developer (Intensive Bootcamp)",
    company: "Boolean Career",
    location: "Rome, Italy",
    period: "Feb — Jul 2023",
    bullets: [
      "6-month full-stack bootcamp: React, Vue.js, Node.js, Laravel",
      "Capstone: e-commerce platform with real-time inventory",
      "Top performer across all technical assessments",
    ],
  },
];

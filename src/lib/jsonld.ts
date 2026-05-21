import { experience, languages, profile, skills } from "./data";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://karimnucci.dev";

export function buildPersonJsonLd() {
  const currentJob = experience[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: SITE_URL,
    sameAs: [profile.socials.linkedin, profile.socials.github],
    knowsAbout: skills.flatMap((group) => group.items.map((item) => item.name)),
    knowsLanguage: languages.map((language) => language.name),
    worksFor: currentJob
      ? { "@type": "Organization", name: currentJob.company }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rome",
      addressCountry: "IT",
    },
  };
}

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { FADE_UP_DEFAULT, STAGGER_CONTAINER } from "@/lib/animations";

const Hero3D = dynamic(() => import("./hero-3d").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-5 pt-20"
    >
      <Hero3D />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-[var(--color-bg)]/40 to-[var(--color-bg)]" />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl"
      >
        <motion.p
          variants={FADE_UP_DEFAULT}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/70 px-3 py-1 text-xs text-[var(--color-fg-muted)] backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Available for opportunities · Relocating to Dubai Q3 2026
        </motion.p>

        <motion.h1
          variants={FADE_UP_DEFAULT}
          className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={FADE_UP_DEFAULT}
          className="mt-4 text-balance text-xl text-[var(--color-fg-muted)] sm:text-2xl"
        >
          {profile.title} · React + TypeScript
        </motion.p>

        <motion.p
          variants={FADE_UP_DEFAULT}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg"
        >
          {profile.tagline} 3+ years at Accenture, freelance Next.js + AI on the side. Currently in {" "}
          <span className="text-[var(--color-fg)]">Rome</span>, headed to{" "}
          <span className="text-[var(--color-fg)]">Dubai</span>.
        </motion.p>

        <motion.div variants={FADE_UP_DEFAULT} className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition hover:scale-[1.02] active:scale-95"
          >
            <Mail size={16} />
            Get in touch
          </Link>
          <Link
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-5 py-2.5 text-sm font-medium transition hover:bg-[var(--color-bg)]"
          >
            <Download size={16} />
            Download CV
          </Link>
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition hover:bg-[var(--color-bg)]"
          >
            <Github size={16} />
          </Link>
          <Link
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition hover:bg-[var(--color-bg)]"
          >
            <Linkedin size={16} />
          </Link>
        </motion.div>

        <motion.div
          variants={FADE_UP_DEFAULT}
          className="mt-16 flex items-center gap-2 text-xs text-[var(--color-fg-muted)]"
        >
          <ArrowDown size={14} className="animate-bounce" />
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_85%,transparent)] backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="#top" className="group flex items-center gap-2 text-sm font-medium tracking-tight">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--color-fg)] text-[10px] font-bold text-[var(--color-bg)]">
            KN
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-[var(--color-fg-muted)] transition hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-fg)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs text-[var(--color-fg-muted)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline md:inline"
          >
            GitHub ↗
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}

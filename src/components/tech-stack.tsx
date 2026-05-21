"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

const levelDots = {
  expert: 4,
  advanced: 3,
  proficient: 2,
  familiar: 1,
} as const;

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-3"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
            Stack
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            What I reach for, and how often.
          </h2>
          <p className="max-w-xl text-[var(--color-fg-muted)]">
            React + TypeScript first. Everything else in service of shipping fast, scalable, accessible interfaces.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                {group.category}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span>{item.name}</span>
                    <span className="flex gap-0.5" aria-label={item.level ?? ""}>
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "h-1.5 w-1.5 rounded-full transition",
                            idx < (item.level ? levelDots[item.level] : 0)
                              ? "bg-[var(--color-accent)]"
                              : "bg-[var(--color-border)]",
                          )}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-muted)]"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="flex gap-0.5">
              {[1, 2, 3, 4].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              ))}
            </span>
            Expert
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex gap-0.5">
              {[1, 2, 3].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              ))}
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
            </span>
            Advanced
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex gap-0.5">
              {[1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              ))}
              {[1, 2].map((d) => (
                <span key={`b${d}`} className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
              ))}
            </span>
            Proficient
          </span>
        </motion.div>
      </div>
    </section>
  );
}

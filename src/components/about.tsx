"use client";

import { motion } from "motion/react";
import { profile, experience, languages } from "@/lib/data";
import { STAGGER_INDEXED } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20"
        >
          <div className="space-y-6">
            <motion.p custom={0} variants={STAGGER_INDEXED} className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              About
            </motion.p>
            <motion.h2 custom={1} variants={STAGGER_INDEXED} className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Frontend engineering, the boring-on-purpose way.
            </motion.h2>
            <motion.div custom={2} variants={STAGGER_INDEXED} className="grid grid-cols-2 gap-3 pt-2 text-sm">
              <Stat label="Years React" value="3+" />
              <Stat label="At Accenture" value="Jul 2023" />
              <Stat label="Languages" value="5" />
              <Stat label="Notice period" value="30 days" />
            </motion.div>
          </div>

          <div className="space-y-12">
            <div className="space-y-5">
              {profile.longBio.map((para, i) => (
                <motion.p
                  key={i}
                  custom={i + 3}
                  variants={STAGGER_INDEXED}
                  className="text-balance text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div custom={6} variants={STAGGER_INDEXED} className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                Experience
              </h3>
              <ul className="space-y-5">
                {experience.map((job) => (
                  <li
                    key={`${job.company}-${job.period}`}
                    className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition hover:border-[var(--color-accent)]/50"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-medium">{job.role}</p>
                        <p className="text-sm text-[var(--color-fg-muted)]">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <p className="text-xs text-[var(--color-fg-muted)]">{job.period}</p>
                    </div>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-[var(--color-fg-muted)] marker:text-[var(--color-accent)]">
                      {job.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div custom={7} variants={STAGGER_INDEXED} className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                Languages
              </h3>
              <ul className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-[var(--color-fg-muted)]"> · {lang.level}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3">
      <p className="text-xl font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-[var(--color-fg-muted)]">{label}</p>
    </div>
  );
}

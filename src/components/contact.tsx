"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 sm:p-12"
        >
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
                Contact
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Let's build something good together.
              </h2>
              <p className="text-[var(--color-fg-muted)]">
                Available for mid-level Frontend Engineer roles in Dubai (Q3 2026), and selected freelance React / Next.js projects.
              </p>
              <ul className="space-y-3 pt-2 text-sm">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)]">
                    <MapPin size={14} className="text-[var(--color-fg-muted)]" />
                  </span>
                  {profile.location}
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)]">
                    <Mail size={14} className="text-[var(--color-fg-muted)]" />
                  </span>
                  <Link
                    href={`mailto:${profile.email}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {profile.email}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)]">
                    <Phone size={14} className="text-[var(--color-fg-muted)]" />
                  </span>
                  {profile.phone}
                </li>
              </ul>

              <div className="flex items-center gap-2 pt-2">
                <Link
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] transition hover:bg-[var(--color-bg)]"
                >
                  <Github size={16} />
                </Link>
                <Link
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] transition hover:bg-[var(--color-bg)]"
                >
                  <Linkedin size={16} />
                </Link>
              </div>
            </div>

            <ContactForm />
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-[var(--color-fg-muted)]">
          Built with Next.js · TypeScript · Tailwind · Motion · React Three Fiber · Anthropic API
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <form
      action={`mailto:${profile.email}`}
      method="post"
      encType="text/plain"
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Subject" name="subject" required />
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-accent)]"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--color-fg)] py-3 text-sm font-medium text-[var(--color-bg)] transition hover:scale-[1.01] active:scale-95"
      >
        Send message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-accent)]"
      />
    </div>
  );
}

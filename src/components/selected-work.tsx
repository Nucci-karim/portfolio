"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SECTION_REVEAL, SMOOTH_EASE } from "@/lib/animations";

const SPAN_CLASSES = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
] as const;

export function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const lastOpenerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = useCallback((project: Project, opener: HTMLButtonElement) => {
    lastOpenerRef.current = opener;
    setSelected(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    lastOpenerRef.current?.focus();
  }, []);

  return (
    <section id="work" className="relative scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={SECTION_REVEAL}
          className="mb-12 flex items-end justify-between gap-6"
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              Selected work
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Things I've built that I'm proud of.
            </h2>
          </div>
          <p className="hidden text-sm text-[var(--color-fg-muted)] md:block">
            {projects.length} projects
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project, opener: HTMLButtonElement) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 150,
    damping: 18,
  });

  const onMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMotion = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => ref.current && onOpen(project, ref.current)}
      onMouseMove={onMouseMove}
      onMouseLeave={resetMotion}
      onBlur={resetMotion}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      aria-label={`Open case study for ${project.title}`}
      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-left transition-colors hover:border-[var(--color-accent)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${SPAN_CLASSES[index] ?? "lg:col-span-2"}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--color-accent)]/8 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-[var(--color-fg-muted)]">
              {project.year} · {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            size={20}
            aria-hidden
            className="shrink-0 text-[var(--color-fg-muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-[var(--color-fg-muted)]">{project.summary}</p>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-[var(--color-border)] px-2 py-0.5 text-[11px] text-[var(--color-fg-muted)]"
              >
                {tech}
              </li>
            ))}
            {project.stack.length > 5 && (
              <li className="rounded-md border border-[var(--color-border)] px-2 py-0.5 text-[11px] text-[var(--color-fg-muted)]">
                +{project.stack.length - 5}
              </li>
            )}
          </ul>
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.28, ease: SMOOTH_EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)] transition hover:bg-[var(--color-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <X size={14} aria-hidden />
        </button>

        <p className="text-xs text-[var(--color-fg-muted)]">
          {project.year} · {project.category}
        </p>
        <h3 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-4 text-[var(--color-fg-muted)]">{project.description}</p>

        {project.metrics && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-[var(--color-border)] p-3"
              >
                <p className="text-lg font-semibold tracking-tight">{metric.value}</p>
                <p className="text-[11px] text-[var(--color-fg-muted)]">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
            Stack
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-[var(--color-border)] px-2 py-1 text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

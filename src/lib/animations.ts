import type { Variants } from "motion/react";

export const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export const FADE_UP_DEFAULT: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SMOOTH_EASE } },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export const SECTION_REVEAL: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SMOOTH_EASE } },
};

export const STAGGER_INDEXED: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: SMOOTH_EASE, delay: i * 0.06 },
  }),
};

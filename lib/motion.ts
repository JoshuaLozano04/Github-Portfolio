import type { Variants } from 'framer-motion';

export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const pageFadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: premiumEase
    }
  }
};

export const shellHeaderReveal: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: premiumEase
    }
  }
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: premiumEase
    }
  }
};

export const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04
    }
  }
};

export const itemReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: premiumEase
    }
  }
};

export const navUnderline: Variants = {
  rest: { scaleX: 0, opacity: 0 },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: premiumEase
    }
  }
};

export const viewportOnce = {
  once: true,
  amount: 0.22
} as const;
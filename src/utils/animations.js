/* =============================================
   FRAMER MOTION CINEMATIC ANIMATION PRESETS
   for Gurezma Studio — Motion & Design
   ============================================= */

// Custom easing curves
export const EASE_EXPO  = [0.16, 1, 0.3, 1];    // ease-out-expo: premium cinematic snap
export const EASE_BACK  = [0.34, 1.56, 0.64, 1]; // slight elastic overshoot
export const EASE_CIRC  = [0, 0.55, 0.45, 1];   // ease-out-circ: fast & clean

// ── Fade Up (universal section reveal)
export const fadeUp = {
  hidden:  { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: EASE_EXPO }
  }
};

// ── Fade Left (section labels, side elements)
export const fadeLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.85, ease: EASE_EXPO }
  }
};

// ── Fade Right (portrait, form)
export const fadeRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.85, ease: EASE_EXPO }
  }
};

// ── Scale In (cards, badges)
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: EASE_EXPO }
  }
};

// ── Character Stagger (hero title — per letter)
export const heroChar = {
  hidden:  { opacity: 0, y: 80, rotateX: -50 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.65, ease: EASE_EXPO }
  }
};

// ── Stagger container factory
export const stagger = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } }
});

// ── Card stagger (portfolio grid, service cards)
export const cardStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// ── Process step (slide + fade)
export const processStep = {
  hidden:  { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: EASE_EXPO }
  }
};

// ── Skill bar fill
export const skillFill = (pct) => ({
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: pct / 100,
    originX: 0,
    transition: { duration: 1.2, ease: EASE_EXPO, delay: 0.2 }
  }
});

// ── Line draw (SVG path)
export const lineDraw = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1, opacity: 1,
    transition: { pathLength: { duration: 1.5, ease: EASE_CIRC }, opacity: { duration: 0.3 } }
  }
};

// ── Viewport trigger config
export const VIEWPORT = { once: true, margin: '-80px 0px' };

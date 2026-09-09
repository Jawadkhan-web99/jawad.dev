/**
 * ============================================================
 * SUBTLE CURSOR GLOW TRAIL — cursor-trail.js
 * ============================================================
 *
 * Design philosophy:
 *   One soft glowing orb that follows the cursor with a gentle
 *   delay, plus a very faint secondary echo. Nothing more.
 *   Blue → purple tones only. Low opacity throughout.
 *   Looks premium on a dark portfolio, invisible on light.
 *
 * Architecture:
 *   - 1 main glow orb  (large, very low opacity)
 *   - 1 small dot core (tiny, slightly brighter)
 *   - requestAnimationFrame lerp loop (GPU-composited)
 *   - No DOM flood — only 2 elements added to body
 *   - Auto-disabled: touch devices, reduced-motion preference
 *   - Zero interference: pointer-events none on all elements
 * ============================================================
 */

'use strict';

(function CursorGlow() {

  /* ──────────────────────────────────────────────────────────
     1. FEATURE GUARDS — exit silently if not applicable
     ────────────────────────────────────────────────────────── */

  // No touch / coarse-pointer devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Respect user's reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ──────────────────────────────────────────────────────────
     2. CONFIGURATION — tweak here only
     ────────────────────────────────────────────────────────── */
  const CFG = {
    // Glow orb (large soft halo)
    ORB_SIZE      : 28,          // px diameter
    ORB_COLOR     : '108, 99, 255',   // RGB — brand purple #6c63ff
    ORB_OPACITY   : 0.13,        // very subtle — present but not distracting
    ORB_BLUR      : 14,          // px — box-shadow outer blur
    ORB_LERP      : 0.10,        // chase speed — lower = more trailing delay

    // Dot core (small, precise center)
    DOT_SIZE      : 5,           // px diameter
    DOT_COLOR     : '139, 92, 246',   // RGB — softer violet #8b5cf6
    DOT_OPACITY   : 0.55,        // slightly more visible than orb
    DOT_BLUR      : 4,           // px
    DOT_LERP      : 0.20,        // slightly faster than orb

    // Behaviour
    IDLE_MS       : 800,         // ms of no movement before fade starts
    FADE_OUT_MS   : 600,         // transition duration on fade-out
    FADE_IN_MS    : 200,         // transition duration on fade-in
    Z_INDEX       : 9999,
  };

  /* ──────────────────────────────────────────────────────────
     3. INJECT STYLES
     ────────────────────────────────────────────────────────── */
  const css = document.createElement('style');
  css.id = 'cursor-glow-styles';
  css.textContent = `
    .cg-orb,
    .cg-dot {
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 50%;
      pointer-events: none;
      user-select: none;
      will-change: transform, opacity;
      z-index: ${CFG.Z_INDEX};
      opacity: 0;
    }
    .cg-orb {
      width:  ${CFG.ORB_SIZE}px;
      height: ${CFG.ORB_SIZE}px;
      background: radial-gradient(
        circle,
        rgba(${CFG.ORB_COLOR}, ${CFG.ORB_OPACITY}) 0%,
        rgba(${CFG.ORB_COLOR}, 0) 70%
      );
      filter: blur(${CFG.ORB_BLUR}px);
    }
    .cg-dot {
      width:  ${CFG.DOT_SIZE}px;
      height: ${CFG.DOT_SIZE}px;
      background: rgba(${CFG.DOT_COLOR}, ${CFG.DOT_OPACITY});
      box-shadow:
        0 0 ${CFG.DOT_BLUR}px     1px rgba(${CFG.DOT_COLOR}, 0.45),
        0 0 ${CFG.DOT_BLUR * 2}px 2px rgba(${CFG.ORB_COLOR}, 0.20);
    }
  `;
  document.head.appendChild(css);

  /* ──────────────────────────────────────────────────────────
     4. CREATE ELEMENTS
     ────────────────────────────────────────────────────────── */
  const orb = document.createElement('div');
  orb.className = 'cg-orb';
  orb.setAttribute('aria-hidden', 'true');

  const dot = document.createElement('div');
  dot.className = 'cg-dot';
  dot.setAttribute('aria-hidden', 'true');

  // Append after body content so they paint above everything
  document.body.appendChild(orb);
  document.body.appendChild(dot);

  /* ──────────────────────────────────────────────────────────
     5. TRACKING STATE
     ────────────────────────────────────────────────────────── */
  let mouseX = -200, mouseY = -200;   // real cursor position
  let orbX   = -200, orbY   = -200;   // interpolated orb position
  let dotX   = -200, dotY   = -200;   // interpolated dot position
  let rafId  = null;
  let idle   = true;
  let idleTimer = null;
  let visible   = false;

  /* ──────────────────────────────────────────────────────────
     6. MOUSE TRACKING
     ────────────────────────────────────────────────────────── */
  document.addEventListener('mousemove', onMove, { passive: true });

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Reveal on first movement or return from idle
    if (idle) {
      idle = false;
      revealElements();
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    // Reset the idle countdown
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startIdle, CFG.IDLE_MS);
  }

  /* ──────────────────────────────────────────────────────────
     7. ANIMATION LOOP
     ────────────────────────────────────────────────────────── */
  function tick() {
    // Orb: slower chase — bigger trailing delay
    orbX = lerp(orbX, mouseX, CFG.ORB_LERP);
    orbY = lerp(orbY, mouseY, CFG.ORB_LERP);

    // Dot: faster chase — stays close to cursor
    dotX = lerp(dotX, mouseX, CFG.DOT_LERP);
    dotY = lerp(dotY, mouseY, CFG.DOT_LERP);

    // Center both elements on their interpolated position
    orb.style.transform = `translate(${orbX - CFG.ORB_SIZE / 2}px, ${orbY - CFG.ORB_SIZE / 2}px)`;
    dot.style.transform = `translate(${dotX - CFG.DOT_SIZE / 2}px, ${dotY - CFG.DOT_SIZE / 2}px)`;

    rafId = requestAnimationFrame(tick);
  }

  /* ──────────────────────────────────────────────────────────
     8. VISIBILITY TRANSITIONS
     ────────────────────────────────────────────────────────── */
  function revealElements() {
    if (visible) return;
    visible = true;

    const t = `transition: opacity ${CFG.FADE_IN_MS}ms ease`;
    orb.style.cssText += `; ${t}`;
    dot.style.cssText += `; ${t}`;

    // Small delay so the element is positioned before it fades in
    requestAnimationFrame(() => {
      orb.style.opacity = '1';
      dot.style.opacity = '1';
    });
  }

  function hideElements() {
    visible = false;

    const t = `transition: opacity ${CFG.FADE_OUT_MS}ms ease`;
    orb.style.cssText += `; ${t}`;
    dot.style.cssText += `; ${t}`;

    orb.style.opacity = '0';
    dot.style.opacity = '0';

    // Stop the RAF loop once hidden — saves CPU
    const stopAfter = CFG.FADE_OUT_MS + 50;
    setTimeout(() => {
      if (!visible && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, stopAfter);
  }

  /* ──────────────────────────────────────────────────────────
     9. IDLE & LEAVE HANDLING
     ────────────────────────────────────────────────────────── */
  function startIdle() {
    idle = true;
    hideElements();
  }

  // Cursor leaves browser window
  document.addEventListener('mouseleave', () => {
    clearTimeout(idleTimer);
    startIdle();
  }, { passive: true });

  // Cursor returns — RAF restarts naturally on next mousemove
  document.addEventListener('mouseenter', onMove, { passive: true });

  /* ──────────────────────────────────────────────────────────
     10. UTILITY
     ────────────────────────────────────────────────────────── */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

})();

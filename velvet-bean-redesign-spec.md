# Velvet Bean Coffee — Redesign Spec
### Reference: Awwwards-style editorial site (dark, scroll-driven, oversized type)

This spec translates the reference video's design language into concrete, buildable
direction for Velvet Bean Coffee. Hand this to Claude Code alongside the repo so it
has fixed values to build against instead of interpreting from scratch.

---

## 1. Brand Direction

Keep the reference's *structure and motion*, swap its palette for a warm,
premium coffee identity. Nothing about coffee should feel cold or clinical.

**Palette**
- Background (primary): `#1A120B` — near-black espresso brown, not pure black
- Background (secondary/section): `#241811` — slightly lifted panel tone
- Text (primary): `#F5EDE4` — warm cream, not pure white
- Text (muted): `#B8A794` — soft taupe for secondary copy/labels
- Accent (hero): `#C97C4F` — burnt caramel/terracotta (use like the reference's coral burst — sparingly, for CTAs, active states, the one "pop" element)
- Accent (secondary): `#E8C9A0` — pale latte, for hover highlights and dividers
- Success/functional states can stay neutral — don't introduce a new hue for these

**Typography**
- Display/headline font: a high-contrast serif with personality (e.g. "Fraunces," "Canela," or "Playfair Display" if licensing/self-hosting a paid font isn't in scope) — this carries the "Limitless begins here" feeling
- Body/UI font: a clean grotesk (e.g. "Inter," "General Sans," "Neue Montreal") for nav, labels, body copy
- Scale (desktop): Hero display 96–140px / Section headline 48–64px / Subhead 20–24px / Body 16–18px / Label/eyebrow 11–13px, uppercase, letter-spaced (+0.08em)
- Scale (mobile): Hero display 40–56px / Section headline 28–36px / Body 16px
- Line-height: tight on display (0.95–1.05), relaxed on body (1.5–1.6)
- Weight contrast matters more than size variety — pair a heavy display weight with a light body weight

**Spacing**
- Base unit: 8px grid
- Section vertical padding: 120–180px desktop, 64–80px mobile
- Generous negative space is a feature, not empty space to fill — resist the urge to add filler content

---

## 2. Motion System

This is the core of what makes the reference feel premium. Build this as a shared
system, not one-off animations per section.

**Libraries**
- **Lenis** for smooth-scroll (wrap the whole app)
- **GSAP + ScrollTrigger** for scroll-driven reveals, pinning, and parallax
- **Framer Motion** for micro-interactions (hover states, page/route transitions, magnetic buttons) — fine to use both; GSAP for scroll choreography, Framer for discrete component interactions

**Core motion patterns to implement**
1. **Staggered reveal on scroll** — text/elements enter with 60–100ms stagger between siblings, translateY(24–40px) → 0, opacity 0 → 1, ease `power3.out`, duration 0.8–1.1s. Trigger at ~75% viewport entry, not the very edge.
2. **Parallax image panels** — hero/product images scroll at 0.85–0.9x page speed (subtle, not gimmicky). Use `scrub: true` on ScrollTrigger so it tracks scroll position exactly, no lag.
3. **Section pinning (selective)** — reserve for 1–2 key moments (e.g. a "how it's roasted" or product-reveal section), not every section. Overuse kills the effect.
4. **Magnetic buttons** — CTA buttons shift slightly toward cursor within a bounded radius (~15px max offset), spring back on leave. Framer Motion's `useMotionValue` + spring is ideal.
5. **Nav behavior** — nav background stays transparent over hero, gains a subtle blurred/tinted background (`backdrop-filter: blur(12px)` + translucent brown) once scrolled past hero height. Smooth 300ms transition, not a hard toggle.
6. **Page load** — brief, tasteful intro (logo mark settles / hero text staggers in) capped at ~1.2s total. Never block interaction longer than that, and always respect `prefers-reduced-motion`.
7. **Cursor-aware hover on cards/links** — subtle scale (1.02–1.04) + shadow lift, 200–250ms ease-out. No rotation gimmicks unless a specific element calls for it.

**Reduced motion**
- Every animation must have a static fallback via `@media (prefers-reduced-motion: reduce)` — cross-fade only, no translate/parallax/pin.

---

## 3. Layout Direction (per section — adapt to actual existing pages/content)

- **Hero:** Full-viewport, asymmetric — large display headline left/top-weighted, product shot bleeding off one edge rather than centered. Small eyebrow label above headline (e.g. "SMALL BATCH · ROASTED WEEKLY"). Scroll-cue at bottom (thin line or arrow, subtle bounce loop).
- **Story/About:** Two-column asymmetric grid — sticky text panel on one side while images scroll past on the other (classic scroll-driven editorial pattern from the reference).
- **Product showcase:** Large-format product photography, one product "hero" per scroll section rather than a dense grid — grid views reserved for a dedicated shop/menu page.
- **Process/Origin (roast, sourcing, brewing):** This is your equivalent of the reference's "ingredient/benefit" deep-dive sections — use icon + short-copy pairs in a clean row, revealed with stagger.
- **Footer:** Keep it minimal — logo, 3–4 link columns max, social icons, no clutter.

---

## 4. Technical Notes for Claude Code

- Audit the existing stack first (framework, styling approach, build tool) before adding libraries — match idioms already in use where reasonable.
- Install: `gsap`, `@studio-freight/lenis` (or `lenis`), `framer-motion` (only if not already present).
- Componentize motion (e.g. a `<Reveal>` wrapper component for the stagger pattern) rather than duplicating ScrollTrigger setup per section.
- Preserve all existing routes, forms, cart/checkout functionality, and content — this is a UI/UX and motion layer redesign, not a content or feature rewrite.
- Performance: lazy-load below-fold images, use `will-change` sparingly (only on actively animating elements), test Lighthouse before/after.
- Accessibility: maintain focus states, semantic headings, alt text, keyboard nav through all interactive elements (magnetic buttons must still be keyboard-operable), and the reduced-motion fallback above.
- Test responsive breakpoints at 375px, 768px, 1024px, 1440px — the reference is a desktop demo, so mobile needs its own simplified motion pass (lighter parallax, no pinning).

---

## 5. Definition of Done

- [ ] Palette and type scale applied consistently across all pages
- [ ] Lenis smooth-scroll active site-wide
- [ ] At least hero + 2 content sections have staggered scroll reveals
- [ ] At least one parallax image treatment implemented
- [ ] Nav transitions on scroll
- [ ] All CTAs have magnetic/hover motion
- [ ] Reduced-motion fallback verified
- [ ] All existing functionality (nav, forms, links, cart if present) still works
- [ ] Responsive pass complete at all four breakpoints
- [ ] Lighthouse performance/accessibility scores checked and acceptable

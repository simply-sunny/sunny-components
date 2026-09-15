---
name: Sunny Components
description: A precise, source-first component system built from near-black surfaces, an icy-blue signal, and a quiet construction grid.
colors:
  dark-background: "#080a0d"
  dark-surface: "#101318"
  dark-surface-raised: "#151920"
  dark-surface-strong: "#222832"
  dark-text: "#f3f6fa"
  dark-text-muted: "#9ba5b2"
  dark-border: "#282f3a"
  dark-border-strong: "#4a5563"
  icy-blue: "#b8d8ff"
  icy-blue-strong: "#c9e2ff"
  icy-blue-soft: "#13243a"
  icy-blue-border: "#31577e"
  icy-blue-ink: "#07101a"
  dark-focus: "rgba(184, 216, 255, 0.22)"
  dark-danger: "#c94f5d"
  dark-danger-text: "#ff9da8"
  dark-success-text: "#7ddbb3"
  dark-warning-text: "#eccb77"
  dark-code: "#080b10"
  dark-code-text: "#d9e7f7"
  light-background: "#f6f8fb"
  light-surface: "#ffffff"
  light-surface-raised: "#eef3f8"
  light-surface-strong: "#dfe7f0"
  light-text: "#101820"
  light-text-muted: "#586574"
  light-border: "#d6dee8"
  light-border-strong: "#8492a3"
  light-icy-blue: "#87bfff"
  light-icy-blue-strong: "#1769b0"
  light-icy-blue-soft: "#e4f1ff"
  light-icy-blue-border: "#9ec7ec"
  light-focus: "rgba(23, 105, 176, 0.2)"
  light-danger: "#b92f40"
  light-danger-text: "#a12635"
  light-success-text: "#15744e"
  light-warning-text: "#865c00"
  light-code: "#101820"
  light-code-text: "#eaf3ff"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(4rem, 6.7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  control-sm: "5px"
  compact: "7px"
  control: "10px"
  content: "12px"
  card: "14px"
  overlay: "16px"
  pill: "999px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "48px"
  section: "56px"
  page: "96px"
components:
  button-primary:
    backgroundColor: "{colors.icy-blue}"
    textColor: "{colors.icy-blue-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.dark-surface-raised}"
    textColor: "{colors.dark-text}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  badge-accent:
    backgroundColor: "{colors.icy-blue-soft}"
    textColor: "{colors.icy-blue-strong}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
    height: "24px"
  card:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.card}"
    padding: "20px"
  dialog:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.overlay}"
    padding: "24px"
    width: "min(480px, calc(100% - 32px))"
---

# Design System: Sunny Components

## Overview

**Creative North Star: "The Technical Sunrise"**

Sunny Components is a quiet, exacting documentation system: a near-black technical canvas interrupted only by icy-blue signals and the linework of a half-sun. The visual world feels engineered rather than decorated. A construction grid, fine borders, controlled radii, and disciplined type establish the brand before any flourish could.

The gallery is a reading and evaluation environment, not a marketing stage. Live examples lead, code remains legible, and the responsive shell protects the same information hierarchy from desktop through compact screens. Dark mode is the fullest expression; light mode is a semantic translation of the same system rather than a separate identity.

**Key Characteristics:**

- Dark-first, flat semantic surfaces with a complete soft-white counterpart.
- Icy blue used as a scarce interaction signal, never ambient decoration.
- DM Sans for hierarchy and IBM Plex Mono for code, measurements, and technical labels.
- Persistent catalog on desktop, focused drawer navigation on compact screens.
- Half-sun linework and a subtle construction grid as the recurring Sunny signatures.
- Accessibility and responsive behavior treated as component contracts.

## Colors

The palette is a cool, restrained field of ink-like neutrals with icy blue reserved for orientation and response; status colors communicate meaning without competing for brand ownership.

### Primary

- **Icy Blue:** The main active signal for primary actions, selection, checked states, and progress.
- **Icy Blue Strong:** Higher-contrast treatment for links, focus outlines, and small interactive marks.
- **Icy Blue Soft:** Tonal backing for accent badges and selected surfaces.
- **Icy Blue Ink:** Dark foreground placed on filled icy-blue controls.

### Secondary

- **Danger Red:** Destructive actions and invalid control borders only.
- **Success Mint:** Positive semantic text and borders.
- **Warning Gold:** Cautionary semantic text.

### Neutral

- **Night Ground:** The dark-mode page field and construction-grid substrate.
- **Carbon Surface:** Default component and panel enclosure.
- **Graphite Layers:** Raised or selected tonal layers without default shadows.
- **Soft White:** Primary dark-mode text and the light-mode component surface.
- **Cool Gray:** Secondary copy, quiet labels, borders, and dividers.

**The Signal, Not Scenery Rule.** Icy blue marks focus, selection, active navigation, links, and small state signals; it does not wash large decorative regions.

**The Semantic Mirror Rule.** Components consume the same semantic roles in both themes; they never branch internally for dark or light mode.

## Typography

**Display Font:** DM Sans (with sans-serif fallback)  
**Body Font:** DM Sans (with sans-serif fallback)  
**Label/Mono Font:** IBM Plex Mono (with monospace fallback)

**Character:** DM Sans keeps the shell familiar and highly legible while its tight display setting gives major headings a confident, editorial edge. IBM Plex Mono is a precise secondary voice for code, category labels, metadata, and measurements—not a decorative texture.

### Hierarchy

- **Display** (700, fluid 4–6rem, 0.82 line height): Home identity and singular, high-impact page titles.
- **Headline** (700, fluid 2.3–4.8rem, 0.95 line height): Section introductions and major documentation headings.
- **Title** (620, 1.08rem): Component names and compact structural headings.
- **Body** (400, 1rem, 1.6 line height): Guidance and explanatory copy; keep reading lines near 65ch when possible.
- **Label** (500, 0.65rem, 0.12em tracking, uppercase): Category markers, measurements, and terse technical metadata.

**The Two-Voice Rule.** Sans carries meaning and hierarchy; mono carries implementation context. Do not set paragraphs or marketing-sized headings in mono.

**The Heading-First Rule.** Headings communicate their own level; do not precede them with decorative eyebrows or ordinal labels.

## Layout

The desktop gallery uses a fixed 248px catalog rail, a 65px global bar, and a reading canvas capped at 1440px. The canvas begins after the rail and uses fluid inline padding from 32px to 96px. Major regions rely on fine dividers and generous vertical space; component previews are wide enough to show real states before source or guidance.

The construction grid is 64px on desktop and 48px below the tablet breakpoint. At 900px the rail becomes a full-screen navigation sheet, content becomes single-column with 20px gutters, category descriptions yield to scanability, and preview padding contracts. Below 520px primary controls preserve a 44px minimum touch target and nonessential top-bar text is removed. Code remains horizontally scrollable instead of compressing syntax.

**The Component-First Rule.** On documentation pages, place the live preview before implementation detail and let source follow evidence.

**The Reflow Rule.** Preserve information and interaction order at narrow sizes; collapse grids and navigation rather than shrinking content into desktop proportions.

## Elevation & Depth

The system is flat by default. Depth comes from tonal surface steps, one-pixel neutral borders, and enclosure; shadows are reserved for elements that genuinely leave the document plane.

### Shadow Vocabulary

- **Floating Sample** (`0 14px 35px rgba(0, 0, 0, 0.32)`): Small illustrative lifted surface in foundation examples.
- **Modal Lift** (`0 18px 60px rgba(0, 0, 0, 0.35)`): Dialogs and blocking overlays only.

**The Earned Elevation Rule.** Resting cards, controls, navigation, and preview canvases stay flat. Only overlays and explicit lift demonstrations cast shadows.

## Shapes

Controls use gently curved 10px corners; content blocks step through 12px and 14px, while true overlays reach 16px. Pills are limited to badges, progress tracks, switches, and other intrinsically capsule-shaped controls. Fine one-pixel borders do most of the structural work. The half-sun identity is a 32px line icon built from a horizon, rising arc, and three rays in the current icy-blue color.

**The Radius Ladder Rule.** Match radius to scale and role: compact details are tighter, content enclosures are calmer, and overlays receive the broadest corners.

**The Honest Pill Rule.** Use full pills only where the control's geometry or state requires a capsule; never pill-wrap arbitrary labels or containers.

## Components

Components are portable source primitives. They accept native props, expose explicit typed variants, forward refs where DOM access is expected, use semantic tokens, and do not depend on gallery-only state.

### Buttons

- **Shape:** Gently curved control corners with a 40px default height; compact, default, and large sizes are explicit variants.
- **Primary:** Icy-blue fill, dark ink text, strong label weight, and 16px horizontal padding.
- **Hover / Focus:** Hover rises by 1px over 180ms; active returns to the plane. The shared visible focus treatment is a 2px icy-blue outline with 3px offset.
- **Secondary / Ghost / Danger:** Secondary uses a bordered tonal surface, ghost removes fill, and danger alone owns the destructive fill. Disabled and loading states suppress movement.

### Chips

- **Style:** Badges use a 24px capsule, 9px horizontal padding, and a fine border.
- **State:** Accent badges combine the soft icy-blue surface with the stronger icy-blue label; success and warning variants remain border-light and semantic.

### Cards / Containers

- **Corner Style:** Calm 14px corners for cards and samples; preview canvases use the 16px enclosure radius.
- **Background:** One semantic surface step above the page ground.
- **Shadow Strategy:** Flat at rest, following the Earned Elevation Rule.
- **Border:** One-pixel semantic divider.
- **Internal Padding:** 20px for cards; 24px for grouped samples.

### Inputs / Fields

- **Style:** 44px minimum height, 10px corners, semantic surface fill, fine border, and a persistent visible label.
- **Focus:** Strong icy-blue border plus a 3px translucent focus halo.
- **Error / Disabled:** Invalid fields shift the border and helper text to danger semantics; descriptions are linked with `aria-describedby`.

### Navigation

Desktop navigation is a persistent grouped catalog with compact 7px-radius rows and monospaced uppercase group labels. Hover uses a tonal surface; current and actionable signals use icy blue. At 900px, the same search and category structure moves into a full-screen sheet with an explicitly labeled close action. Tabs use a simple bottom rule, arrow-key movement, and icy blue only on the selected indicator.

### Half-Sun Mark

The half-sun is the system's signature component: a 32px, two-pixel line drawing with rounded ray and horizon caps. It inherits the current accent color, remains aria-hidden beside a readable wordmark, and may not be redrawn as a filled badge, gradient orb, or decorative illustration.

### Overlays

Dialogs use a maximum width of 480px with a 32px viewport gutter, 16px corners, 24px padding, a dimmed backdrop, and the modal shadow. Radix primitives own focus trapping, Escape handling, accessible naming, and focus return. Tooltips use inverse semantic colors and a compact 7px radius.

### Motion & State

Interactive feedback uses a quiet 180ms duration; button lift uses a restrained emphasized ease. Essential content is visible before motion. Under `prefers-reduced-motion: reduce`, animations and transitions collapse to 0.01ms.

## Do's and Don'ts

### Do:

- **Do** use semantic color tokens so every component moves cleanly between dark and light themes.
- **Do** demonstrate default, hover, focus-visible, disabled, invalid, checked, selected, loading, and expanded states where relevant.
- **Do** preserve semantic markup, accessible names, visible focus, keyboard operation, and 44px compact-screen touch targets.
- **Do** keep live previews, usage, accessibility notes, and source paths in a predictable reading order.
- **Do** let the half-sun, construction grid, typography, proportion, and interaction carry the Sunny identity.

### Don't:

- **Don't** use gradients, glassmorphism, ornamental icon tiles, or decorative page-entry motion.
- **Don't** turn icy blue into a large ambient background or compete with it using another brand accent.
- **Don't** add default shadows to cards, controls, navigation, or preview canvases.
- **Don't** use excessive pill-shaped containers or replace the half-sun with a generic sunburst.
- **Don't** create component-specific theme branches, hide essential content behind motion, or remove focus indicators.

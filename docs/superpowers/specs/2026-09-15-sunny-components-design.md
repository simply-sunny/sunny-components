# Sunny Components Design Specification

## Summary

Sunny Components is a source-first React and TypeScript component library with a public documentation gallery. It translates the visual language of Simply Sunny and Silk-S1 into reusable interface primitives while adopting the clear information architecture of the Supabase Design System and Apple’s principles of hierarchy, familiarity, adaptability, and accessibility.

The first release will live in a new public GitHub repository named `sunny-components` and deploy automatically to GitHub Pages. It will not be published to npm.

## Goals

- Make reusable component source easy to find, evaluate, understand, and copy.
- Preserve a distinctive Sunny visual identity across personal projects.
- Provide production-quality responsive and accessible component behavior.
- Give every component a polished, user-facing demonstration rather than a developer-only fixture.
- Keep the project simple enough for one person to maintain and extend.

## Non-goals

- npm publication, semantic-release automation, or a hosted component registry.
- A complete enterprise design system or exhaustive replacement for established primitive libraries.
- Copying Supabase or Apple branding, assets, or proprietary visual details.
- Backend services, accounts, analytics, or persisted user data.

## Audience and Use

The primary user is Saunak, copying source components into personal React projects. The public documentation must also be clear enough for outside developers to browse and adopt without private context.

The primary flow is:

1. Open the gallery and scan component categories.
2. Search or navigate to a component.
3. Inspect a live example and its states.
4. Review usage, variants, props guidance, and accessibility notes.
5. Copy the source or usage snippet.

## Technical Architecture

Use Vite, React, and TypeScript as a static application. Configure Vite’s base path for `/sunny-components/` so assets and routes resolve on GitHub Pages.

Keep four concerns separate:

- `src/components`: reusable component implementations and component-local styles.
- `src/demos`: gallery-only demonstrations and interactive examples.
- `src/content`: component metadata, usage snippets, props guidance, and accessibility notes.
- `src/gallery`: documentation shell, navigation, search, routing, and preview composition.

Use CSS custom properties for foundations and theming. Components consume semantic tokens rather than raw color values. Use lightweight accessible primitives only for interactions whose focus management or positioning is genuinely complex, such as dialogs and tooltips. Ordinary controls remain plain React and semantic HTML.

Use route-aware client navigation with a GitHub Pages-compatible fallback. Direct links to component pages must recover cleanly instead of showing a repository 404.

## Visual Direction

The approved direction is a polished, familiar component-documentation library. Its structure takes cues from Supabase’s navigable catalog, while its precision, restraint, and responsive clarity follow Apple’s design principles.

The identity remains Sunny:

- Near-black and soft-white surfaces with fine neutral borders.
- A subtle background construction grid inherited from Simply Sunny and Silk-S1.
- An icy blue accent in place of the reference green. The accent is reserved for focus, selection, active navigation, links, and small state signals.
- Clean sans-serif display and interface typography paired with a restrained monospaced face for code and technical labels.
- Spacious reading layouts, compact controls, and clear hierarchy.
- Quiet transitions that communicate state without decorative motion.
- No gradients, glassmorphism, oversized marketing hero, decorative icon tiles, or excessive pill-shaped containers.

The default dark theme carries the strongest brand expression. The light theme preserves the same hierarchy and construction-grid logic rather than becoming a separate aesthetic.

## Gallery Structure

### Global shell

- A compact top bar containing the Sunny Components identity, global search, theme control, and GitHub link.
- A persistent desktop sidebar grouped by Foundations, Actions, Inputs, Display, Feedback, Navigation, and Overlays.
- A mobile navigation drawer that preserves search and category structure.
- A content column sized for comfortable reading and wide enough for component previews.
- Optional on-page anchors for longer component documentation.

### Home page

The first viewport identifies the project as a React source library and immediately shows representative components. A concise introduction leads into category cards and a small composed example, proving the system through working UI rather than marketing claims.

### Component page

Each component page contains:

1. Name, purpose, and maturity label.
2. A large live preview with representative content.
3. Variants and interaction states.
4. Copyable React usage.
5. Concise props guidance.
6. Accessibility and keyboard behavior.
7. Source-file path and a GitHub link.

Preview regions use a consistent frame but allow component-specific composition. Code blocks provide explicit copy feedback and readable overflow on narrow screens.

## Initial Components

### Foundations

- Color
- Typography
- Spacing
- Radius
- Borders and shadows
- Motion

### Actions

- Button
- Icon Button
- Link

### Inputs

- Input
- Textarea
- Checkbox
- Switch

### Display

- Badge
- Card
- Metric Card
- Code Block

### Feedback

- Alert
- Progress
- Skeleton

### Navigation

- Tabs
- Breadcrumbs
- Top Navigation

### Overlays

- Dialog
- Tooltip

## Component Contract

Each reusable component must:

- Accept a `className` escape hatch and forward compatible native props.
- Forward refs where consumers reasonably need DOM access.
- Expose variants through explicit typed props.
- Work in both themes without component-specific theme branching.
- Preserve visible focus, keyboard operation, and semantic roles.
- Avoid hidden application state or gallery-only dependencies.
- Remain understandable when copied with its stylesheet and documented dependencies.

## States and Error Handling

- Search with no matches shows a useful empty state and a clear reset action.
- Unknown component routes lead to an in-gallery not-found state with navigation back to the catalog.
- Clipboard actions show success or failure without blocking interaction.
- Dialog focus returns to its trigger after close.
- Disabled, loading, invalid, checked, selected, and expanded states are demonstrated where applicable.
- Motion respects `prefers-reduced-motion` and never hides essential content.
- The gallery remains usable if optional browser APIs such as Clipboard are unavailable.

## Accessibility

Target WCAG 2.2 AA fundamentals:

- Semantic landmarks and heading order.
- Full keyboard navigation with visible focus.
- At least 44px touch targets for primary interactive controls on compact screens.
- Sufficient text, border, and focus contrast in both themes.
- Labels and descriptions for every form control.
- Escape and focus-trap behavior for modal interfaces.
- Reduced-motion support.
- Screen-reader announcements for copy feedback and dynamic search results where useful.

## Responsive Behavior

- Desktop: persistent sidebar, top search, wide preview canvas, and optional table of contents.
- Tablet: narrower navigation and content-first layout with preserved preview space.
- Mobile: drawer navigation, stacked examples, horizontally scrollable code blocks, and full-width controls only when ergonomically appropriate.
- Layouts reflow through CSS grid and flexible measurements; no desktop-only fixed widths.

## Verification

- TypeScript compilation and production build.
- Focused component tests for variants and interaction behavior.
- Accessibility checks for semantic markup, names, focus, and keyboard flows.
- Browser verification at desktop and 390px mobile widths.
- Route and asset verification under the GitHub Pages base path.
- Copy-source behavior with both Clipboard success and fallback failure.
- One bounded visual review followed by one correction pass, in accordance with the approved comp-first workflow.

## Repository and Deployment

- Initialize a Git repository with `main` as the default branch.
- Create the public GitHub repository `sunny-components` under the authenticated account.
- Include a concise README describing purpose, local development, copying components, and deployment.
- Add a GitHub Actions workflow that builds the Vite site and deploys the static output to GitHub Pages.
- Configure Pages to use GitHub Actions.
- Verify the public Pages URL and at least one component route after deployment.

## Success Criteria

- The public site loads from GitHub Pages and works on desktop and mobile.
- A visitor can find any initial component, interact with its preview, and copy a usable React example.
- Components are modular source files without dependence on the gallery shell.
- Dark and light themes are coherent, accessible, and visibly part of the same system.
- The result feels recognizably connected to Simply Sunny and Silk-S1 while remaining clearer and more scalable than either project’s current one-page presentation.

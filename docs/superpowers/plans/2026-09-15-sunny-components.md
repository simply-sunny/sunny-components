# Sunny Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publicly deploy a source-first React component library with a polished, searchable component gallery.

**Architecture:** A Vite React app hosts reusable source components and a static documentation gallery. Components depend only on semantic CSS tokens and declared primitive dependencies; demos and documentation metadata stay separate. Hash routes make direct component links reliable under GitHub Pages.

**Tech Stack:** React, TypeScript, Vite, CSS custom properties, Radix Dialog/Tooltip, Lucide React, Vitest, Testing Library, jest-axe, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-15-sunny-components-design.md`

## Global Constraints

- Repository and Vite base path: `sunny-compoenents` and `/sunny-compoenents/`.
- Source library only; no npm publication.
- Familiar documentation layout, near-black default theme, restrained icy-blue accent.
- Preserve the subtle grid, fine borders, technical typography, precise spacing, and quiet motion of Simply Sunny and Silk-S1.
- No gradients, glassmorphism, oversized marketing hero, decorative icon tiles, or excessive pills.
- Support light/dark themes, keyboard use, visible focus, reduced motion, AA contrast, and 44px primary mobile touch targets.
- Use semantic tokens in components; never embed raw theme colors in component files.

## File Map

- `src/components/*`: reusable implementations and local styles.
- `src/demos/*`: gallery-only demonstrations.
- `src/content/components.tsx`: catalog metadata, examples, snippets, and guidance.
- `src/gallery/*`: documentation shell, navigation, search, pages, and previews.
- `src/styles/tokens.css`: dark/light tokens; `src/styles/gallery.css`: layout and responsive rules.
- `src/lib/route.ts`, `clipboard.ts`, `cn.ts`: focused utilities.
- `.github/workflows/pages.yml`: Pages build/deploy workflow.

---

### Task 1: Bootstrap Vite and the token system

**Files:**
- Create: `package.json`, `index.html`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`
- Create: `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/test/setup.ts`
- Create: `src/lib/cn.ts`, `src/styles/tokens.css`, `src/styles/gallery.css`, `public/favicon.svg`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `cn(...values: Array<string | false | null | undefined>): string`
- Produces: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-accent`, and `--color-focus`.

- [ ] **Step 1: Write the failing shell test**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('introduces the source library', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /sunny components/i })).toBeVisible()
  expect(screen.getByText(/react source library/i)).toBeVisible()
})
```

- [ ] **Step 2: Install the project dependencies**

```bash
npm init -y
npm install react react-dom @radix-ui/react-dialog @radix-ui/react-tooltip lucide-react
npm install -D typescript vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom jest-axe @types/react @types/react-dom @types/jest-axe
```

Configure scripts `dev`, `build`, `test`, and `test:run`; set Vite `base: '/sunny-compoenents/'`, React, jsdom, and `src/test/setup.ts`.

- [ ] **Step 3: Verify the test fails**

Run: `npm run test:run -- src/App.test.tsx`

Expected: FAIL because the application shell is missing.

- [ ] **Step 4: Implement the minimal shell and themes**

```tsx
export default function App() {
  return <main><p>React source library</p><h1>Sunny Components</h1></main>
}
```

Define dark/light semantic tokens, icy-blue accent, two-axis 1px construction grid, responsive type/spacing, and `prefers-reduced-motion` overrides. Add an icy-blue grid favicon.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:run && npm run build
git add package.json package-lock.json index.html tsconfig*.json vite.config.ts src public .gitignore
git commit -m "feat: bootstrap Sunny Components gallery"
```

### Task 2: Build core action, input, and display components

**Files:**
- Create: `src/components/{Button,IconButton,Link,Input,Textarea,Checkbox,Switch,Badge,Card,MetricCard}/*`
- Create: `src/components/index.ts`
- Test: `src/components/Button/Button.test.tsx`, `Input/Input.test.tsx`, `Switch/Switch.test.tsx`

**Interfaces:**
- Consumes: `cn()` and Task 1 semantic tokens.
- Produces: ref-forwarding typed components exported from `src/components/index.ts`.

- [ ] **Step 1: Write failing behavior tests**

```tsx
it('exposes loading state', () => {
  render(<Button loading>Save</Button>)
  expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
  expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
})

it('connects input error text', () => {
  render(<Input label="Project name" error="Name is required" />)
  expect(screen.getByLabelText('Project name')).toHaveAccessibleDescription('Name is required')
})
```

- [ ] **Step 2: Verify missing imports fail**

Run: `npm run test:run -- src/components`

Expected: FAIL on unresolved components.

- [ ] **Step 3: Implement typed primitives**

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
```

Forward compatible native props, refs, and `className`. Use semantic `<button>`, `<a>`, `<input>`, `<textarea>`, and `<label>` elements. Implement Checkbox and Switch with native checkbox inputs. Style hover, focus, disabled, loading, invalid, checked, and selected states only through semantic tokens.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run -- src/components
git add src/components
git commit -m "feat: add core component primitives"
```

### Task 3: Build feedback, navigation, and overlay components

**Files:**
- Create: `src/components/{CodeBlock,Alert,Progress,Skeleton,Tabs,Breadcrumbs,TopNav,Dialog,Tooltip}/*`
- Modify: `src/components/index.ts`
- Test: `src/components/Tabs/Tabs.test.tsx`, `Dialog/Dialog.test.tsx`, `CodeBlock/CodeBlock.test.tsx`

**Interfaces:**
- Consumes: Task 1 tokens and Task 2 Button/Link.
- Produces: feedback, navigation, and overlay exports from `src/components/index.ts`.

- [ ] **Step 1: Write failing keyboard tests**

```tsx
it('moves between tabs with arrows', async () => {
  const user = userEvent.setup()
  render(<Tabs items={[{ id:'preview', label:'Preview', content:'Live' }, { id:'code', label:'Code', content:'Source' }]} />)
  await user.click(screen.getByRole('tab', { name: 'Preview' }))
  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('tab', { name: 'Code' })).toHaveAttribute('aria-selected', 'true')
})

it('returns focus after dialog close', async () => {
  const user = userEvent.setup()
  render(<Dialog trigger="Open dialog" title="Example">Content</Dialog>)
  const trigger = screen.getByRole('button', { name: 'Open dialog' })
  await user.click(trigger)
  await user.keyboard('{Escape}')
  expect(trigger).toHaveFocus()
})
```

- [ ] **Step 2: Verify tests fail**

Run: `npm run test:run -- src/components/Tabs src/components/Dialog src/components/CodeBlock`

Expected: FAIL because components are missing.

- [ ] **Step 3: Implement accessible interactions**

Build Tabs with roving focus and `aria-controls`; Dialog and Tooltip on Radix; Alert and Progress with native ARIA semantics; Skeleton with `aria-hidden`; CodeBlock with copy button and live status.

- [ ] **Step 4: Add axe assertions, verify, and commit**

```bash
npm run test:run -- src/components/Tabs src/components/Dialog src/components/CodeBlock
git add src/components
git commit -m "feat: add navigation feedback and overlays"
```

Expected: behavior tests pass and representative `axe(container)` calls return no violations.

### Task 4: Build routing, content, demos, and gallery

**Files:**
- Create: `src/lib/route.ts`, `route.test.ts`, `clipboard.ts`, `clipboard.test.ts`
- Create: `src/content/components.tsx`, `src/demos/ComponentDemos.tsx`
- Create: `src/gallery/{GalleryShell,Sidebar,Search,ComponentPage,PreviewFrame,CodeExample,EmptyState,NotFound}.tsx`
- Create: `src/gallery/gallery.test.tsx`
- Modify: `src/App.tsx`, `src/styles/gallery.css`

**Interfaces:**
- Produces: `parseHash(hash): { kind:'home' } | { kind:'component'; slug:string }`
- Produces: `componentHref(slug: string): string`
- Produces: `copyText(text: string): Promise<'clipboard' | 'fallback'>`
- Produces: `ComponentDoc` with `slug`, `name`, `category`, `summary`, `demo`, `usage`, `props`, and `accessibility`.

- [ ] **Step 1: Write failing route and gallery tests**

```ts
expect(parseHash('#/components/button')).toEqual({ kind: 'component', slug: 'button' })
expect(componentHref('metric-card')).toBe('#/components/metric-card')
```

```tsx
it('shows a resettable empty search state', async () => {
  const user = userEvent.setup()
  render(<GalleryShell />)
  await user.type(screen.getByRole('searchbox'), 'zz-no-match')
  expect(screen.getByText(/no components found/i)).toBeVisible()
  expect(screen.getByRole('button', { name: /clear search/i })).toBeVisible()
})
```

- [ ] **Step 2: Verify tests fail**

Run: `npm run test:run -- src/lib src/gallery`

Expected: FAIL because routing and gallery modules are missing.

- [ ] **Step 3: Implement utilities and content records**

Use hash routes. `copyText` tries `navigator.clipboard.writeText`, then a temporary textarea plus `document.execCommand('copy')`, then rejects clearly. Author one metadata record per approved foundation/component with concrete technical-product examples and snippets matching actual exports.

- [ ] **Step 4: Implement the gallery experience**

Build desktop sidebar, mobile dialog navigation, search, theme toggle, GitHub link, home categories, component pages, invalid-route state, and copy feedback. The first viewport must immediately show Button, Input, Card, and Metric Card specimens.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:run -- src/lib src/gallery && npm run build
git add src
git commit -m "feat: build searchable component gallery"
```

### Task 5: Add documentation and Pages deployment

**Files:**
- Create: `.github/workflows/pages.yml`, `README.md`, `src/deployment.test.ts`
- Modify: `index.html`, `vite.config.ts`

**Interfaces:**
- Consumes: `npm run build` producing `dist/`.
- Produces: a GitHub Pages artifact deployed from `main`.

- [ ] **Step 1: Add the base-path regression test**

```ts
it('uses the Pages repository base', async () => {
  const config = await import('../vite.config')
  expect(config.default.base).toBe('/sunny-compoenents/')
})
```

- [ ] **Step 2: Add the Pages workflow**

Trigger on `main` pushes and manual dispatch. Use `actions/configure-pages`, `npm ci`, `npm run test:run`, `npm run build`, `actions/upload-pages-artifact` for `dist`, and `actions/deploy-pages`. Grant `pages: write` and `id-token: write`; target the `github-pages` environment.

- [ ] **Step 3: Write complete README guidance**

Document installation, development, tests, builds, source copying, tokens, component structure, and deployed gallery URL. State that the project is source-first and not published to npm.

- [ ] **Step 4: Verify and commit**

```bash
npm run test:run && npm run build
git add .github README.md index.html vite.config.ts src/deployment.test.ts
git commit -m "ci: deploy gallery to GitHub Pages"
```

### Task 6: Verify and document visual quality

**Files:**
- Create: `.impeccable/review/desktop.png`, `.impeccable/review/mobile.png`, `DESIGN.md`, `.impeccable/design.json`
- Modify: visual source files identified by review.

**Interfaces:**
- Consumes: approved plain documentation direction with icy-blue accent and completed gallery.
- Produces: verified desktop/mobile renders and documented design tokens.

- [ ] **Step 1: Read the craft floor**

Read `/Users/smpb/.codex/plugins/cache/openai-curated-remote/impeccable/4.3.1/skills/impeccable/reference/craft-floor.md` completely before visual edits.

- [ ] **Step 2: Capture one bounded desktop/mobile review round**

Run the preview and capture full pages from the top at 1440px and 390px into the two review files after motion settles.

- [ ] **Step 3: Run tests and the detector**

```bash
npm run test:run && npm run build
/Users/smpb/.codex/plugins/cache/openai-curated-remote/impeccable/4.3.1/skills/impeccable/scripts/impeccable detect --json src
```

- [ ] **Step 4: Run the shipped finish reviewer**

Dispatch `impeccable_finish_reviewer` with the request, approved direction, spec, artifact path, both screenshots, detector findings, and craft-floor path. Follow its exact disposition. For `fix`, make one batch, rebuild, recapture both widths, and request one verdict pass.

- [ ] **Step 5: Document and commit the visual system**

Dispatch `impeccable_documenter` with project root, artifact path, direction contract, `PRODUCT.md`, and document reference. Verify token-bearing `DESIGN.md` and `.impeccable/design.json`, then run:

```bash
git add src DESIGN.md .impeccable/design.json
git commit -m "refactor: polish and document component system"
```

### Task 7: Create the GitHub repository and publish

**Files:**
- No new source files expected.

**Interfaces:**
- Consumes: clean local `main` and authenticated GitHub CLI.
- Produces: public `simply-sunny/sunny-compoenents` repository and live Pages site.

- [ ] **Step 1: Verify local and GitHub state**

```bash
git status --short --branch
gh auth status
```

Expected: `main`, no unintended changes, and authenticated GitHub access.

- [ ] **Step 2: Create and push the repository**

```bash
gh repo create sunny-compoenents --public --source=. --remote=origin --push
```

Expected: `main` tracks `origin/main`.

- [ ] **Step 3: Observe deployment**

Use `gh run watch` on the Pages workflow. If Pages requires initial configuration, set its build type to GitHub Actions and rerun the workflow.

- [ ] **Step 4: Verify the public experience**

Open `https://simply-sunny.github.io/sunny-compoenents/` and verify home, search, theme switch, one component route, copy feedback, desktop layout, mobile layout, and no blocking console errors.

- [ ] **Step 5: Report delivery**

Return repository URL, Pages URL, component count, verification summary, and intentionally deferred items.

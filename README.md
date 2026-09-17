<p align="center">
  <img src="public/favicon.svg" width="112" height="112" alt="Sunny Components half-sun icon" />
</p>

# Sunny Components

<p align="left">
  <strong>Source-first React components for focused technical products.</strong><br>
  React + TypeScript &bull; Dark and light themes &bull; Accessible interactions &bull; GitHub Pages gallery
</p>

<p align="left">
  <a href="https://simply-sunny.github.io/sunny-components/"><img src="https://img.shields.io/badge/gallery-GitHub_Pages-black?style=flat-square&logo=github" alt="Gallery"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/code-MIT-black?style=flat-square" alt="MIT License"></a>
  <a href="LICENSE-ASSETS.md"><img src="https://img.shields.io/badge/icon-CC_BY_4.0-black?style=flat-square" alt="CC BY 4.0 icon license"></a>
  <img src="https://img.shields.io/badge/components-20-black?style=flat-square" alt="20 components">
</p>

---

### Highlights

- **Install or copy**: use the npm package, or copy the source kit with the bundled CLI.
- **Twenty-six documented entries**: 20 components plus color, typography, spacing, radius, borders/shadows, and motion foundations.
- **Accessible by contract**: keyboard navigation, visible focus, semantic HTML, reduced motion, and light/dark contrast.
- **Technical visual language**: near-black surfaces, an icy-blue accent, fine borders, and the construction grid.
- **Public gallery**: searchable navigation, live states, usage snippets, typed-prop guidance, and responsive layouts.

---

### npm Package & CLI

The package is prepared for publication but **not published to npm yet**. For now, build a local tarball:

```bash
npm ci
npm pack                     # builds sunny-components-1.0.0.tgz
# From your React 19 app:
npm install /path/to/sunny-components-1.0.0.tgz
```

```tsx
import { Button, AnimatedNumber } from 'sunny-components';
import 'sunny-components/styles.css'; // import once, in your app entry

<Button>Save</Button>
<AnimatedNumber value={latency} decimals={1} suffix=" ms" />
```

Includes ESM and CommonJS entry points, TypeScript declarations, and an explicit stylesheet export. React and React DOM are peer dependencies; Radix and Lucide are installed dependencies. Gallery layout styles are excluded. The tokens stylesheet currently loads DM Sans and IBM Plex Mono from Google Fonts; override `--font-sans` / `--font-mono` and self-host fonts when required by your app's privacy or CSP policy.

To own the source instead (after installing the tarball, or after publication):

```bash
npx --no-install sunny-components init src/sunny
```

The CLI copies the shared component kit, styles, class-name helper, and MIT license. It refuses existing directories, never edits your app's configuration, and prints required dependency/style imports. There is no remote code download or custom registry. Individual-component installation can be added once the shared source module is split.

### Quickstart

```bash
git clone https://github.com/simply-sunny/sunny-components.git
cd sunny-components
npm install
npm run dev
```

Run verification and create the static build:

```bash
npm run test:run
npm run build
```

### Copy a Component

Components are exported from `src/components/index.tsx`. Copy the component source, `components.css`, and the semantic tokens your project needs.

```tsx
import { Button, Input } from "./components";
import "./components/components.css";
import "./styles/tokens.css";

export function ExperimentForm() {
  return (
    <form>
      <Input label="Experiment name" />
      <Button>Start analysis</Button>
    </form>
  );
}
```

---

### Component Catalog

| Group      | Components                           |
| ---------- | ------------------------------------ |
| Actions    | Button, Icon Button, Link            |
| Inputs     | Input, Textarea, Checkbox, Switch    |
| Display    | Badge, Card, Metric Card, Animated Number, Code Block |
| Feedback   | Alert, Progress, Skeleton            |
| Navigation | Tabs, Breadcrumbs, Top Navigation    |
| Overlays   | Dialog, Tooltip                      |

### Animated Numbers

```tsx
import { AnimatedNumber, MetricCard } from "./components";

<MetricCard
  label="Latency"
  value={<AnimatedNumber value={latency} decimals={1} suffix=" ms" />}
  note="Simulated ping"
/>
```

Digits roll up on increase and down on decrease, including carries such as 9 → 10. Inspired by the Dynamic Island volume readout in [vorssaint-utils](https://github.com/vorssaint/vorssaint-utils). The [playground](https://simply-sunny.github.io/sunny-components/#/components/animated-number) includes value, duration, and travel sliders, replay, and reduced motion.

Copy `AnimatedNumber.tsx` and its imported `AnimatedNumber.css`, plus the `.sr-only` utility from `components.css`. Override `--motion-duration` (default `140ms`) and `--motion-distance` (default `100%`) on a parent to tune the effect. Screen readers receive one complete value; system reduced-motion preferences disable the roll.

### Foundations

Semantic tokens cover color, typography, spacing, radius, borders, shadows, focus, and motion. Dark mode is the default visual expression; light mode preserves the same hierarchy and icy-blue interaction language.

---

### Project Structure

```text
sunny-components/
├── src/
│   ├── components/       # Portable React source and component styles
│   ├── styles/           # Semantic tokens and gallery layout
│   ├── lib/              # Routing and class-name utilities
│   └── App.tsx           # Searchable documentation gallery
├── public/               # Half-sun icon and static assets
├── docs/                 # Product, direction, specification, and plan records
└── .github/workflows/    # GitHub Pages build and deployment
```

### Related Projects

- [Silk-S1](https://simply-sunny.github.io/silk-s1/) — live documentation for the prosody-aware speech emotion architecture on Apple Silicon.
- [Find My Items](https://github.com/simply-sunny/find-my-items) — indexed container search and retrieval for Minecraft.
- [Footsteps](https://github.com/simply-sunny/footsteps) — days represented as navigable trajectories.
- [Cue My Music](https://github.com/simply-sunny/cue-my-music) — deterministic music-transition tooling.

### Package Verification & Publishing

```bash
npm run test:run             # component tests
npm run build               # GitHub Pages gallery
npm run test:package        # pack, install into a temp app, verify imports/types/CSS/CLI
```

The package test requires registry access. Node 22.12+ is required for the repository tooling and CLI.

Publishing is manual and requires an npm account with permission to the package name:

```bash
npm login
npm whoami
npm publish --dry-run
npm publish --access public
```

`sunny-components` has an unpublished-name history on npm; ownership/availability has not been verified. If needed, set an owned scoped name (`npm pkg set name=@YOUR_SCOPE/sunny-components`) before publishing and update import examples accordingly. `prepack` rebuilds package artifacts on every pack/publish. The gallery's existing Pages deployment is unchanged; it does not publish npm releases.

### License & Credits

- **Code**: [MIT License](LICENSE) &bull; Saunak Karnati
- **Half-sun icon**: original vector artwork licensed under [Creative Commons Attribution 4.0 International](LICENSE-ASSETS.md) (CC BY 4.0).
- **Typography**: DM Sans and IBM Plex Mono under their respective open font licenses.

<p align="center">
  <img src="public/favicon.svg" width="112" height="112" alt="Sunny Components half-sun icon" />
</p>

# Sunny Components

<p align="left">
  <strong>Source-first React components for focused technical products.</strong><br>
  React + TypeScript &bull; Dark and light themes &bull; Accessible interactions &bull; GitHub Pages gallery
</p>

<p align="left">
  <a href="https://simply-sunny.github.io/sunny-compoenents/"><img src="https://img.shields.io/badge/gallery-GitHub_Pages-black?style=flat-square&logo=github" alt="Gallery"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/code-MIT-black?style=flat-square" alt="MIT License"></a>
  <a href="LICENSE-ASSETS.md"><img src="https://img.shields.io/badge/icon-CC_BY_4.0-black?style=flat-square" alt="CC BY 4.0 icon license"></a>
  <img src="https://img.shields.io/badge/components-19-black?style=flat-square" alt="19 components">
</p>

---

### Highlights

- **Source-first**: copy components directly into a project; no package registry or release tooling required.
- **Twenty-five documented entries**: 19 components plus color, typography, spacing, radius, borders/shadows, and motion foundations.
- **Accessible by contract**: keyboard navigation, visible focus, semantic HTML, reduced motion, and light/dark contrast.
- **Technical visual language**: near-black surfaces, an icy-blue accent, fine borders, and the construction grid shared by [Simply Sunny](https://simply-sunny.github.io/) and [Silk-S1](https://simply-sunny.github.io/silk-s1/).
- **Public gallery**: searchable navigation, live states, usage snippets, typed-prop guidance, and responsive layouts.

---

### Quickstart

```bash
git clone https://github.com/simply-sunny/sunny-compoenents.git
cd sunny-compoenents
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
| Display    | Badge, Card, Metric Card, Code Block |
| Feedback   | Alert, Progress, Skeleton            |
| Navigation | Tabs, Breadcrumbs, Top Navigation    |
| Overlays   | Dialog, Tooltip                      |

### Foundations

Semantic tokens cover color, typography, spacing, radius, borders, shadows, focus, and motion. Dark mode is the default visual expression; light mode preserves the same hierarchy and icy-blue interaction language.

---

### Project Structure

```text
sunny-compoenents/
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

- [Silk-S1](https://github.com/simply-sunny/silk-s1) — prosody-aware speech emotion architecture on Apple Silicon.
- [Find My Items](https://github.com/simply-sunny/find-my-items) — indexed container search and retrieval for Minecraft.
- [Footsteps](https://github.com/simply-sunny/footsteps) — days represented as navigable trajectories.
- [Cue My Music](https://github.com/simply-sunny/cue-my-music) — deterministic music-transition tooling.

### License & Credits

- **Code**: [MIT License](LICENSE) &bull; Saunak Karnati
- **Half-sun icon**: original vector artwork licensed under [Creative Commons Attribution 4.0 International](LICENSE-ASSETS.md) (CC BY 4.0).
- **Typography**: DM Sans and IBM Plex Mono under their respective open font licenses.

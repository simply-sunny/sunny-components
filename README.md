# Sunny Components

A source-first React component library for focused technical products. The gallery pairs the restrained visual language of Simply Sunny and Silk-S1 with searchable, accessible component documentation.

Sunny Components is not published to npm. Copy the component source and its stylesheet into your project, then adapt the semantic tokens to your product.

## Local development

```bash
npm install
npm run dev
```

Run the checks and production build:

```bash
npm run test:run
npm run build
```

## Using a component

Components are exported from `src/components/index.tsx` and styled by `src/components/components.css`. The shared color, type, and state contracts live in `src/styles/tokens.css`.

```tsx
import { Button, Input } from './components'
import './components/components.css'
import './styles/tokens.css'

export function Example() {
  return (
    <form>
      <Input label="Experiment name" />
      <Button>Start analysis</Button>
    </form>
  )
}
```

## Included

- Actions: Button, Icon Button, Link
- Inputs: Input, Textarea, Checkbox, Switch
- Display: Badge, Card, Metric Card, Code Block
- Feedback: Alert, Progress, Skeleton
- Navigation: Tabs, Breadcrumbs, Top Navigation composition
- Overlays: Dialog, Tooltip
- Foundations: dark/light tokens, typography, spacing, borders, focus, and motion

The public gallery is deployed at [simply-sunny.github.io/sunny-compoenents](https://simply-sunny.github.io/sunny-compoenents/).

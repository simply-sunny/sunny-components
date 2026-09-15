import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Component,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import {
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  CodeBlock,
  Dialog,
  IconButton,
  Input,
  MetricCard,
  Progress,
  Skeleton,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
} from "./components";
import { componentHref, parseHash } from "./lib/route";

type Doc = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  demo: ReactNode;
  usage: string;
  notes: string[];
};
const docs: Doc[] = [
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    summary: "A precise action control with four visual priorities.",
    demo: (
      <div className="demo-row">
        <Button>Run analysis</Button>
        <Button variant="secondary">Preview</Button>
        <Button variant="ghost">Cancel</Button>
        <Button loading>Syncing</Button>
      </div>
    ),
    usage: `<Button variant="primary">Run analysis</Button>`,
    notes: [
      "Use one primary action per region.",
      "Loading preserves the label and announces busy state.",
    ],
  },
  {
    slug: "icon-button",
    name: "Icon Button",
    category: "Actions",
    summary: "Compact actions with mandatory accessible labels.",
    demo: (
      <Tooltip label="Open repository">
        <IconButton aria-label="Open repository">
          <Code2 size={17} />
        </IconButton>
      </Tooltip>
    ),
    usage: `<IconButton aria-label="Open repository"><Code2 /></IconButton>`,
    notes: [
      "Always provide aria-label.",
      "Pair unfamiliar icons with a tooltip.",
    ],
  },
  {
    slug: "link",
    name: "Link",
    category: "Actions",
    summary: "Inline navigation with a visible, offset underline.",
    demo: (
      <a className="sc-link" href="#/components/card">
        Read the Card guide
      </a>
    ),
    usage: `<Link href="/docs">Read the guide</Link>`,
    notes: ["Links navigate; buttons perform actions."],
  },
  {
    slug: "input",
    name: "Input",
    category: "Inputs",
    summary: "Labeled text input with hint and error support.",
    demo: (
      <div className="demo-stack">
        <Input
          label="Experiment name"
          placeholder="Acoustic pass 04"
          hint="Visible to your team"
        />
        <Input
          label="Model path"
          defaultValue=""
          error="Choose a model directory"
        />
      </div>
    ),
    usage: `<Input label="Experiment name" hint="Visible to your team" />`,
    notes: [
      "Labels remain visible while typing.",
      "Error copy states the problem and recovery.",
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Inputs",
    summary: "Multi-line input with comfortable reading measure.",
    demo: (
      <Textarea
        label="Run notes"
        defaultValue="Prosody head converged after the fourth pass."
      />
    ),
    usage: `<Textarea label="Run notes" />`,
    notes: ["Allow vertical resize."],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Inputs",
    summary: "A native checkbox with a custom visual surface.",
    demo: (
      <div className="demo-stack">
        <Checkbox label="Normalize audio" defaultChecked />
        <Checkbox label="Export frame timings" />
      </div>
    ),
    usage: `<Checkbox label="Normalize audio" defaultChecked />`,
    notes: ["The label toggles the input."],
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Inputs",
    summary: "Immediate settings expressed with native input behavior.",
    demo: <Switch label="Live transcription" defaultChecked />,
    usage: `<Switch label="Live transcription" defaultChecked />`,
    notes: ["Use for immediate settings, not form submission."],
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Display",
    summary: "Compact metadata for status and taxonomy.",
    demo: (
      <div className="demo-row">
        <Badge tone="accent">Experimental</Badge>
        <Badge tone="success">Ready</Badge>
        <Badge tone="warning">Review</Badge>
      </div>
    ),
    usage: `<Badge tone="accent">Experimental</Badge>`,
    notes: ["Do not use badges as buttons."],
  },
  {
    slug: "card",
    name: "Card",
    category: "Display",
    summary: "A quiet grouping surface with one level of enclosure.",
    demo: (
      <Card>
        <Badge tone="accent">MLX</Badge>
        <h3>Speech encoder</h3>
        <p>Whisper Turbo v3 · unified memory</p>
      </Card>
    ),
    usage: `<Card><h3>Speech encoder</h3><p>Whisper Turbo v3</p></Card>`,
    notes: ["Avoid nested cards.", "Use spacing before adding more borders."],
  },
  {
    slug: "metric-card",
    name: "Metric Card",
    category: "Display",
    summary: "Tabular performance data with supporting context.",
    demo: (
      <MetricCard
        label="Median latency"
        value="150 ms"
        note="End-to-end · M2 Max"
      />
    ),
    usage: `<MetricCard label="Median latency" value="150 ms" note="End-to-end" />`,
    notes: ["Always include measurement context."],
  },
  {
    slug: "code-block",
    name: "Code Block",
    category: "Display",
    summary: "Scrollable source with clipboard feedback.",
    demo: <CodeBlock code={"uv run python -m silk.inference clip.mp4"} />,
    usage: `<CodeBlock code={command} />`,
    notes: ["Keep lines copyable and horizontally scrollable."],
  },
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    summary: "Concise status with a clear next step.",
    demo: (
      <Alert title="Model ready" tone="success">
        Weights verified. You can start local inference.
      </Alert>
    ),
    usage: `<Alert title="Model ready" tone="success">Weights verified.</Alert>`,
    notes: ["Lead with the outcome, then recovery or next step."],
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Feedback",
    summary: "A labeled determinate progress indicator.",
    demo: <Progress label="Feature extraction" value={68} />,
    usage: `<Progress label="Feature extraction" value={68} />`,
    notes: ["Use known progress only; use Skeleton for indeterminate loading."],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    summary: "A quiet placeholder that preserves layout.",
    demo: (
      <div className="demo-stack">
        <Skeleton />
        <Skeleton className="short" />
        <Skeleton />
      </div>
    ),
    usage: `<Skeleton className="short" />`,
    notes: ["Hide decorative placeholders from assistive technology."],
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    summary: "Keyboard-operable views within one context.",
    demo: (
      <Tabs
        items={[
          {
            id: "preview",
            label: "Preview",
            content: <p>Interactive component canvas.</p>,
          },
          {
            id: "source",
            label: "Source",
            content: <p>Portable React implementation.</p>,
          },
        ]}
      />
    ),
    usage: `<Tabs items={[{ id: 'preview', label: 'Preview', content: <Demo /> }]} />`,
    notes: ["Arrow keys move selection.", "Use tabs only for peer views."],
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    summary: "Location context for nested documentation.",
    demo: (
      <Breadcrumbs
        items={[
          { label: "Components", href: "#/" },
          { label: "Navigation", href: "#/" },
          { label: "Breadcrumbs" },
        ]}
      />
    ),
    usage: `<Breadcrumbs items={[{ label: 'Components', href: '#/' }, { label: 'Button' }]} />`,
    notes: ["The final item identifies the current page."],
  },
  {
    slug: "top-navigation",
    name: "Top Navigation",
    category: "Navigation",
    summary: "A compact product bar composed from primitives.",
    demo: (
      <div className="mini-nav">
        <strong>Sunny</strong>
        <span>Components</span>
        <Button size="sm" variant="secondary">
          GitHub
        </Button>
      </div>
    ),
    usage: `<nav aria-label="Primary">…</nav>`,
    notes: ["Keep global actions few and stable."],
  },
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    summary: "Protected focus for short, interruptive decisions.",
    demo: (
      <Dialog trigger="Open example" title="Export component">
        Copy source and its component stylesheet together.
      </Dialog>
    ),
    usage: `<Dialog trigger="Open" title="Export component">Content</Dialog>`,
    notes: [
      "Escape closes and focus returns to the trigger.",
      "Do not use when inline disclosure is enough.",
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    summary: "Brief supporting labels for compact controls.",
    demo: (
      <Tooltip label="Copy component source">
        <IconButton aria-label="Copy component source">
          <Component size={17} />
        </IconButton>
      </Tooltip>
    ),
    usage: `<Tooltip label="Copy source"><IconButton aria-label="Copy source">…</IconButton></Tooltip>`,
    notes: ["Never place essential instructions only in a tooltip."],
  },
];
const foundations = [
  ["color", "Color", "Semantic roles tuned for two themes."],
  [
    "typography",
    "Typography",
    "A readable sans with mono reserved for code and data.",
  ],
  ["spacing", "Spacing", "A 4px base rhythm with deliberate section scale."],
  ["motion", "Motion", "One quiet state language with reduced-motion support."],
];
const categories = [
  "Actions",
  "Inputs",
  "Display",
  "Feedback",
  "Navigation",
  "Overlays",
];

function useRoute() {
  const [route, setRoute] = useState(() => parseHash(location.hash));
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(location.hash));
      scrollTo({ top: 0, behavior: "instant" });
    };
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);
  return route;
}
function ThemeButton() {
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("sunny-theme") as "dark" | "light") || "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("sunny-theme", theme);
  }, [theme]);
  return (
    <IconButton
      aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </IconButton>
  );
}
function Sidebar({
  query,
  setQuery,
  onNavigate,
}: {
  query: string;
  setQuery: (v: string) => void;
  onNavigate?: () => void;
}) {
  const filtered = docs.filter((d) =>
    `${d.name} ${d.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <aside className="sidebar">
      <a className="brand" href="#/" onClick={onNavigate}>
        <span className="brand-mark">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          Sunny
          <br />
          <em>Components</em>
        </span>
      </a>
      <label className="search">
        <Search size={15} />
        <input
          aria-label="Search components"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components…"
        />
      </label>
      <nav aria-label="Component catalog">
        <a href="#/" onClick={onNavigate}>
          Overview
        </a>
        <div className="nav-group">
          <span>Foundations</span>
          {foundations.map((f) => (
            <a key={f[0]} href="#/" onClick={onNavigate}>
              {f[1]}
            </a>
          ))}
        </div>
        {categories.map((cat) => {
          const items = filtered.filter((d) => d.category === cat);
          return items.length ? (
            <div className="nav-group" key={cat}>
              <span>{cat}</span>
              {items.map((d) => (
                <a
                  key={d.slug}
                  href={componentHref(d.slug)}
                  onClick={onNavigate}
                >
                  {d.name}
                </a>
              ))}
            </div>
          ) : null;
        })}
        {filtered.length === 0 && (
          <div className="nav-empty">
            <p>No components found.</p>
            <button onClick={() => setQuery("")}>Clear search</button>
          </div>
        )}
      </nav>
    </aside>
  );
}
function Header({ openMenu }: { openMenu: () => void }) {
  return (
    <header className="topbar">
      <IconButton
        className="menu-button"
        aria-label="Open navigation"
        onClick={openMenu}
      >
        <Menu size={18} />
      </IconButton>
      <span className="top-title">Sunny Components</span>
      <div>
        <ThemeButton />
        <a
          className="sc-icon-button"
          aria-label="View GitHub repository"
          href="https://github.com/simply-sunny/sunny-compoenents"
        >
          <Code2 size={17} />
        </a>
      </div>
    </header>
  );
}
function Home() {
  return (
    <main className="content home">
      <section className="intro">
        <div>
          <Badge tone="accent">React source library</Badge>
          <h1 aria-label="Sunny Components">
            Sunny
            <br />
            Components
          </h1>
        </div>
        <div className="intro-copy">
          <p>Modular interface source for focused, technical products.</p>
          <a className="text-link" href={componentHref("button")}>
            Explore components <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
      <section className="showcase" aria-label="Component preview">
        <div className="showcase-meta">
          <span>LIVE SYSTEM / 19 COMPONENTS</span>
          <span>ICE BLUE / DARK</span>
        </div>
        <div className="showcase-grid">
          <div className="control-sample">
            <Input label="Run name" defaultValue="prosody-pass-04" />
            <div className="demo-row">
              <Button>Start analysis</Button>
              <Button variant="secondary">View logs</Button>
            </div>
            <Progress label="Feature extraction" value={68} />
          </div>
          <MetricCard
            label="Median latency"
            value="150 ms"
            note="End-to-end · Apple Silicon"
          />
          <Card className="status-card">
            <div>
              <Badge tone="success">Ready</Badge>
              <CheckCircle2 size={19} />
            </div>
            <h3>Speech encoder</h3>
            <p>Weights verified and loaded into unified memory.</p>
          </Card>
        </div>
      </section>
      <section className="catalog">
        <div className="section-heading">
          <h2>Built from clear parts.</h2>
          <p>
            Every component includes live states, portable source, and
            accessibility guidance.
          </p>
        </div>
        <div className="category-list">
          {categories.map((cat, index) => (
            <div className="category-row" key={cat}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{cat}</h3>
              <p>
                {docs
                  .filter((d) => d.category === cat)
                  .map((d) => d.name)
                  .join(" · ")}
              </p>
              <a
                href={componentHref(docs.find((d) => d.category === cat)!.slug)}
                aria-label={`Browse ${cat}`}
              >
                <ArrowUpRight />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
function ComponentPage({ doc }: { doc: Doc }) {
  return (
    <main className="content doc-page">
      <Breadcrumbs
        items={[
          { label: "Components", href: "#/" },
          { label: doc.category, href: "#/" },
          { label: doc.name },
        ]}
      />
      <header>
        <div>
          <Badge tone="accent">{doc.category}</Badge>
          <h1>{doc.name}</h1>
          <p>{doc.summary}</p>
        </div>
        <a
          className="text-link"
          href={`https://github.com/simply-sunny/sunny-compoenents/tree/main/src/components`}
        >
          View source <ArrowUpRight size={15} />
        </a>
      </header>
      <section>
        <h2>Preview</h2>
        <div className="preview-canvas">{doc.demo}</div>
      </section>
      <section>
        <h2>Usage</h2>
        <CodeBlock
          code={`import { ${doc.name.replaceAll(" ", "")} } from './components'\n\n${doc.usage}`}
        />
      </section>
      <section className="guidance">
        <h2>Guidance</h2>
        <ul>
          {doc.notes.map((note) => (
            <li key={note}>
              <CheckCircle2 size={16} />
              {note}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
function App() {
  const route = useRoute();
  const [query, setQuery] = useState("");
  const [mobile, setMobile] = useState(false);
  const doc = useMemo(
    () =>
      route.kind === "component"
        ? docs.find((d) => d.slug === route.slug)
        : undefined,
    [route],
  );
  return (
    <div className="app-shell">
      <Sidebar query={query} setQuery={setQuery} />
      <Header openMenu={() => setMobile(true)} />
      {mobile && (
        <div className="mobile-sheet">
          <IconButton
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          >
            <X size={18} />
          </IconButton>
          <Sidebar
            query={query}
            setQuery={setQuery}
            onNavigate={() => setMobile(false)}
          />
        </div>
      )}
      {route.kind === "home" ? (
        <Home />
      ) : doc ? (
        <ComponentPage doc={doc} />
      ) : (
        <main className="content not-found">
          <h1>Component not found.</h1>
          <p>This entry may have moved or is not part of the first release.</p>
          <Button
            onClick={() => {
              location.hash = "#/";
            }}
          >
            Return to catalog
          </Button>
        </main>
      )}
    </div>
  );
}
export default App;

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Check, Copy, X } from "lucide-react";
import {
  forwardRef,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../lib/cn";
import { AnimatedNumber } from "./AnimatedNumber";
export { AnimatedNumber } from "./AnimatedNumber";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "sc-button",
        `sc-button--${variant}`,
        `sc-button--${size}`,
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="sc-spinner" aria-hidden="true" />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("sc-icon-button", className)} {...props} />
));
IconButton.displayName = "IconButton";

export const Link = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("sc-link", className)} {...props} />
));
Link.displayName = "Link";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const generated = useId();
    const inputId = id || generated;
    const desc = error || hint;
    return (
      <div className="sc-field">
        <label htmlFor={inputId}>{label}</label>
        <input
          ref={ref}
          id={inputId}
          className={cn("sc-input", className)}
          aria-invalid={!!error || undefined}
          aria-describedby={desc ? `${inputId}-desc` : undefined}
          {...props}
        />
        {desc && (
          <small id={`${inputId}-desc`} className={error ? "sc-error" : ""}>
            {desc}
          </small>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }
>(({ label, id, className, ...props }, ref) => {
  const generated = useId();
  const inputId = id || generated;
  return (
    <label className="sc-field" htmlFor={inputId}>
      <span>{label}</span>
      <textarea
        ref={ref}
        id={inputId}
        className={cn("sc-input sc-textarea", className)}
        {...props}
      />
    </label>
  );
});
Textarea.displayName = "Textarea";

export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="sc-check">
      <input type="checkbox" {...props} />
      <span className="sc-check-box">
        <Check size={13} />
      </span>
      <span>{label}</span>
    </label>
  );
}
export function Switch({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="sc-switch">
      <input type="checkbox" role="switch" {...props} />
      <span className="sc-switch-track">
        <span />
      </span>
      <span>{label}</span>
    </label>
  );
}
export function Badge({
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "accent" | "success" | "warning";
}) {
  return <span className={`sc-badge sc-badge--${tone}`} {...props} />;
}
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sc-card", className)} {...props} />
  ),
);
Card.displayName = "Card";
export function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note: string;
}) {
  return (
    <Card className="sc-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </Card>
  );
}
export function Alert({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: "info" | "success" | "danger";
}) {
  return (
    <div role="alert" className={`sc-alert sc-alert--${tone}`}>
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  );
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="sc-progress-wrap">
      <div>
        <span>{label}</span>
        <span><AnimatedNumber value={value} suffix="%" /></span>
      </div>
      <div
        className="sc-progress"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("sc-skeleton", className)} />;
}

export type TabItem = { id: string; label: string; content: ReactNode };
export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const move = (index: number, delta: number) => {
    const next = (index + delta + items.length) % items.length;
    setActive(items[next].id);
    refs.current[next]?.focus();
  };
  return (
    <div className="sc-tabs">
      <div role="tablist" aria-label="Example views">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => setActive(item.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") move(index, 1);
              if (event.key === "ArrowLeft") move(index, -1);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`panel-${item.id}`}
          role="tabpanel"
          hidden={active !== item.id}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="sc-breadcrumbs">
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function Dialog({
  trigger,
  title,
  children,
}: {
  trigger: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <Button variant="secondary">{trigger}</Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="sc-dialog-overlay" />
        <DialogPrimitive.Content className="sc-dialog">
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description>
            Review this focused example, then close to return.
          </DialogPrimitive.Description>
          <div>{children}</div>
          <DialogPrimitive.Close asChild>
            <IconButton aria-label="Close dialog">
              <X size={18} />
            </IconButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="sc-tooltip" sideOffset={8}>
            {label}
            <TooltipPrimitive.Arrow className="sc-tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="sc-code">
      <pre>
        <code>{code}</code>
      </pre>
      <IconButton aria-label="Copy code" onClick={copy}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </IconButton>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}

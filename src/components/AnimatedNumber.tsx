import { useState } from "react";
import "./AnimatedNumber.css";

/** Direction follows the whole value, including carries (9 → 10) and negatives. */
export function AnimatedNumber({ value, decimals = 0, suffix = "" }: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const text = value.toFixed(decimals);
  const [last, setLast] = useState({ value, text, previous: text });
  if (last.value !== value || last.text !== text) {
    setLast({ value, text, previous: last.text });
  }
  // ponytail: two glyphs per changing place, not a ten-digit odometer.
  const length = Math.max(last.previous.length, text.length);
  const before = last.previous.padStart(length, " ");
  const after = text.padStart(length, " ");
  const increasing = Number(text) >= Number(last.previous);
  return (
    <span className="animated-number" data-direction={increasing ? "up" : "down"}>
      <span className="sr-only">{text}{suffix}</span>
      <span aria-hidden="true" className="number-glyphs">
        {[...after].map((char, i) => {
          const changed = before[i] !== char;
          return (
            <span className="number-slot" key={length - i} data-changed={changed || undefined}>
              {changed && <span key={`old-${before[i]}-${char}`} className="number-old">{before[i]}</span>}
              <span key={`new-${char}`} className={changed ? "number-new" : undefined}>{char}</span>
            </span>
          );
        })}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  );
}

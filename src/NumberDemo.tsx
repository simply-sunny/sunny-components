import { useState, type CSSProperties } from "react";
import { AnimatedNumber, Button, MetricCard, Switch } from "./components";

export function NumberDemo() {
  const [value, setValue] = useState(18.4);
  const [duration, setDuration] = useState(140);
  const [distance, setDistance] = useState(100);
  const [reduced, setReduced] = useState(false);
  return (
    <div className="number-demo" data-reduced-motion={reduced} style={{
      "--motion-duration": `${duration}ms`, "--motion-distance": `${distance}%`,
    } as CSSProperties}>
      <MetricCard label="Latency" value={<AnimatedNumber value={value} decimals={1} suffix=" ms" />} note="Simulated ping" />
      <section className="number-customize" aria-label="Customize number animation">
        <h3>Customize</h3>
        <div className="number-controls">
          <label>Value <span>{value.toFixed(1)} ms</span><input type="range" min="0" max="100" step="0.1" value={value} onChange={e => setValue(Number(e.target.value))} /></label>
          <label>Duration <span>{duration} ms</span><input type="range" min="80" max="600" step="20" value={duration} onChange={e => setDuration(Number(e.target.value))} /></label>
          <label>Travel <span>{distance}%</span><input type="range" min="0" max="100" step="10" value={distance} onChange={e => setDistance(Number(e.target.value))} /></label>
        </div>
        <div className="demo-row">
          <Button variant="secondary" onClick={() => setValue(v => v >= 50 ? 18.4 : 82.6)}>Replay</Button>
          <Button variant="ghost" onClick={() => { setValue(18.4); setDuration(140); setDistance(100); }}>Reset</Button>
          <Switch label="Reduce motion" checked={reduced} onChange={e => setReduced(e.target.checked)} />
        </div>
      </section>
    </div>
  );
}

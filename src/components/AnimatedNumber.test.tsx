import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { AnimatedNumber } from './AnimatedNumber';

it('rolls with the whole value across carries, negatives and rapid updates', () => {
  const { container, rerender } = render(<AnimatedNumber value={9} />);
  for (const [value, direction] of [[10, 'up'], [99, 'up'], [100, 'up'], [99, 'down'], [0, 'down'], [-1, 'down'], [0, 'up']] as const) {
    rerender(<AnimatedNumber value={value} />);
    expect(container.querySelector('.animated-number')).toHaveAttribute('data-direction', direction);
    expect(container.querySelector('.sr-only')).toHaveTextContent(String(value));
    expect(container.querySelector('.number-glyphs')).toHaveAttribute('aria-hidden', 'true');
  }
});

it('keeps unchanged digits still and includes decimals and units in accessible text', () => {
  const { container, rerender } = render(<AnimatedNumber value={18.4} decimals={1} suffix=" ms" />);
  rerender(<AnimatedNumber value={18.5} decimals={1} suffix=" ms" />);
  expect(container.querySelectorAll('[data-changed]')).toHaveLength(1);
  expect(container.querySelector('.sr-only')).toHaveTextContent('18.5 ms');
});

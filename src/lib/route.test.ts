import { expect, it } from 'vitest'
import { componentHref, parseHash } from './route'

it('parses component hashes', () => {
  expect(parseHash('#/components/button')).toEqual({ kind: 'component', slug: 'button' })
  expect(componentHref('metric-card')).toBe('#/components/metric-card')
})

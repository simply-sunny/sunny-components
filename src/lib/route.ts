export type Route = { kind: 'home' } | { kind: 'component'; slug: string }
export function parseHash(hash: string): Route {
  const match = hash.match(/^#\/components\/([a-z0-9-]+)$/)
  return match ? { kind: 'component', slug: match[1] } : { kind: 'home' }
}
export const componentHref = (slug: string) => `#/components/${slug}`

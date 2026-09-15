import { expect, it } from 'vitest'
import config from '../vite.config'

it('uses the GitHub Pages repository base', () => {
  expect(config).toMatchObject({ base: '/sunny-compoenents/' })
})

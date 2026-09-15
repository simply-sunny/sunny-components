import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('introduces the source library', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /sunny components/i })).toBeVisible()
  expect(screen.getByText(/modular interface source/i)).toBeVisible()
})

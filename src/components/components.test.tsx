import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { Button, Dialog, Input, Tabs } from './index'

it('exposes button loading state', () => {
  render(<Button loading>Save</Button>)
  expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
  expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
})

it('connects input error text', () => {
  render(<Input label="Project name" error="Name is required" />)
  expect(screen.getByLabelText('Project name')).toHaveAccessibleDescription('Name is required')
})

it('moves between tabs with arrows', async () => {
  const user = userEvent.setup()
  render(<Tabs items={[{ id:'preview', label:'Preview', content:'Live' }, { id:'code', label:'Code', content:'Source' }]} />)
  await user.click(screen.getByRole('tab', { name: 'Preview' }))
  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('tab', { name: 'Code' })).toHaveAttribute('aria-selected', 'true')
})

it('returns focus after dialog close', async () => {
  const user = userEvent.setup()
  render(<Dialog trigger="Open dialog" title="Example">Content</Dialog>)
  const trigger = screen.getByRole('button', { name: 'Open dialog' })
  await user.click(trigger)
  await user.keyboard('{Escape}')
  expect(trigger).toHaveFocus()
})

// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup({initialProps} = {}) {
  let counter = {}
  function CounterComponent(props) {
    Object.assign(counter, useCounter(props))
    return null
  }

  render(<CounterComponent {...initialProps} />)

  return counter
}

test('exposes the count and increment/decrement functions', () => {
  const counter = setup()

  expect(counter.count).toBe(0)

  act(() => counter.increment())
  expect(counter.count).toBe(1)

  act(() => counter.decrement())
  expect(counter.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const counter = setup({
    initialProps: {initialCount: 3},
  })

  expect(counter.count).toBe(3)
})

test('allows customization of the step', () => {
  const counter = setup({
    initialProps: {step: 2},
  })

  expect(counter.count).toBe(0)

  act(() => counter.increment())
  expect(counter.count).toBe(2)

  act(() => counter.decrement())
  expect(counter.count).toBe(0)
})

/* eslint no-unused-vars:0 */

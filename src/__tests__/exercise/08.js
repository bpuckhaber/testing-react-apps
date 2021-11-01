// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  let counter
  function CounterComponent() {
    counter = useCounter()
    return null
  }

  render(<CounterComponent />)

  expect(counter.count).toBe(0)

  act(() => counter.increment())
  expect(counter.count).toBe(1)

  act(() => counter.decrement())
  expect(counter.count).toBe(0)
})

/* eslint no-unused-vars:0 */

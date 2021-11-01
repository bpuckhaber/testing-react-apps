// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function CounterComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>count: {count}</div>
      <button
        onClick={() => {
          decrement()
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          increment()
        }}
      >
        Increment
      </button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<CounterComponent />)

  const count = screen.getByText(/count/i)
  expect(count).toHaveTextContent('count: 0')

  const increment = screen.getByRole('button', {name: /increment/i})
  userEvent.click(increment)
  expect(count).toHaveTextContent('count: 1')

  const decrement = screen.getByRole('button', {name: /decrement/i})
  userEvent.click(decrement)
  expect(count).toHaveTextContent('count: 0')
})

/* eslint no-unused-vars:0 */

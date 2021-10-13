// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = jest.fn(data => {
    submittedData = data
  })

  render(<Login onSubmit={handleSubmit} />)

  userEvent.type(
    screen.getByRole('textbox', {
      name: /username/i,
    }),
    'foo',
  )

  userEvent.type(screen.getByLabelText(/password/i), 'bar')

  userEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    }),
  )

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'foo',
    password: 'bar',
  })
})

/*
eslint
  no-unused-vars: "off",
*/

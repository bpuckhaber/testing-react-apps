// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const loginFormBuilder = build('User', {
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = jest.fn(data => {
    submittedData = data
  })

  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = loginFormBuilder({
    overrides: {password: 'abc'},
  })

  userEvent.type(
    screen.getByRole('textbox', {
      name: /username/i,
    }),
    username,
  )

  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    }),
  )

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/

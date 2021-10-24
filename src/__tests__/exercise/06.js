// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 45,
      longitude: 90,
    },
  }

  let setCurrentPosition
  function useMockCurrentPosition() {
    const [state, setState] = React.useState()
    setCurrentPosition = setState
    return [state]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setCurrentPosition(fakePosition)
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays an error when the user denies geolocation', async () => {
  let setCurrentPosition
  let setCurrentPositionError
  function useMockCurrentPosition() {
    const [state, setState] = React.useState()
    const [error, setError] = React.useState()
    setCurrentPosition = setState
    setCurrentPositionError = setError
    return [state, error]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  const fakeError = {code: 1, message: 'User denied Geolocation'}
  act(() => {
    setCurrentPositionError(fakeError)
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(fakeError.message)).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/

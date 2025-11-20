/* eslint-disable @typescript-eslint/no-require-imports */
import { render, waitFor } from '@testing-library/react-native'
import { Platform } from 'react-native'

// Mock MaterialIcons
jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const React = require('react')
  const { View } = require('react-native')
  const MaterialIconsMock = (props: any) =>
    React.createElement(View, {
      testID: props.testID || `material-icons-${props.name}`,
      ...props,
    })
  MaterialIconsMock.displayName = 'MaterialIcons'
  return MaterialIconsMock
})

// Import the Android version directly
const { IconSymbol } = require('../icon-symbol.tsx')

describe('IconSymbol', () => {
  it('renders without crashing', async () => {
    Platform.OS = 'android'
    const { getByTestId, toJSON } = render(
      <IconSymbol name='house.fill' color='#000000' />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-house.fill')).toBeOnTheScreen()
    })
  })

  it('renders with size and color', async () => {
    Platform.OS = 'android'
    const { getByTestId, toJSON } = render(
      <IconSymbol name='house.fill' size={24} color='#000000' />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-house.fill')).toBeOnTheScreen()
    })
  })

  it('renders paperplane.fill icon', async () => {
    Platform.OS = 'android'
    const { getByTestId, toJSON } = render(
      <IconSymbol name='paperplane.fill' color='#000000' />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-paperplane.fill')).toBeOnTheScreen()
    })
  })

  it('renders chevron.right icon', async () => {
    Platform.OS = 'android'
    const { getByTestId, toJSON } = render(
      <IconSymbol name='chevron.right' color='#000000' />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-chevron.right')).toBeOnTheScreen()
    })
  })

  it('renders with custom size', async () => {
    Platform.OS = 'android'
    const { getByTestId, toJSON } = render(
      <IconSymbol name='house.fill' size={32} color='#000000' />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-house.fill')).toBeOnTheScreen()
    })
  })

  it('renders with custom color', async () => {
    Platform.OS = 'android'
    const { getByTestId, toJSON } = render(
      <IconSymbol name='house.fill' color='#FF0000' />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-house.fill')).toBeOnTheScreen()
    })
  })

  it('renders with style prop', async () => {
    Platform.OS = 'android'
    const customStyle = { marginTop: 10 }
    const { getByTestId, toJSON } = render(
      <IconSymbol name='house.fill' color='#000000' style={customStyle} />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-house.fill')).toBeOnTheScreen()
    })
  })

  it('renders with all props combined', async () => {
    Platform.OS = 'android'
    const customStyle = { marginTop: 10 }
    const { getByTestId, toJSON } = render(
      <IconSymbol
        name='paperplane.fill'
        size={40}
        color='#FF5733'
        style={customStyle}
      />
    )

    await waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(getByTestId('material-icons-paperplane.fill')).toBeOnTheScreen()
    })
  })
})

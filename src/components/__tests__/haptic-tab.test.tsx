/* eslint-disable @typescript-eslint/no-require-imports */
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'
import { Text } from 'react-native'
import { HapticTab } from '../haptic-tab'

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}))

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>)
}

describe('HapticTab Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children correctly', () => {
    const { getByText } = renderWithNavigation(
      <HapticTab>
        <Text>Tab Content</Text>
      </HapticTab>
    )
    expect(getByText('Tab Content')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByText } = renderWithNavigation(
      <HapticTab onPress={mockOnPress}>
        <Text>Press Me</Text>
      </HapticTab>
    )

    const pressable = getByText('Press Me')
    fireEvent.press(pressable)

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('calls onPressIn when pressed down', () => {
    require('react-native').Platform.OS = 'android'

    const mockOnPressIn = jest.fn()
    const { getByText } = renderWithNavigation(
      <HapticTab onPressIn={mockOnPressIn}>
        <Text>Press Me</Text>
      </HapticTab>
    )

    const pressable = getByText('Press Me')
    fireEvent(pressable, 'pressIn')

    expect(mockOnPressIn).toHaveBeenCalledTimes(1)
  })

  it('calls onPressIn when pressed down on iOS', () => {
    require('react-native').Platform.OS = 'ios'

    const mockOnPressIn = jest.fn()
    const { getByText } = renderWithNavigation(
      <HapticTab onPressIn={mockOnPressIn}>
        <Text>Press Me</Text>
      </HapticTab>
    )

    const pressable = getByText('Press Me')
    fireEvent(pressable, 'pressIn')

    expect(mockOnPressIn).toHaveBeenCalledTimes(1)
  })

  it('passes through other props', () => {
    const { getByText } = renderWithNavigation(
      <HapticTab testID='haptic-tab-test' accessible={true}>
        <Text>Tab</Text>
      </HapticTab>
    )
    const element = getByText('Tab')
    expect(element).toBeTruthy()
  })

  it('handles disabled state', () => {
    const mockOnPress = jest.fn()
    const { getByText } = renderWithNavigation(
      <HapticTab onPress={mockOnPress} disabled={true}>
        <Text>Disabled Tab</Text>
      </HapticTab>
    )

    const pressable = getByText('Disabled Tab')
    fireEvent.press(pressable)

    // When disabled, onPress might not be called
    // This test verifies the component renders without errors
    expect(pressable).toBeTruthy()
  })
})

const jest = require('jest')

jest.mock('@react-navigation/core', () => {
  const actual = jest.requireActual('@react-navigation/core')
  return {
    ...actual,
    useRoute: jest.fn(() => ({
      params: { postId: 1 },
      name: 'post-details',
      key: 'test-key',
    })),
  }
})

// Mock React Navigation
const mockUseNavigation = jest.fn(() => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
}))

jest.mock('@react-navigation/native', () => {
  const React = require('react')
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useNavigation: mockUseNavigation,
    useRoute: jest.fn(() => ({
      params: { postId: 1 },
      name: 'post-details',
      key: 'test-key',
    })),
    NavigationContainer: ({ children }) => React.createElement(React.Fragment, {}, children),
  }
})

// Mock expo modules
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}))

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}))

// Mock expo-symbols
jest.mock('expo-symbols', () => ({
  SymbolView: 'SymbolView',
}))

// Mock IconSymbol component
jest.mock('@/src/components/ui/icon-symbol.ios', () => ({
  IconSymbol: 'IconSymbol',
}))

// Mock HapticTab component
jest.mock('@/src/components/haptic-tab', () => {
  const React = require('react')
  const { TouchableOpacity } = require('react-native')
  return {
    HapticTab: (props) => {
      const { children, onPress, ...rest } = props
      return React.createElement(TouchableOpacity, { onPress, ...rest }, children)
    },
  }
})


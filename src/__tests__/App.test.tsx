import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react-native'
import App from '../App'

// Mock expo-splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn().mockResolvedValue(undefined),
}))

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}))

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: 'GestureHandlerRootView',
}))

// Mock Navigation component
jest.mock('../navigation', () => ({
  __esModule: true,
  default: 'Navigation',
}))

// Mock expo-asset
jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: jest.fn().mockResolvedValue(undefined),
  },
}))

// Mock @react-navigation/elements
jest.mock('@react-navigation/elements', () => ({
  Assets: [],
}))

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {})

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { UNSAFE_root } = render(<App />)
    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders GestureHandlerRootView', () => {
    const { UNSAFE_getByType } = render(<App />)
    // @ts-ignore
    const gestureHandler = UNSAFE_getByType('GestureHandlerRootView')
    expect(gestureHandler).toBeTruthy()
  })

  it('renders QueryClientProvider with correct configuration', () => {
    const { UNSAFE_getByType } = render(<App />)
    const queryClientProvider = UNSAFE_getByType(QueryClientProvider)
    expect(queryClientProvider).toBeTruthy()
    expect(queryClientProvider.props.client).toBeInstanceOf(QueryClient)
  })

  it('renders StatusBar', () => {
    const { UNSAFE_getByType } = render(<App />)
    // @ts-ignore
    const statusBar = UNSAFE_getByType('StatusBar')
    expect(statusBar).toBeTruthy()
  })

  it('renders Navigation component', () => {
    const { UNSAFE_getByType } = render(<App />)
    // @ts-ignore
    const navigation = UNSAFE_getByType('Navigation')
    expect(navigation).toBeTruthy()
  })

  it('calls SplashScreen.hideAsync on layout', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const SplashScreen = require('expo-splash-screen')
    const { UNSAFE_getByType } = render(<App />)
    // @ts-ignore
    const gestureHandler = UNSAFE_getByType('GestureHandlerRootView')

    // Simulate onLayout event
    if (gestureHandler.props.onLayout) {
      await gestureHandler.props.onLayout()
    }

    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1)
  })

  it('configures QueryClient with correct default options', () => {
    const { UNSAFE_getByType } = render(<App />)
    const queryClientProvider = UNSAFE_getByType(QueryClientProvider)
    const queryClient = queryClientProvider.props.client as QueryClient

    const defaultOptions = queryClient.getDefaultOptions()
    expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000) // CACHE_TIME
    expect(defaultOptions.queries?.gcTime).toBe(10 * 60 * 1000) // CACHE_TIME * 2
    expect(defaultOptions.queries?.retry).toBe(1)
  })

  it('applies correct container styles', () => {
    const { UNSAFE_getByType } = render(<App />)
    // @ts-ignore
    const gestureHandler = UNSAFE_getByType('GestureHandlerRootView')
    expect(gestureHandler.props.style).toEqual({
      flex: 1,
    })
  })
})

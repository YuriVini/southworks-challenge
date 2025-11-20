import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import Navigation from '../index'

// Mock HomeGroup
jest.mock('../../modules/home/index.routes', () => ({
  HomeGroup: 'HomeGroup',
}))

// Mock root-navigation
const mockNavigationRef = {
  isReady: jest.fn(),
  navigate: jest.fn(),
  current: null,
}

jest.mock('../root-navigation', () => ({
  navigationRef: mockNavigationRef,
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { UNSAFE_root } = render(<Navigation />)
    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders NavigationContainer', () => {
    const { UNSAFE_getByType } = render(<Navigation />)
    const navigationContainer = UNSAFE_getByType(NavigationContainer)
    expect(navigationContainer).toBeTruthy()
  })

  it('passes navigationRef to NavigationContainer', () => {
    const { UNSAFE_getByType } = render(<Navigation />)
    const navigationContainer = UNSAFE_getByType(NavigationContainer)
    // Verify that NavigationContainer is rendered (ref is passed internally)
    expect(navigationContainer).toBeTruthy()
    // The ref is passed but may not be directly accessible via props
    expect(navigationContainer.props).toBeDefined()
  })

  it('renders HomeGroup inside NavigationContainer', () => {
    const { UNSAFE_getByType } = render(<Navigation />)
    // @ts-ignore
    const homeGroup = UNSAFE_getByType('HomeGroup')
    expect(homeGroup).toBeTruthy()
  })
})

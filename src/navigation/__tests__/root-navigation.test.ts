// Mock createNavigationContainerRef before importing the module
// The factory function must define the mock inline
jest.mock('@react-navigation/native', () => {
  const mockRef = {
    isReady: jest.fn(),
    navigate: jest.fn(),
    current: null,
  }
  return {
    createNavigationContainerRef: jest.fn(() => mockRef),
    ParamListBase: {},
  }
})

// Import after mocks are set up
import { navigate, navigationRef } from '../root-navigation'

describe('Root Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('exports navigationRef', () => {
    expect(navigationRef).toBeDefined()
    expect(navigationRef).toHaveProperty('isReady')
    expect(navigationRef).toHaveProperty('navigate')
  })

  it('navigationRef has the expected structure', () => {
    expect(typeof navigationRef.isReady).toBe('function')
    expect(typeof navigationRef.navigate).toBe('function')
  })

  it('navigationRef is created by createNavigationContainerRef', () => {
    // The mock is called when the module is imported, so we verify navigationRef exists
    // which confirms createNavigationContainerRef was called
    expect(navigationRef).toBeDefined()
    expect(typeof navigationRef.isReady).toBe('function')
  })

  describe('navigate function', () => {
    it('navigates when navigationRef is ready', () => {
      ;(navigationRef.isReady as jest.Mock).mockReturnValue(true)
      ;(navigationRef.navigate as jest.Mock).mockClear()

      navigate('test-route', { param1: 'value1' })

      expect(navigationRef.isReady).toHaveBeenCalledTimes(1)
      expect(navigationRef.navigate).toHaveBeenCalledTimes(1)
      expect(navigationRef.navigate).toHaveBeenCalledWith('test-route', {
        param1: 'value1',
      })
    })

    it('does not navigate when navigationRef is not ready', () => {
      ;(navigationRef.isReady as jest.Mock).mockReturnValue(false)
      ;(navigationRef.navigate as jest.Mock).mockClear()

      navigate('test-route', { param1: 'value1' })

      expect(navigationRef.isReady).toHaveBeenCalledTimes(1)
      expect(navigationRef.navigate).not.toHaveBeenCalled()
    })

    it('handles navigation without params', () => {
      ;(navigationRef.isReady as jest.Mock).mockReturnValue(true)
      ;(navigationRef.navigate as jest.Mock).mockClear()

      navigate('test-route')

      expect(navigationRef.isReady).toHaveBeenCalledTimes(1)
      expect(navigationRef.navigate).toHaveBeenCalledTimes(1)
      expect(navigationRef.navigate).toHaveBeenCalledWith('test-route', undefined)
    })
  })
})

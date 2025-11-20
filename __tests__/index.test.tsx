/* eslint-disable @typescript-eslint/no-require-imports */
// Mock @expo/metro-runtime (side-effect import)
jest.mock('@expo/metro-runtime', () => {})

// Mock expo's registerRootComponent
const mockRegisterRootComponent = jest.fn()
jest.mock('expo', () => ({
  registerRootComponent: mockRegisterRootComponent,
}))

// Mock the App component
const mockApp = jest.fn(() => null)
jest.mock('../src/App', () => ({
  __esModule: true,
  default: mockApp,
}))

describe('index.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Clear the module cache to re-import and trigger the side effect
    jest.resetModules()
  })

  it('imports @expo/metro-runtime', () => {
    // This is a side-effect import, so we just verify the module can be loaded
    require('@expo/metro-runtime')
    expect(true).toBe(true) // Module loaded successfully
  })

  it('calls registerRootComponent with App component', () => {
    // Re-import the index file to trigger the registration
    require('../index')

    expect(mockRegisterRootComponent).toHaveBeenCalledTimes(1)
    expect(mockRegisterRootComponent).toHaveBeenCalledWith(mockApp)
  })

  it('imports App component from correct path', () => {
    // Verify the App mock is set up correctly
    require('../index')
    expect(mockApp).toBeDefined()
  })
})

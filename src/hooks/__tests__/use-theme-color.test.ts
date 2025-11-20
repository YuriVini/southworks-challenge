import { Colors } from '@/src/constants/theme'
import { renderHook } from '@testing-library/react-native'
import { useColorScheme } from '../use-color-scheme'
import { useThemeColor } from '../use-theme-color'

// Mock useColorScheme
jest.mock('../use-color-scheme', () => ({
  useColorScheme: jest.fn(),
}))

describe('useThemeColor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns color from props when light theme is active', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('light')
    const { result } = renderHook(() =>
      useThemeColor({ light: '#FF0000', dark: '#0000FF' }, 'text')
    )
    expect(result.current).toBe('#FF0000')
  })

  it('returns color from props when dark theme is active', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('dark')
    const { result } = renderHook(() =>
      useThemeColor({ light: '#FF0000', dark: '#0000FF' }, 'text')
    )
    expect(result.current).toBe('#0000FF')
  })

  it('returns color from Colors when light theme is active and no prop color provided', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('light')
    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    )
    expect(result.current).toBe(Colors.light.text)
  })

  it('returns color from Colors when dark theme is active and no prop color provided', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('dark')
    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    )
    expect(result.current).toBe(Colors.dark.text)
  })

  it('returns color from Colors when light theme prop is provided but dark is not', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('dark')
    const { result } = renderHook(() =>
      useThemeColor({ light: '#FF0000' }, 'text')
    )
    expect(result.current).toBe(Colors.dark.text)
  })

  it('returns color from Colors when dark theme prop is provided but light is not', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('light')
    const { result } = renderHook(() =>
      useThemeColor({ dark: '#0000FF' }, 'text')
    )
    expect(result.current).toBe(Colors.light.text)
  })

  it('defaults to light theme when useColorScheme returns null', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue(null)
    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    )
    expect(result.current).toBe(Colors.light.text)
  })

  it('defaults to light theme when useColorScheme returns undefined', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue(undefined)
    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    )
    expect(result.current).toBe(Colors.light.text)
  })

  it('uses light theme default when useColorScheme returns null and light prop is provided', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue(null)
    const { result } = renderHook(() =>
      useThemeColor({ light: '#FF0000' }, 'text')
    )
    expect(result.current).toBe('#FF0000')
  })

  it('uses light theme default when useColorScheme returns null and dark prop is provided', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue(null)
    const { result } = renderHook(() =>
      useThemeColor({ dark: '#0000FF' }, 'text')
    )
    expect(result.current).toBe(Colors.light.text)
  })

  it('works with different color names', () => {
    ;(useColorScheme as jest.Mock).mockReturnValue('light')
    const { result: textResult } = renderHook(() =>
      useThemeColor({}, 'text')
    )
    expect(textResult.current).toBe(Colors.light.text)

    ;(useColorScheme as jest.Mock).mockReturnValue('dark')
    const { result: backgroundResult } = renderHook(() =>
      useThemeColor({}, 'background')
    )
    expect(backgroundResult.current).toBe(Colors.dark.background)
  })
})


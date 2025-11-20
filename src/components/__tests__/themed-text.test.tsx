import { NavigationContainer } from '@react-navigation/native'
import { render, screen } from '@testing-library/react-native'
import { ThemedText } from '../themed-text'

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>)
}

describe('ThemedText Component', () => {
  it('renders text correctly', () => {
    renderWithNavigation(<ThemedText>Hello World</ThemedText>)
    expect(screen.getByText('Hello World')).toBeTruthy()
  })

  it('applies default type styling', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText type='default'>Default text</ThemedText>
    )
    const textElement = getByText('Default text')
    expect(textElement).toBeTruthy()
  })

  it('applies title type styling', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText type='title'>Title Text</ThemedText>
    )
    const textElement = getByText('Title Text')
    expect(textElement).toBeTruthy()
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 32,
          fontWeight: 'bold',
        }),
      ])
    )
  })

  it('applies subtitle type styling', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText type='subtitle'>Subtitle Text</ThemedText>
    )
    const textElement = getByText('Subtitle Text')
    expect(textElement).toBeTruthy()
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 20,
          fontWeight: 'bold',
        }),
      ])
    )
  })

  it('applies defaultSemiBold type styling', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText type='defaultSemiBold'>SemiBold Text</ThemedText>
    )
    const textElement = getByText('SemiBold Text')
    expect(textElement).toBeTruthy()
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 16,
          fontWeight: '600',
        }),
      ])
    )
  })

  it('applies link type styling', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText type='link'>Link Text</ThemedText>
    )
    const textElement = getByText('Link Text')
    expect(textElement).toBeTruthy()
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 16,
          color: '#0a7ea4',
        }),
      ])
    )
  })

  it('merges custom styles with type styles', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText type='default' style={{ marginTop: 10 }}>
        Custom styled text
      </ThemedText>
    )
    const textElement = getByText('Custom styled text')
    expect(textElement).toBeTruthy()
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginTop: 10,
        }),
      ])
    )
  })

  it('handles lightColor prop', () => {
    renderWithNavigation(
      <ThemedText lightColor='#FF0000'>Light colored text</ThemedText>
    )
    expect(screen.getByText('Light colored text')).toBeTruthy()
  })

  it('handles darkColor prop', () => {
    renderWithNavigation(
      <ThemedText darkColor='#0000FF'>Dark colored text</ThemedText>
    )
    expect(screen.getByText('Dark colored text')).toBeTruthy()
  })

  it('passes through other Text props', () => {
    const { getByText } = renderWithNavigation(
      <ThemedText numberOfLines={2} ellipsizeMode='tail'>
        Long text that should be truncated
      </ThemedText>
    )
    const textElement = getByText('Long text that should be truncated')
    expect(textElement.props.numberOfLines).toBe(2)
    expect(textElement.props.ellipsizeMode).toBe('tail')
  })
})

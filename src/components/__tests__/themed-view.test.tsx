import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { Text, View } from 'react-native'
import { ThemedView } from '../themed-view'

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>)
}

describe('ThemedView Component', () => {
  it('renders children correctly', () => {
    const { getByText } = renderWithNavigation(
      <ThemedView>
        <View>
          <Text>Test Content</Text>
        </View>
      </ThemedView>
    )
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('applies custom style', () => {
    const { UNSAFE_getByType } = renderWithNavigation(
      <ThemedView style={{ padding: 10 }}>
        <View>
          <Text>Content</Text>
        </View>
      </ThemedView>
    )
    const viewElement = UNSAFE_getByType(View)
    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          padding: 10,
        }),
      ])
    )
  })

  it('handles lightColor prop', () => {
    const { UNSAFE_getByType } = renderWithNavigation(
      <ThemedView lightColor='#FFFFFF'>
        <View>
          <Text>Content</Text>
        </View>
      </ThemedView>
    )
    const viewElement = UNSAFE_getByType(View)
    expect(viewElement).toBeTruthy()
  })

  it('handles darkColor prop', () => {
    const { UNSAFE_getByType } = renderWithNavigation(
      <ThemedView darkColor='#000000'>
        <View>
          <Text>Content</Text>
        </View>
      </ThemedView>
    )
    const viewElement = UNSAFE_getByType(View)
    expect(viewElement).toBeTruthy()
  })

  it('merges backgroundColor with custom styles', () => {
    const { UNSAFE_getByType } = renderWithNavigation(
      <ThemedView style={{ margin: 20, padding: 10 }}>
        <View>
          <Text>Content</Text>
        </View>
      </ThemedView>
    )
    const viewElement = UNSAFE_getByType(View)
    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          margin: 20,
          padding: 10,
        }),
      ])
    )
  })

  it('passes through other View props', () => {
    const { UNSAFE_getByType } = renderWithNavigation(
      <ThemedView testID='themed-view-test' accessible={true}>
        <View>
          <Text>Content</Text>
        </View>
      </ThemedView>
    )
    const viewElement = UNSAFE_getByType(View)
    expect(viewElement.props.testID).toBe('themed-view-test')
    expect(viewElement.props.accessible).toBe(true)
  })

  it('renders multiple children', () => {
    const { getByText } = renderWithNavigation(
      <ThemedView>
        <View>
          <Text>First Child</Text>
        </View>
        <View>
          <Text>Second Child</Text>
        </View>
      </ThemedView>
    )
    expect(getByText('First Child')).toBeTruthy()
    expect(getByText('Second Child')).toBeTruthy()
  })

  it('renders empty view when no children', () => {
    const { UNSAFE_getByType } = renderWithNavigation(<ThemedView />)
    const viewElement = UNSAFE_getByType(View)
    expect(viewElement).toBeTruthy()
  })
})

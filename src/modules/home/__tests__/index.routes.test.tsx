import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { HomeGroup } from '../index.routes'

// Mock the views
jest.mock('../views/home', () => ({
  Home: 'Home',
}))

jest.mock('../views/post-details', () => ({
  PostDetails: 'PostDetails',
}))

describe('HomeGroup Routes', () => {
  it('renders without crashing', () => {
    const { UNSAFE_root } = render(
      <NavigationContainer>
        <HomeGroup />
      </NavigationContainer>
    )
    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders NavigationContainer with HomeGroup', () => {
    const { UNSAFE_getByType } = render(
      <NavigationContainer>
        <HomeGroup />
      </NavigationContainer>
    )
    const navigationContainer = UNSAFE_getByType(NavigationContainer)
    expect(navigationContainer).toBeTruthy()
  })

  it('renders successfully', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <HomeGroup />
      </NavigationContainer>
    )
    const json = toJSON()
    expect(json).toBeTruthy()
  })

  it('can be rendered multiple times', () => {
    const { rerender, toJSON } = render(
      <NavigationContainer>
        <HomeGroup />
      </NavigationContainer>
    )

    expect(toJSON()).toBeTruthy()

    rerender(
      <NavigationContainer>
        <HomeGroup />
      </NavigationContainer>
    )

    expect(toJSON()).toBeTruthy()
  })
})


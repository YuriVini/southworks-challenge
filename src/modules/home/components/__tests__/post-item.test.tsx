import { Post } from '@/src/services/posts'
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { PostItem } from '../post-item'

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>)
}

const mockPost: Post = {
  id: 1,
  title: 'Test Post Title',
  body: 'This is a test post body that should be displayed in the component',
  userId: 1,
}

describe('PostItem Component', () => {
  it('renders post title correctly', () => {
    const mockOnPress = jest.fn()
    renderWithNavigation(<PostItem item={mockPost} onPress={mockOnPress} />)

    expect(screen.getByText('Test Post Title')).toBeTruthy()
  })

  it('renders post body correctly', () => {
    const mockOnPress = jest.fn()
    renderWithNavigation(<PostItem item={mockPost} onPress={mockOnPress} />)

    expect(
      screen.getByText(
        'This is a test post body that should be displayed in the component'
      )
    ).toBeTruthy()
  })

  it('calls onPress with post id when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByText } = renderWithNavigation(
      <PostItem item={mockPost} onPress={mockOnPress} />
    )

    const titleElement = getByText('Test Post Title')
    fireEvent.press(titleElement)

    expect(mockOnPress).toHaveBeenCalledTimes(1)
    expect(mockOnPress).toHaveBeenCalledWith(mockPost.id)
  })

  it('renders with different post data', () => {
    const differentPost: Post = {
      id: 2,
      title: 'Different Post',
      body: 'Different body content',
      userId: 2,
    }
    const mockOnPress = jest.fn()
    renderWithNavigation(
      <PostItem item={differentPost} onPress={mockOnPress} />
    )

    expect(screen.getByText('Different Post')).toBeTruthy()
    expect(screen.getByText('Different body content')).toBeTruthy()
  })

  it('handles empty title gracefully', () => {
    const postWithEmptyTitle: Post = {
      id: 3,
      title: '',
      body: 'Body content',
      userId: 1,
    }
    const mockOnPress = jest.fn()
    renderWithNavigation(
      <PostItem item={postWithEmptyTitle} onPress={mockOnPress} />
    )

    expect(screen.getByText('Body content')).toBeTruthy()
  })

  it('handles long body text with ellipsis', () => {
    const postWithLongBody: Post = {
      id: 4,
      title: 'Short Title',
      body: 'This is a very long body text that should be truncated with ellipsis when it exceeds the maximum number of lines allowed in the component',
      userId: 1,
    }
    const mockOnPress = jest.fn()
    const { getByText } = renderWithNavigation(
      <PostItem item={postWithLongBody} onPress={mockOnPress} />
    )

    const bodyElement = getByText(
      'This is a very long body text that should be truncated with ellipsis when it exceeds the maximum number of lines allowed in the component'
    )
    expect(bodyElement).toBeTruthy()
    expect(bodyElement.props.numberOfLines).toBe(2)
    expect(bodyElement.props.ellipsizeMode).toBe('tail')
  })
})

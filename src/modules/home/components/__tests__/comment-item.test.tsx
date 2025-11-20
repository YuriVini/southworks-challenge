import { Comment } from '@/src/services/posts'
import { render, screen } from '@testing-library/react-native'
import { CommentItem } from '../comment-item'

const mockComment: Comment = {
  id: 1,
  postId: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  body: 'This is a test comment body that should be displayed correctly in the component',
}

describe('CommentItem Component', () => {
  it('renders comment name correctly', () => {
    render(<CommentItem item={mockComment} />)

    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  it('renders comment email correctly', () => {
    render(<CommentItem item={mockComment} />)

    expect(screen.getByText('john.doe@example.com')).toBeTruthy()
  })

  it('renders comment body correctly', () => {
    render(<CommentItem item={mockComment} />)

    expect(
      screen.getByText(
        'This is a test comment body that should be displayed correctly in the component'
      )
    ).toBeTruthy()
  })

  it('renders all comment fields together', () => {
    render(<CommentItem item={mockComment} />)

    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('john.doe@example.com')).toBeTruthy()
    expect(
      screen.getByText(
        'This is a test comment body that should be displayed correctly in the component'
      )
    ).toBeTruthy()
  })

  it('renders with different comment data', () => {
    const differentComment: Comment = {
      id: 2,
      postId: 1,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      body: 'Different comment content here',
    }
    render(<CommentItem item={differentComment} />)

    expect(screen.getByText('Jane Smith')).toBeTruthy()
    expect(screen.getByText('jane.smith@example.com')).toBeTruthy()
    expect(screen.getByText('Different comment content here')).toBeTruthy()
  })

  it('handles empty name gracefully', () => {
    const commentWithEmptyName: Comment = {
      id: 3,
      postId: 1,
      name: '',
      email: 'test@example.com',
      body: 'Comment body',
    }
    render(<CommentItem item={commentWithEmptyName} />)

    expect(screen.getByText('test@example.com')).toBeTruthy()
    expect(screen.getByText('Comment body')).toBeTruthy()
  })

  it('handles long comment body text', () => {
    const commentWithLongBody: Comment = {
      id: 4,
      postId: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'This is a very long comment body that contains a lot of text and should still be displayed correctly without any issues in the component rendering',
    }
    render(<CommentItem item={commentWithLongBody} />)

    expect(
      screen.getByText(
        'This is a very long comment body that contains a lot of text and should still be displayed correctly without any issues in the component rendering'
      )
    ).toBeTruthy()
  })

  it('renders multiple comments correctly', () => {
    const comment1: Comment = {
      id: 1,
      postId: 1,
      name: 'First User',
      email: 'first@example.com',
      body: 'First comment',
    }
    const comment2: Comment = {
      id: 2,
      postId: 1,
      name: 'Second User',
      email: 'second@example.com',
      body: 'Second comment',
    }

    const { rerender } = render(<CommentItem item={comment1} />)
    expect(screen.getByText('First User')).toBeTruthy()
    expect(screen.getByText('First comment')).toBeTruthy()

    rerender(<CommentItem item={comment2} />)
    expect(screen.getByText('Second User')).toBeTruthy()
    expect(screen.getByText('Second comment')).toBeTruthy()
  })
})


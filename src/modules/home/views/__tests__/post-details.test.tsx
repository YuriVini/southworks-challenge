import * as postsService from '@/src/services/posts'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react-native'
import { ActivityIndicator } from 'react-native'
import { PostDetails } from '../post-details'

// Mock the posts service
jest.mock('@/src/components/services/posts', () => ({
  usePostById: jest.fn(),
  usePostComments: jest.fn(),
}))

// Mock useRoute directly
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useRoute: jest.fn(() => ({
      params: { postId: 1 },
      name: 'post-details',
      key: 'test-key',
    })),
  }
})

const mockPost = {
  id: 1,
  title: 'Test Post Title',
  body: 'This is the body of the test post',
  userId: 1,
}

const mockComments = [
  {
    id: 1,
    postId: 1,
    name: 'Test Comment 1',
    email: 'test1@example.com',
    body: 'This is the first comment',
  },
  {
    id: 2,
    postId: 1,
    name: 'Test Comment 2',
    email: 'test2@example.com',
    body: 'This is the second comment',
  },
]

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{component}</NavigationContainer>
    </QueryClientProvider>
  )
}

describe('PostDetails Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading indicator when post is loading', () => {
    ;(postsService.usePostById as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    })
    ;(postsService.usePostComments as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    })

    const { UNSAFE_getByType } = renderWithProviders(<PostDetails />)
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy()
  })

  it('renders post not found message when post is null', () => {
    ;(postsService.usePostById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    })
    ;(postsService.usePostComments as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    })

    renderWithProviders(<PostDetails />)
    expect(screen.getByText('Post not found')).toBeTruthy()
  })

  it('renders post details when data is loaded', async () => {
    ;(postsService.usePostById as jest.Mock).mockReturnValue({
      data: mockPost,
      isLoading: false,
    })
    ;(postsService.usePostComments as jest.Mock).mockReturnValue({
      data: mockComments,
      isLoading: false,
    })

    renderWithProviders(<PostDetails />)

    await waitFor(() => {
      expect(screen.getByText('Test Post Title')).toBeTruthy()
      expect(screen.getByText('This is the body of the test post')).toBeTruthy()
      expect(screen.getByText('User 1')).toBeTruthy()
    })
  })

  it('displays user information correctly', async () => {
    ;(postsService.usePostById as jest.Mock).mockReturnValue({
      data: mockPost,
      isLoading: false,
    })
    ;(postsService.usePostComments as jest.Mock).mockReturnValue({
      data: mockComments,
      isLoading: false,
    })

    renderWithProviders(<PostDetails />)

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeTruthy()
      expect(screen.getByText('2 hours ago')).toBeTruthy()
    })
  })
})

import * as postsService from '@/src/services/posts'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react-native'
import { ActivityIndicator } from 'react-native'
import { Home } from '../home'

// Mock the posts service
jest.mock('@/src/components/services/posts', () => ({
  usePosts: jest.fn(),
  prefetchPost: jest.fn(),
  prefetchPostComments: jest.fn(),
}))

const mockPosts = [
  {
    id: 1,
    title: 'Test Post 1',
    body: 'This is the body of test post 1',
    userId: 1,
  },
  {
    id: 2,
    title: 'Test Post 2',
    body: 'This is the body of test post 2',
    userId: 2,
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

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading indicator when data is loading', () => {
    ;(postsService.usePosts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    })

    const { UNSAFE_getByType } = renderWithProviders(<Home />)
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy()
  })

  it('renders error message when there is an error', () => {
    const errorMessage = 'Failed to fetch posts'
    ;(postsService.usePosts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: errorMessage },
      refetch: jest.fn(),
    })

    renderWithProviders(<Home />)
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy()
  })

  it('renders posts list when data is loaded', async () => {
    ;(postsService.usePosts as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    renderWithProviders(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeTruthy()
      expect(screen.getByText('Test Post 2')).toBeTruthy()
    })
  })

  it('renders all posts in the list', async () => {
    ;(postsService.usePosts as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    renderWithProviders(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeTruthy()
      expect(screen.getByText('Test Post 2')).toBeTruthy()
      expect(screen.getByText('This is the body of test post 1')).toBeTruthy()
      expect(screen.getByText('This is the body of test post 2')).toBeTruthy()
    })
  })
})

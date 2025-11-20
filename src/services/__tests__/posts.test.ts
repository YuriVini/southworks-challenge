import { QueryClient } from '@tanstack/react-query'
import {
  prefetchPost,
  prefetchPostComments,
  usePostById,
  usePostComments,
  usePosts,
} from '../posts'

// Mock fetch globally
global.fetch = jest.fn()

// Mock useQuery
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}))

// Mock config
jest.mock('../config', () => ({
  URL_BASE: 'https://jsonplaceholder.typicode.com',
  CACHE_TIME: 5 * 60 * 1000,
}))

describe('Posts Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('usePosts', () => {
    it('is a function', () => {
      expect(typeof usePosts).toBe('function')
    })

    it('calls useQuery with correct configuration', () => {
      const { useQuery } = require('@tanstack/react-query')
      usePosts()
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['posts'],
          staleTime: 10 * 60 * 1000, // CACHE_TIME * 2
          gcTime: 10 * 60 * 1000, // CACHE_TIME * 2
        })
      )
    })
  })

  describe('usePostById', () => {
    it('is a function', () => {
      expect(typeof usePostById).toBe('function')
    })

    it('calls useQuery with correct configuration for a post', () => {
      const { useQuery } = require('@tanstack/react-query')
      const postId = 1
      usePostById(postId)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['post', postId],
          staleTime: 5 * 60 * 1000, // CACHE_TIME
          gcTime: 10 * 60 * 1000, // CACHE_TIME * 2
        })
      )
    })
  })

  describe('usePostComments', () => {
    it('is a function', () => {
      expect(typeof usePostComments).toBe('function')
    })

    it('calls useQuery with correct configuration for comments', () => {
      const { useQuery } = require('@tanstack/react-query')
      const postId = 1
      usePostComments(postId)
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['post-comments', postId],
          staleTime: 5 * 60 * 1000, // CACHE_TIME
          gcTime: 10 * 60 * 1000, // CACHE_TIME * 2
        })
      )
    })
  })

  describe('prefetchPost', () => {
    it('is a function', () => {
      expect(typeof prefetchPost).toBe('function')
    })

    it('prefetches post data', async () => {
      const mockPost = { id: 1, title: 'Test Post', body: 'Body', userId: 1 }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPost),
      })

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })

      await prefetchPost(queryClient, 1)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/1'
      )
    })

    it('uses correct cache settings', async () => {
      const mockPost = { id: 1, title: 'Test Post', body: 'Body', userId: 1 }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPost),
      })

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })

      await prefetchPost(queryClient, 1)

      // Verify the query was prefetched with correct key
      const queryData = queryClient.getQueryData(['post', 1])
      expect(queryData).toEqual(mockPost)
    })
  })

  describe('prefetchPostComments', () => {
    it('is a function', () => {
      expect(typeof prefetchPostComments).toBe('function')
    })

    it('prefetches post comments data', async () => {
      const mockComments = [
        {
          id: 1,
          postId: 1,
          name: 'Test User',
          email: 'test@example.com',
          body: 'Comment body',
        },
      ]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockComments),
      })

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })

      await prefetchPostComments(queryClient, 1)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/1/comments'
      )
    })

    it('uses correct cache settings', async () => {
      const mockComments = [
        {
          id: 1,
          postId: 1,
          name: 'Test User',
          email: 'test@example.com',
          body: 'Comment body',
        },
      ]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockComments),
      })

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })

      await prefetchPostComments(queryClient, 1)

      // Verify the query was prefetched with correct key
      const queryData = queryClient.getQueryData(['post-comments', 1])
      expect(queryData).toEqual(mockComments)
    })
  })
})


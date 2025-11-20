import { QueryClient, useQuery } from '@tanstack/react-query'
import { CACHE_TIME, URL_BASE } from './config'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const usePosts = () => {
  return useQuery<Post[], Error | null>({
    queryKey: ['posts'],
    queryFn: () => fetch(`${URL_BASE}/posts`).then((res) => res.json()),
    staleTime: CACHE_TIME * 2,
    gcTime: CACHE_TIME * 2,
  })
}

export const usePostById = (postId: number) => {
  return useQuery<Post, Error | null>({
    queryKey: ['post', postId],
    queryFn: () =>
      fetch(`${URL_BASE}/posts/${postId}`).then((res) => res.json()),

    staleTime: CACHE_TIME, 
    gcTime: CACHE_TIME * 2,
  })
}

export const usePostComments = (postId: number) => {
  return useQuery<Comment[], Error | null>({
    queryKey: ['post-comments', postId],
    queryFn: () =>
      fetch(`${URL_BASE}/posts/${postId}/comments`).then((res) => res.json()),
    staleTime:      CACHE_TIME,
    gcTime: CACHE_TIME * 2, 
  })
}

export const prefetchPost = async (
  queryClient: QueryClient,
  postId: number
): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () =>
      fetch(`${URL_BASE}/posts/${postId}`).then((res) => res.json()),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME * 2,
  })
}

export const prefetchPostComments = async (
  queryClient: QueryClient,
  postId: number
): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey: ['post-comments', postId],
    queryFn: () =>
      fetch(`${URL_BASE}/posts/${postId}/comments`).then((res) => res.json()),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME * 2,
  })
}

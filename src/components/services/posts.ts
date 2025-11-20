import { useQuery } from '@tanstack/react-query'
import { URL_BASE } from './config'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export const usePosts = () => {
  return useQuery<Post[], Error | null>({
    queryKey: ['posts'],
    queryFn: () => fetch(`${URL_BASE}/posts`).then((res) => res.json()),
  })
}

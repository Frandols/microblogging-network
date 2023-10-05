import { getPosts, type GetPostsResult } from '@/services'
import { useCallback, useEffect, useState } from 'react'

type UsePosts = () =>
  | {
      posts: GetPostsResult
      loading: false
      error: null
    }
  | {
      error: string
      loading: false
      posts: null
    }
  | {
      loading: true
      posts: null
      error: null
    }

const usePosts: UsePosts = () => {
  const [posts, setPosts] = useState<GetPostsResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getPostsHandler = useCallback(async () => {
    try {
      const posts = await getPosts()

      setPosts(posts)
    } catch (error: any) {
      setError(error)
    }
  }, [])

  useEffect(() => {
    getPostsHandler().catch(() => {})
  }, [])

  if (posts !== null) return { posts, loading: false, error: null }

  if (error !== null) return { error, loading: false, posts }

  return { loading: true, posts, error }
}

export default usePosts

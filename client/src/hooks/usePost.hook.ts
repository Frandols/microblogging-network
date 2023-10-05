import { getPost, type GetPostResult } from '@/services'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type UsePost = () =>
  | {
      post: GetPostResult
      loading: false
      error: null
    }
  | {
      error: string
      loading: false
      post: null
    }
  | {
      loading: true
      post: null
      error: null
    }

const usePost: UsePost = () => {
  const { postId } = useParams()

  const [post, setPost] = useState<GetPostResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getPostHandler = (postId: string): void => {
    setPost(null)

    getPost(postId)
      .then(setPost)
      .catch((error) => {
        setError(error.message)
      })
  }

  useEffect(() => {
    getPostHandler(postId as string)
  }, [postId])

  if (post !== null) return { post, loading: false, error: null }

  if (error !== null) return { error, loading: false, post: null }

  return { loading: true, post, error }
}

export default usePost

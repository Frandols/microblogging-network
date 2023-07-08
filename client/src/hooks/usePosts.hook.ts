import { useParams } from 'react-router-dom'
import { getQueryBasedOnParams } from '../utilities'
import { useQuery } from '@apollo/client'

const usePosts = () => {
  const params = useParams()

  const query = getQueryBasedOnParams(params)

  const { loading, data, error } = useQuery(query)

  if (loading)
    return {
      loading,
      post: null,
      posts: null,
      error,
    }

  return {
    loading,
    post: data.getPost || null,
    posts: data.getPosts || data.getPost.children,
    error,
  }
}

export default usePosts

import { useQuery } from '@apollo/client'
import { getPosts } from '../queries'
import GetPostsOutput from '@server/posts/dto/get-posts.output'
import { useSearchParams } from 'react-router-dom'

const usePosts = () => {
  const [searchParams] = useSearchParams()

  const { loading, data } = useQuery<{ getPosts: GetPostsOutput }>(
    getPosts(searchParams.get('post'))
  ) as
    | { loading: true; data: null }
    | { loading: false; data: { getPosts: GetPostsOutput } }

  if (loading) {
    return {
      loading,
      posts: null,
    }
  }

  return {
    loading,
    posts: data.getPosts,
  }
}

export default usePosts

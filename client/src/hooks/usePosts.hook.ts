import { useQuery } from '@apollo/client'
import { getPosts } from '../queries'
import GetPostsOutput from '@server/posts/dto/get-posts.output'

const usePosts = () => {
  const { loading, data } = useQuery<{ getPosts: GetPostsOutput }>(getPosts)

  return {
    loading,
    posts: data,
  }
}

export default usePosts

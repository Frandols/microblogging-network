import { ApolloError, useQuery } from '@apollo/client'
import { getPosts } from '../queries'
import PostModel from '@server/posts/models/post.model'

type UsePosts =
  | {
      loading: true
      parentPost: null
      posts: null
      error: undefined
    }
  | {
      loading: false
      parentPost: null
      posts: null
      error: ApolloError
    }
  | {
      loading: false
      posts: PostModel[]
      error: undefined
    }

const usePosts = (parentId: string | null) => {
  const { loading, data, error } = useQuery<{
    getPosts: PostModel[]
  }>(getPosts(parentId))

  return {
    loading,
    posts: data ? data.getPosts : null,
    error,
  } as UsePosts
}

export default usePosts

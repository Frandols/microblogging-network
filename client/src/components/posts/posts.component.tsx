import Post from '../post/post.component'
import { useParams } from 'react-router-dom'
import { usePosts } from '../../hooks'

const Posts = () => {
  const { postId } = useParams()

  const { loading, posts, error } = usePosts(postId || null)

  if (loading) return <h1>Loading</h1>

  if (error) return <h1>Error!</h1>

  return posts.map((post) => <Post key={post.id} {...post} />)
}

export default Posts

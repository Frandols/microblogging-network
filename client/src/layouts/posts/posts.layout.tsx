import { usePosts } from '../../hooks'
import { Outlet } from 'react-router-dom'
import { Posts } from '../../components'

const PostsSection = () => {
  const { loading, post, posts, error } = usePosts()

  if (loading) return <h1>Loading</h1>

  if (error) return <h1>Error</h1>

  return (
    <>
      <Outlet context={{ post }} />
      <Posts posts={posts} />
    </>
  )
}

export default PostsSection

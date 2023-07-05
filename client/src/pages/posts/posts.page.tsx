import { Outlet, useParams } from 'react-router-dom'
import { Posts } from '../../components'
import styles from './posts.page.module.css'
import { useQuery } from '@apollo/client'
import { getPost, getPosts } from '../../queries'

const PostsPage = () => {
  const params = useParams()

  const { loading, data, error } = useQuery(
    params.postId ? getPost(params.postId) : getPosts()
  )

  if (loading) return <h1>Loading</h1>

  if (error) return <h1>Error</h1>

  return (
    <section className={styles.posts}>
      <Outlet context={params.postId ? { post: data.getPost } : null} />
      <Posts posts={params.postId ? data.getPost.children : data.getPosts} />
    </section>
  )
}

export default PostsPage

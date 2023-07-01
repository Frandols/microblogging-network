import Post from '../post/post.component'
import { usePosts } from '../../hooks'
import styles from './posts.component.module.css'

const Posts = () => {
  const { loading, posts } = usePosts()

  if (loading || !posts) return <div>Loading...</div>

  return (
    <section className={styles.posts}>
      {posts.getPosts.children.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  )
}

export default Posts

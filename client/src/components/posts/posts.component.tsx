import Post from '../post/post.component'
import { usePosts } from '../../hooks'
import styles from './posts.component.module.css'

const Posts = () => {
  const { loading, posts } = usePosts()

  if (loading) return <div>Loading...</div>

  const { parent, children } = posts

  return (
    <section className={styles.posts}>
      {parent ? <Post {...parent} isParent /> : null}
      {children.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  )
}

export default Posts

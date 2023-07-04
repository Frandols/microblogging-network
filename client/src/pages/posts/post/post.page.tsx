import { usePostContext } from '../../../contexts/post.context'
import styles from './post.page.module.css'

const PostPage = () => {
  const { post } = usePostContext()

  if (!post) return <h1>post</h1>

  return (
    <article className={styles.post}>
      <header>
        <img
          src={`https://avatars.githubusercontent.com/u/${post.user.id}`}
          alt={`${post.user.name} GitHub Avatar`}
          width={40}
          height={40}
        />
        <h1>{post.user.name}</h1>
      </header>
      <main>
        <p>{post.content}</p>
      </main>
      <footer></footer>
    </article>
  )
}

export default PostPage

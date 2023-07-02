import { Post } from '../../../components'
import { useOutletContext } from 'react-router-dom'
import PostModel from '@server/posts/models/post.model'
import { usePostsContext } from '../../../contexts/posts.context'
import styles from './post.page.module.css'

const PostPage = () => {
  const { parentPost } = usePostsContext()

  if (!parentPost) return <h1>post</h1>

  return (
    <article className={styles.post}>
      <header>
        <img
          src={`https://avatars.githubusercontent.com/u/${parentPost.user.id}`}
          alt={`${parentPost.user.name} GitHub Avatar`}
          width={40}
          height={40}
        />
        <h1>{parentPost.user.name}</h1>
      </header>
      <main>
        <p>{parentPost.content}</p>
      </main>
      <footer></footer>
    </article>
  )
}

export default PostPage

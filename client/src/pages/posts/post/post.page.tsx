import styles from './post.page.module.css'
import { useOutletContext } from 'react-router-dom'
import PostModel from '@server/posts/models/post.model'
import { getFormattedDate } from '../../../utilities'

const PostPage = () => {
  const { post } = useOutletContext<{ post: PostModel }>()

  return (
    <article className={styles.post}>
      <header className={styles.postHeader}>
        <img
          className={styles.postUserAvatar}
          src={`https://avatars.githubusercontent.com/u/${post.user.id}`}
          alt={`${post.user.name} GitHub Avatar`}
          width={40}
          height={40}
        />
        <h1 className={styles.postUserName}>{post.user.name}</h1>
      </header>
      <main className={styles.postMain}>
        <p className={styles.postContent}>{post.content}</p>
      </main>
      <footer className={styles.postFooter}>
        <p className={styles.postDate}>{getFormattedDate(post.updatedAt)}</p>
      </footer>
    </article>
  )
}

export default PostPage

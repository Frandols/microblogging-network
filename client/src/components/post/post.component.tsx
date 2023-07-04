import styles from './post.component.module.css'
import PostModel from '@server/posts/models/post.model'
import { Link, useNavigate } from 'react-router-dom'
import { usePostContext } from '../../contexts'
import CommentIcon from '../icons/comment.icon.component'
import { getTimeDistance } from '../../utilities'

type PostProps = Pick<
  PostModel,
  'id' | 'content' | 'user' | '_count' | 'updatedAt'
>

const Post = (post: PostProps) => {
  const navigate = useNavigate()
  const { setPost } = usePostContext()

  return (
    <article className={styles.post}>
      <img
        className={styles.postUserAvatar}
        src={`https://avatars.githubusercontent.com/u/${post.user.id}`}
        alt={`${post.user.name} GitHub Avatar`}
        width={40}
        height={40}
      />
      <div className={styles.postBody}>
        <header className={styles.postBodyHeader}>
          <div className={styles.postBodyHeaderInfo}>
            <Link
              className={styles.postBodyHeaderInfoUser}
              to={`/users/${post.user.id}`}
            >
              {post.user.name}
            </Link>
            <p className={styles.postBodyHeaderInfoDate}>
              {getTimeDistance(post.updatedAt)}
            </p>
          </div>
          <button
            className={styles.postBodyHeaderButton}
            onClick={() => {
              setPost(post)
              navigate(`/posts/${post.id}`)
            }}
          >
            See comments
          </button>
        </header>
        <main className={styles.postBodyMain}>
          <p>{post.content}</p>
        </main>
        <footer className={styles.postBodyFooter}>
          <button
            className={styles.postBodyFooterAction}
            onClick={() => console.log('comment')}
          >
            <CommentIcon width={18} height={18} />
            {post._count.children !== 0 ? post._count.children : ''}
          </button>
        </footer>
      </div>
    </article>
  )
}

export default Post

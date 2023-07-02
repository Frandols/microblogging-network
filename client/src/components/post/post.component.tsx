import styles from './post.component.module.css'
import PostModel from '@server/posts/models/post.model'
import { Link } from 'react-router-dom'

type PostProps = Pick<PostModel, 'id' | 'content' | 'user'> & {
  isParent?: boolean
}

const Post = ({ id, content, user, isParent = false }: PostProps) => {
  return (
    <article
      className={styles.post}
      style={{
        borderBottom: isParent ? '1px solid var(--light-gray)' : 'none',
      }}
    >
      <Link to={`?post=${id}`}>
        <img
          src={`https://avatars.githubusercontent.com/u/${user.id}`}
          alt={`${user.name} GitHub Avatar`}
          width={64}
          height={64}
        />
        <div className={styles.postBody}>
          <header>
            <Link to={`/users?user=${user.id}`}>{user.name}</Link>
          </header>
          <main>{content}</main>
          <footer></footer>
        </div>
      </Link>
    </article>
  )
}

export default Post

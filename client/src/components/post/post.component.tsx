import styles from './post.component.module.css'
import PostModel from '@server/posts/models/post.model'
import { Link, useNavigate } from 'react-router-dom'
import { usePostsContext } from '../../contexts'

type PostProps = Pick<PostModel, 'id' | 'content' | 'user'>

const Post = (post: PostProps) => {
  const navigate = useNavigate()
  const { setParentPost } = usePostsContext()

  return (
    <article
      className={styles.post}
      onClick={() => {
        setParentPost(post)
        navigate(`/posts/${post.id}`)
      }}
    >
      <img
        src={`https://avatars.githubusercontent.com/u/${post.user.id}`}
        alt={`${post.user.name} GitHub Avatar`}
        width={40}
        height={40}
      />
      <div className={styles.postBody}>
        <header>
          <Link to={`/users/${post.user.id}`}>{post.user.name}</Link>
        </header>
        <main>{post.content}</main>
        <footer></footer>
      </div>
    </article>
  )
}

export default Post

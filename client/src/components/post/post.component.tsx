import styles from './post.component.module.css'
import PostModel from '@server/posts/models/post.model'

type PostProps = Pick<PostModel, 'id' | 'content' | 'user'>

const Post = ({ user, content }: PostProps) => {
  return (
    <article className={styles.post}>
      <img
        src={`https://avatars.githubusercontent.com/u/${user.id}`}
        alt={`${user.name} GitHub Avatar`}
        width={64}
        height={64}
      />
      <div className={styles.postBody}>
        <header>{user.name}</header>
        <main>{content}</main>
        <footer></footer>
      </div>
    </article>
  )
}

export default Post

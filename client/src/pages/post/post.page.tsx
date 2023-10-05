import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
  Redactor,
} from '@/components'
import usePost from '@/hooks/usePost.hook'
import { useUserStore } from '@/stores'
import { type FC } from 'react'
import { getFormattedDate } from '../../utilities'
import styles from './post.page.module.css'

const PostPage: FC = () => {
  return (
    <>
      <Header title='Post' showGoBackButton />
      <section className={styles.postPage}>
        <Post />
      </section>
    </>
  )
}

const Post: FC = () => {
  const user = useUserStore((state) => state.user)
  const { loading, post, error } = usePost()

  if (loading) return <LoadingIndicator />

  if (error !== null) return <ErrorIndicator />

  return (
    <>
      <article className={styles.post}>
        <header className={styles.header}>
          <img
            className={styles.avatar}
            src={post.user.avatar}
            alt={`${post.user.name} GitHub Avatar`}
          />
          <h1 className={styles.name}>{post.user.name}</h1>
        </header>
        <p className={styles.content}>{post.content}</p>
        <footer className={styles.footer}>
          <p className={styles.date}>{getFormattedDate(post.updatedAt)}</p>
        </footer>
      </article>
      {user !== null ? <Redactor postBeingReplyed={post} user={user} /> : null}
      {post.children.length === 0 ? (
        <section className={styles.noPostsIndicator}>
          <h1 className={styles.title}>No comments yet</h1>
          <p className={styles.subtitle}>Start the conversation</p>
        </section>
      ) : (
        post.children.map((child) => <PostItem key={child.id} {...child} />)
      )}
    </>
  )
}

export default PostPage

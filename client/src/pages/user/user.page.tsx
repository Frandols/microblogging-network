import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
} from '@/components'
import { useUser } from '@/hooks'
import { type FC } from 'react'
import styles from './user.page.module.css'

const UserPage: FC = () => {
  return (
    <>
      <Header title='User' showGoBackButton />
      <section className={styles.userPage}>
        <User />
      </section>
    </>
  )
}

const User: FC = () => {
  const { loading, user, error } = useUser()

  if (loading) return <LoadingIndicator />

  if (error !== null) return <ErrorIndicator />

  return (
    <>
      <article className={styles.user}>
        <img
          className={styles.avatar}
          src={user.avatar}
          alt={`${user.name} GitHub Avatar`}
        />
        <div className={styles.info}>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.postsCount}>{user.posts.length} posts</p>
        </div>
      </article>
      {user.posts.length === 0 ? (
        <section className={styles.noPostsIndicator}>
          <h1 className={styles.title}>No posts yet</h1>
          <p className={styles.subtitle}>Start a conversation</p>
        </section>
      ) : (
        user.posts.map((post) => <PostItem key={post.id} {...post} />)
      )}
    </>
  )
}

export default UserPage

import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
  Redactor,
} from '@/components'
import { usePosts } from '@/hooks'
import { useUserStore } from '@/stores'
import { type FC } from 'react'
import styles from './home.page.module.css'

const HomePage: FC = () => {
  const user = useUserStore((state) => state.user)

  return (
    <>
      <Header title='Home' />
      <section className={styles.homePage}>
        {user !== null ? <Redactor user={user} /> : null}
        <Posts />
      </section>
    </>
  )
}

const Posts: FC = () => {
  const { loading, posts, error } = usePosts()

  if (loading) return <LoadingIndicator />

  if (error !== null) return <ErrorIndicator />

  if (posts.length === 0)
    return (
      <section className={styles.noPostsIndicator}>
        <h1 className={styles.title}>No posts yet</h1>
        <p className={styles.subtitle}>Start the conversation</p>
      </section>
    )

  return posts.map((post) => <PostItem key={post.id} {...post} />)
}

export default HomePage

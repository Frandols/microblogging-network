import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
  Redactor,
} from '@/components'
import { usePosts } from '@/hooks'
import { createPost } from '@/services'
import { useUserStore } from '@/stores'
import { type FC } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styles from './home.page.module.css'

const HomePage: FC = () => {
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()

  return (
    <>
      <Header title='Home' />
      <section className={styles.homePage}>
        {user !== null ? (
          <Redactor
            user={user}
            onSubmit={async (event) => {
              event.preventDefault()

              const data = new FormData(event.currentTarget)
              const contentEntry = data.get('content')

              if (!contentEntry) return

              const content = contentEntry.toString()

              createPost(content, null)
                .then((post) => {
                  toast.success(`Successfully created post: "${content}"`)

                  setTimeout(() => {
                    navigate(`/posts/${post.id}`)
                  }, 2000)
                })
                .catch((error) => {
                  toast.error(error.message)
                })
            }}
            placeholder="What's on your mind?"
          />
        ) : null}
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

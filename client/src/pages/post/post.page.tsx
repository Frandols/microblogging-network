import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
  Redactor,
} from '@/components'
import usePost from '@/hooks/usePost.hook'
import { createPost } from '@/services'
import { useUserStore } from '@/stores'
import { type FC } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
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
          placeholder={`Reply to ${post.user.name}...`}
        />
      ) : null}
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

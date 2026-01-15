import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
  Redactor,
} from '@/components'
import { usePostLike } from '@/hooks'
import usePost from '@/hooks/usePost.hook'
import { createPost, type GetPostResult } from '@/services'
import { useUserStore } from '@/stores'
import { type FC } from 'react'
import toast from 'react-hot-toast'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { getFormattedDate } from '../../utilities'
import styles from './post.page.module.css'

const PostPage: FC = () => {
  return (
    <>
      <Header title='Post' showGoBackButton />
      <section className={styles.postPage}>
        <PostContainer />
      </section>
    </>
  )
}

const PostContainer: FC = () => {
  const { loading, post, error } = usePost()

  if (loading) return <LoadingIndicator />

  if (error !== null) return <ErrorIndicator />

  if (!post) return <ErrorIndicator />

  return <PostDetails post={post} />
}

interface PostDetailsProps {
  post: GetPostResult
}

const PostDetails: FC<PostDetailsProps> = ({ post }) => {
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()

  const { likedByMe, likesCount, handleToggleLike } = usePostLike({
    postId: post.id,
    initialLikedByMe: post.likedByMe,
    initialLikesCount: post._count.likes,
  })

  return (
    <>
      {post.parents && post.parents.length > 0 && (
        <section className={styles.parentsList}>
          {post.parents.map((parent) => (
            <Link
              key={parent.id}
              to={`/posts/${parent.id}`}
              className={styles.parentItem}
            >
              <img
                src={parent.user.avatar}
                alt={parent.user.name}
                className={styles.parentAvatar}
              />
              <p className={styles.parentContent}>
                {parent.content.length > 50
                  ? `${parent.content.slice(0, 50)}...`
                  : parent.content}
              </p>
            </Link>
          ))}
          <div className={styles.connectorLine} />
        </section>
      )}
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
          <button
            className={styles.action}
            onClick={async (event) => {
              event.stopPropagation()

              if (!user) return

              handleToggleLike()
            }}
          >
            {likedByMe ? (
              <HiHeart size={20} color='#f91880' />
            ) : (
              <HiOutlineHeart size={20} />
            )}
            {likesCount !== 0 ? likesCount : null}
          </button>
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

            createPost(content, post.id)
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

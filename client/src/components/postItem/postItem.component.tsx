import { type GetPostsResult } from '@/services'
import { useModalStore, useUserStore } from '@/stores'
import { getTimeDistance } from '@/utilities'
import { type FC } from 'react'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { Authenticator, Redactor } from '..'
import styles from './postItem.component.module.css'

const PostItem: FC<GetPostsResult[number]> = (post) => {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModalStore((state) => ({
    openModal: state.openModal,
    closeModal: state.closeModal,
  }))
  const user = useUserStore((state) => state.user)

  return (
    <>
      <article
        className={styles.postItem}
        onClick={() => {
          navigate(`/posts/${post.id}`)
        }}
      >
        <img
          className={styles.avatar}
          src={post.user.avatar}
          alt={`${post.user.name} GitHub Avatar`}
        />
        <section className={styles.body}>
          <header className={styles.header}>
            <Link
              className={styles.name}
              to={`/users/${post.user.id}`}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              {post.user.name}
            </Link>
            <p className={styles.date}>{getTimeDistance(post.updatedAt)}</p>
          </header>
          <p className={styles.content}>{post.content}</p>
          <footer className={styles.footer}>
            <button
              className={styles.action}
              onClick={(event) => {
                event.stopPropagation()
                openModal(
                  user !== null ? (
                    <Redactor
                      user={user}
                      postBeingReplyed={{
                        id: post.id,
                        user: {
                          name: post.user.name,
                        },
                      }}
                      onFinishSubmission={closeModal}
                    />
                  ) : (
                    <Authenticator />
                  )
                )
              }}
            >
              <HiOutlineChatBubbleOvalLeft size={20} />
              {post._count.children !== 0 ? post._count.children : null}
            </button>
          </footer>
        </section>
      </article>
    </>
  )
}

export default PostItem

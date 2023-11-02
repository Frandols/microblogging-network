import { Button, Redactor, TogglableOptions } from '@/components'
import {
  createPost,
  deletePost,
  updatePost,
  type GetPostsResult,
} from '@/services'
import { useModalStore, useUserStore } from '@/stores'
import { getTimeDistance } from '@/utilities'
import { useState, type FC } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
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
            {user !== null && user.id === post.user.id ? (
              <TogglableOptions
                options={[
                  {
                    children: 'Edit',
                    className: styles.editOption,
                    onClick: (event) => {
                      event.stopPropagation()

                      openModal(
                        <Redactor
                          user={user}
                          onSubmit={async (event) => {
                            event.preventDefault()

                            const data = new FormData(event.currentTarget)
                            const contentEntry = data.get('content')

                            if (!contentEntry) return

                            const content = contentEntry.toString()

                            updatePost(post.id, { content })
                              .then((post) => {
                                toast.success(
                                  `Successfully updated post to: "${content}"`
                                )

                                setTimeout(() => {
                                  closeModal()

                                  navigate(`/posts/${post.id}`)
                                }, 2000)
                              })
                              .catch((error) => {
                                toast.error(error.message)
                              })
                          }}
                          defaultValue={post.content}
                        />
                      )
                    },
                  },
                  {
                    children: 'Delete',
                    className: styles.deleteOption,
                    onClick: (event) => {
                      event.stopPropagation()

                      openModal(
                        <PostDeletionConfirmationRequester post={post} />
                      )
                    },
                  },
                ]}
              />
            ) : null}
          </header>
          <p className={styles.content}>{post.content}</p>
          <footer className={styles.footer}>
            <button
              className={styles.action}
              onClick={(event) => {
                event.stopPropagation()

                if (user !== null)
                  openModal(
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
                            toast.success(
                              `Successfully created post: "${content}"`
                            )

                            setTimeout(() => {
                              closeModal()

                              navigate(`/posts/${post.id}`)
                            }, 2000)
                          })
                          .catch((error) => {
                            toast.error(error.message)
                          })
                      }}
                      placeholder={`Reply to ${post.user.name}...`}
                    />
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

interface PostDeletionConfirmationRequester {
  post: GetPostsResult[number]
}

const PostDeletionConfirmationRequester: FC<
  PostDeletionConfirmationRequester
> = ({ post }) => {
  const [deleting, setDeleting] = useState<boolean>(false)

  return (
    <section className={styles.postDeletionConfirmationRequester}>
      <h1 className={styles.title}>
        Are you sure you want to delete this post?
      </h1>
      <Button
        className={styles.button}
        onClick={() => {
          setDeleting(true)

          deletePost(post.id)
            .then((post) => {
              toast.success(`Successfully deleted post: "${post.content}"`)

              setTimeout(() => {
                location.reload()
              }, 2000)
            })
            .catch((error) => {
              toast.error(error.message)
            })
        }}
        disabled={deleting}
      >
        Yes, delete this post
      </Button>
    </section>
  )
}

export default PostItem

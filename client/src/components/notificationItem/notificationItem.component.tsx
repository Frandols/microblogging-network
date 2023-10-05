import { type Notification } from '@/stores/notifications.store'
import { type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './notificationItem.component.module.css'

const NotificationItem: FC<Notification> = ({ post }) => {
  const navigate = useNavigate()

  return (
    <article
      className={styles.notificationItem}
      onClick={() => {
        navigate(`/posts/${post.id}`)
      }}
    >
      <img
        className={styles.avatar}
        src={post.user.avatar}
        alt={post.user.name}
        width={40}
        height={40}
      />
      <section className={styles.body}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <Link
              className={styles.link}
              to={`/users/${post.user.id}`}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <b>{post.user.name}</b>
            </Link>{' '}
            has replyed you:
          </h1>
        </header>
        <main className={styles.main}>
          <p className={styles.content}>&quot;{post.content}&quot;</p>
        </main>
      </section>
    </article>
  )
}

export default NotificationItem

import { Header, NotificationItem } from '@/components'
import { useNotificationsStore } from '@/stores'
import { type FC } from 'react'
import styles from './notifications.page.module.css'

const NotificationsPage: FC = () => {
  return (
    <>
      <Header title='Notifications' />
      <section className={styles.notificationsPage}>
        <Notifications />
      </section>
    </>
  )
}

const Notifications: FC = () => {
  const notifications = useNotificationsStore((state) => state.notifications)

  if (notifications.length === 0)
    return (
      <section className={styles.noNotificationsIndicator}>
        <h1 className={styles.title}>No notifications yet</h1>
        <p className={styles.subtitle}>Interact with the others</p>
      </section>
    )

  return notifications.map((notification) => (
    <NotificationItem key={notification.post.id} {...notification} />
  ))
}

export default NotificationsPage

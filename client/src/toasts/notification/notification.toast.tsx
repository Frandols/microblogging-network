import { type Post, type User } from '@/entities'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './notification.toast.module.css'

type NotificationToastProps = Pick<Post, 'id' | 'content'> & {
  user: Pick<User, 'name' | 'avatar'>
}

const NotificationToast: FC<NotificationToastProps> = ({
  id,
  content,
  user,
}) => {
  return (
    <div className={styles.notificationToast}>
      <img className={styles.avatar} src={user.avatar} alt={user.name} />
      <p className={styles.text}>
        {user.name} has replyed you: &quot;{content}&quot;
      </p>
      <Link className={styles.link} to={`/posts/${id}`}>
        See
      </Link>
    </div>
  )
}

export default NotificationToast

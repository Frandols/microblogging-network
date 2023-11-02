import { type Post, type User } from '@/entities'
import { create } from 'zustand'

const notify = (title: string): void => {
  if (!('Notification' in window)) return

  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        notify(title)

        return
      }
    })

    return
  }

  new Notification(title)
}

export interface Notification {
  post: Pick<Post, 'id' | 'content'> & {
    user: Pick<User, 'id' | 'name' | 'avatar'>
  }
}

interface NotificationsStoreState {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
}

const useNotificationsStore = create<NotificationsStoreState>((set) => {
  return {
    notifications: [],
    addNotification: (notification) => {
      set((currentState) => ({
        notifications: [...currentState.notifications, notification],
      }))

      notify(
        `${notification.post.user.name} has replyed you: "${notification.post.content}"`
      )
    },
  }
})

export default useNotificationsStore

import { type Post, type User } from '@/entities'
import { create } from 'zustand'

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
    },
  }
})

export default useNotificationsStore

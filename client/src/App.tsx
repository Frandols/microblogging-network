import { type Post } from '@/entities'
import { AuthenticationGuard } from '@/guards'
import { HomePage, NotificationsPage, PostPage, UserPage } from '@/pages'
import { gql, useSubscription } from '@apollo/client'
import { type FC } from 'react'
import toast from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useNotificationsStore } from './stores'
import { NotificationToast } from './toasts'

const App: FC = () => {
  const addNotification = useNotificationsStore(
    (state) => state.addNotification
  )

  useSubscription(
    gql`
      subscription {
        replyReceived {
          id
          content
          user {
            id
            name
            avatar
          }
        }
      }
    `,
    {
      onData: ({ data: { data } }) => {
        const replyReceived = data.replyReceived as Post

        const post = {
          id: replyReceived.id,
          content: replyReceived.content,
          user: {
            id: replyReceived.user.id,
            name: replyReceived.user.name,
            avatar: replyReceived.user.avatar,
          },
        }

        addNotification({ post })

        toast(<NotificationToast {...post} />)
      },
    }
  )

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/users/:userId' element={<UserPage />} />
      <Route path='/posts/:postId' element={<PostPage />} />
      <Route element={<AuthenticationGuard />}>
        <Route path='/notifications' element={<NotificationsPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App

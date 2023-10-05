import { type Post, type User } from '@/entities'
import axios from 'axios'
import config from '../../config'

const endpoint = config.APIURL + '/graphql'

export interface GetMeResult extends Pick<User, 'id' | 'name' | 'avatar'> {}

const getMe = async (token: string): Promise<GetMeResult> => {
  const response = await axios.post<{
    data: {
      me: User
    }
  }>(
    endpoint,
    {
      query: `
        {
          me {
            id
            name
            avatar
          }
        }
    `,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return {
    id: response.data.data.me.id,
    name: response.data.data.me.name,
    avatar: response.data.data.me.avatar,
  }
}

export interface GetUserResult extends Pick<User, 'id' | 'name' | 'avatar'> {
  posts: Array<
    Pick<Post, 'id' | 'content' | 'updatedAt' | '_count'> & {
      user: Pick<User, 'id' | 'name' | 'avatar'>
    }
  >
}

const getUser = async (id: string): Promise<GetUserResult> => {
  const response = await axios.post<{ data: { user: User } }>(endpoint, {
    query: `
      {
        user(id: "${id}") {
            id
            name
            avatar
            posts {
                id
                content
                updatedAt
                user {
                  id
                  name
                  avatar
                }
                _count {
                  children
                } 
            }
        }
    }
    `,
  })

  if (response.status !== 200) throw new Error(response.statusText)

  const user = response.data.data.user

  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    posts: user.posts.map((post) => ({
      id: post.id,
      content: post.content,
      updatedAt: post.updatedAt,
      user: {
        id: post.user.id,
        name: post.user.name,
        avatar: post.user.avatar,
      },
      _count: {
        children: post._count.children,
      },
    })),
  }
}

export { getMe, getUser }

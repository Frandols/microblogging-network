import { type Post, type User } from '@/entities'
import axios from 'axios'
import config from '../../config'

const endpoint = config.APIURL + '/graphql'

export type GetPostsResult = Array<
  Pick<Post, 'id' | 'content' | 'updatedAt'> & {
    user: Pick<User, 'id' | 'name' | 'avatar'>
    _count: {
      children: number
    }
  }
>

const getPosts = async (): Promise<GetPostsResult> => {
  const response = await axios.post<{ data: { posts: Post[] } }>(endpoint, {
    query: `{
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
        `,
  })

  if (response.status !== 200) throw new Error(response.statusText)

  return response.data.data.posts.map((post) => ({
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
  }))
}

export interface GetPostResult
  extends Pick<Post, 'id' | 'content' | 'updatedAt'> {
  user: Pick<User, 'id' | 'name' | 'avatar'>
  children: Array<
    Pick<Post, 'id' | 'content' | 'updatedAt'> & {
      user: Pick<User, 'id' | 'name' | 'avatar'>
      _count: {
        children: number
      }
    }
  >
}

const getPost = async (postId: string): Promise<GetPostResult> => {
  const response = await axios.post<{ data: { post: Post } }>(endpoint, {
    query: `
          {
            post(id: "${postId}") {
              id
              content
              updatedAt
              user {
                id
                name
                avatar
              }
              children {
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

  return {
    id: response.data.data.post.id,
    content: response.data.data.post.content,
    updatedAt: response.data.data.post.updatedAt,
    user: {
      id: response.data.data.post.user.id,
      name: response.data.data.post.user.name,
      avatar: response.data.data.post.user.avatar,
    },
    children: response.data.data.post.children.map((child) => ({
      id: child.id,
      content: child.content,
      updatedAt: child.updatedAt,
      user: {
        id: child.user.id,
        name: child.user.name,
        avatar: child.user.avatar,
      },
      _count: {
        children: child._count.children,
      },
    })),
  }
}

interface CreatePostResult extends Pick<Post, 'id'> {}

const createPost = async (
  content: string,
  parentId: string | null
): Promise<CreatePostResult> => {
  const response = await axios.post<{ data: { createPost: Post } }>(
    endpoint,
    {
      query: `
          mutation {
            createPost(${
              parentId !== null ? `parentId: "${parentId}", ` : ''
            }payload: { content: "${content}" }) {
              id
            }
          }
        `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    }
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return {
    id: response.data.data.createPost.id,
  }
}

export { createPost, getPost, getPosts }

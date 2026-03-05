import { type Post, type User } from '@/entities'
import axios from 'axios'
import config from '../../config'

const endpoint = config.APIURL + '/graphql'

export type GetPostsResult = Array<
  Pick<Post, 'id' | 'content' | 'updatedAt' | 'likedByMe'> & {
    user: Pick<User, 'id' | 'name' | 'avatar'>
    _count: {
      children: number
      likes: number
    }
  }
>

const getPosts = async (): Promise<GetPostsResult> => {
  const response = await axios.post<{ data: { posts: Post[] } }>(
    endpoint,
    {
      query: `{
            posts {
              id
              content
              updatedAt
              likedByMe
              user {
                id
                name
                avatar
              }
              _count {
                children
                likes
              }
            }
          }
        `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    },
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return response.data.data.posts.map((post) => ({
    id: post.id,
    content: post.content,
    updatedAt: post.updatedAt,
    likedByMe: post.likedByMe,
    user: {
      id: post.user.id,
      name: post.user.name,
      avatar: post.user.avatar,
    },
    _count: {
      children: post._count.children,
      likes: post._count.likes,
    },
  }))
}

export interface GetPostResult extends Pick<
  Post,
  'id' | 'content' | 'updatedAt' | 'likedByMe'
> {
  user: Pick<User, 'id' | 'name' | 'avatar'>
  _count: {
    likes: number
  }
  children: Array<
    Pick<Post, 'id' | 'content' | 'updatedAt' | 'likedByMe'> & {
      user: Pick<User, 'id' | 'name' | 'avatar'>
      _count: {
        children: number
        likes: number
      }
    }
  >
  parents: Array<
    Pick<Post, 'id' | 'content'> & {
      user: Pick<User, 'id' | 'name' | 'avatar'>
    }
  >
}

const getPost = async (postId: string): Promise<GetPostResult> => {
  const response = await axios.post<{ data: { post: Post } }>(
    endpoint,
    {
      query: `
          {
            post(id: "${postId}") {
              id
              content
              updatedAt
              likedByMe
              user {
                id
                name
                avatar
              }
              _count {
                  likes
              }
              parents {
                id
                content
                user {
                  id
                  name
                  avatar
                }
              }
              children {
                id
                content
                updatedAt
                likedByMe
                user {
                  id
                  name
                  avatar
                }
                _count {
                  children
                  likes
                }
              }
            }
          }
        `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    },
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return {
    id: response.data.data.post.id,
    content: response.data.data.post.content,
    updatedAt: response.data.data.post.updatedAt,
    likedByMe: response.data.data.post.likedByMe,
    user: {
      id: response.data.data.post.user.id,
      name: response.data.data.post.user.name,
      avatar: response.data.data.post.user.avatar,
    },
    _count: {
      likes: response.data.data.post._count.likes,
    },
    parents: response.data.data.post.parents.map((parent) => ({
      id: parent.id,
      content: parent.content,
      user: {
        id: parent.user.id,
        name: parent.user.name,
        avatar: parent.user.avatar,
      },
    })),
    children: response.data.data.post.children.map((child) => ({
      id: child.id,
      content: child.content,
      updatedAt: child.updatedAt,
      likedByMe: child.likedByMe,
      user: {
        id: child.user.id,
        name: child.user.name,
        avatar: child.user.avatar,
      },
      _count: {
        children: child._count.children,
        likes: child._count.likes,
      },
    })),
  }
}

interface CreatePostResult extends Pick<Post, 'id'> {}

const createPost = async (
  content: string,
  parentId: string | null,
): Promise<CreatePostResult> => {
  const response = await axios.post<{ data: { createPost: Post } }>(
    endpoint,
    {
      query: `
          mutation {
            createPost(${
              parentId !== null ? `parentId: "${parentId}", ` : ''
            }payload: { content: """${content}""" }) {
              id
            }
          }
        `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    },
  )

  if (response.status !== 200) {
    console.log(JSON.stringify(response))

    throw new Error(response.statusText)
  }

  return {
    id: response.data.data.createPost.id,
  }
}

interface UpdatePostResult extends Pick<Post, 'id'> {}

const updatePost = async (
  postId: string,
  payload: { content: string },
): Promise<UpdatePostResult> => {
  const response = await axios.post<{ data: { updatePost: Post } }>(
    endpoint,
    {
      query: `
        mutation {
          updatePost(id: "${postId}", payload: { content: "${payload.content}" }) {
            id
          }
        }
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    },
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return {
    id: response.data.data.updatePost.id,
  }
}

interface DeletePostResult extends Pick<Post, 'content'> {}

const deletePost = async (postId: string): Promise<DeletePostResult> => {
  const response = await axios.post<{ data: { deletePost: Post } }>(
    endpoint,
    {
      query: `
        {
          deletePost(id: "${postId}") {
            content
          }
        }
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    },
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return {
    content: response.data.data.deletePost.content,
  }
}

interface ToggleLikeResult extends Pick<Post, 'id' | 'likedByMe'> {
  _count: {
    likes: number
  }
}

const toggleLike = async (postId: string): Promise<ToggleLikeResult> => {
  const response = await axios.post<{ data: { toggleLike: Post } }>(
    endpoint,
    {
      query: `
        mutation {
          toggleLike(postId: "${postId}") {
            id
            likedByMe
            _count {
              likes
            }
          }
        }
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    },
  )

  if (response.status !== 200) throw new Error(response.statusText)

  return {
    id: response.data.data.toggleLike.id,
    likedByMe: response.data.data.toggleLike.likedByMe,
    _count: {
      likes: response.data.data.toggleLike._count.likes,
    },
  }
}

export { createPost, deletePost, getPost, getPosts, toggleLike, updatePost }

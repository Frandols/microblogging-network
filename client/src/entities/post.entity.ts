import { type User } from '@/entities'

export default interface Post {
  id: string
  content: string
  updatedAt: Date
  user: User
  parent: Post
  children: Post[]
  _count: {
    children: number
  }
}

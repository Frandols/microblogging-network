import { type Post } from '@/entities'

export default interface User {
  id: string
  name: string
  avatar: string
  posts: Post[]
}

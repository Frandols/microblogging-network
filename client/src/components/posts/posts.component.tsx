import Post from '../post/post.component'
import PostModel from '@server/posts/models/post.model'

type PostsProps = {
  posts: PostModel[]
}

const Posts = ({ posts }: PostsProps) => {
  return posts.map((post) => <Post key={post.id} {...post} />)
}

export default Posts

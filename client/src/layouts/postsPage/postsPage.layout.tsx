import { useParams, Outlet } from 'react-router-dom'
import { usePosts } from '../../hooks'
import { Posts } from '../../components'
import { useState } from 'react'
import PostModel from '@server/posts/models/post.model'

const PostsPageLayout = () => {
  const [parentPost, setParentPost] = useState<PostModel | null>(null)

  return (
    <section>
      {parentPost ? <h1>{parentPost.id}</h1> : null}
      <Outlet context={{ setParentPost }} />
    </section>
  )
}

export default PostsPageLayout

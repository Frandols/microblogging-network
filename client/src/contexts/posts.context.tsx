import PostModel from '@server/posts/models/post.model'
import { createContext, useState, PropsWithChildren, useContext } from 'react'

type PostsContext = {
  parentPost: PostModel | null
  setParentPost: Function
}

const postsContextInitialValues = {
  parentPost: null,
  setParentPost: () => null,
}

const postsContext = createContext<PostsContext>(postsContextInitialValues)

const PostsContextProvider = ({ children }: PropsWithChildren) => {
  const [parentPost, setParentPost] = useState<PostModel | null>(null)

  return (
    <postsContext.Provider
      value={{
        parentPost,
        setParentPost,
      }}
    >
      {children}
    </postsContext.Provider>
  )
}

const usePostsContext = () => useContext(postsContext)

export { PostsContextProvider, usePostsContext }

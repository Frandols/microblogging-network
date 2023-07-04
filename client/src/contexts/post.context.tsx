import PostModel from '@server/posts/models/post.model'
import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react'

type PostContext = {
  post: PostModel | null
  setPost: Function
}

const postContextInitialValues = {
  post: null,
  setPost: () => null,
}

const postContext = createContext<PostContext>(postContextInitialValues)

const PostContextProvider = ({ children }: PropsWithChildren) => {
  const [post, setPost] = useState<PostModel | null>(null)

  return (
    <postContext.Provider
      value={{
        post,
        setPost,
      }}
    >
      {children}
    </postContext.Provider>
  )
}

const usePostContext = () => useContext(postContext)

export { PostContextProvider, usePostContext }

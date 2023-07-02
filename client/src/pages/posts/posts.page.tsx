import { Outlet } from 'react-router-dom'
import { Posts } from '../../components'
import { PostsContextProvider } from '../../contexts'
import styles from './posts.page.module.css'

const PostsPage = () => {
  return (
    <section className={styles.posts}>
      <PostsContextProvider>
        <Outlet />
        <Posts />
      </PostsContextProvider>
    </section>
  )
}

export default PostsPage

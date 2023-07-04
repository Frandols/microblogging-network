import { Outlet } from 'react-router-dom'
import { Posts } from '../../components'
import styles from './posts.page.module.css'

const PostsPage = () => {
  return (
    <section className={styles.posts}>
      <Outlet />
      <Posts />
    </section>
  )
}

export default PostsPage

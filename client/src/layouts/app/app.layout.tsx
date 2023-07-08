import { PropsWithChildren } from 'react'
import styles from './app.layout.module.css'
import { Button } from '../../components'

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav>
        <Button>
          <a href="https://github.com/login/oauth/authorize?client_id=55e0abec4b1c2e6cbb1a">
            Log in with GitHub
          </a>
        </Button>
      </nav>
      <main className={styles.posts}>{children}</main>
      <section></section>
    </>
  )
}

export default AppLayout

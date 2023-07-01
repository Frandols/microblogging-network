import { PropsWithChildren } from 'react'

import styles from './app.layout.module.css'

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header></header>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default AppLayout

import { Aside, Menu } from '@/components'
import type { FC, PropsWithChildren } from 'react'
import styles from './global.layout.module.css'

const GlobalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Menu />
      <main className={styles.main}>{children}</main>
      <Aside />
    </>
  )
}

export default GlobalLayout

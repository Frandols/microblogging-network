import { useModalStore, useUserStore } from '@/stores'
import { useEffect, useState, type FC } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { Authenticator, Button, Identification } from '..'
import styles from './aside.component.module.css'

const Aside: FC = () => {
  const openModal = useModalStore((state) => state.openModal)
  const user = useUserStore((state) => state.user)

  return (
    <aside className={styles.aside}>
      {user !== null ? (
        <Identification user={user} />
      ) : (
        <Button
          onClick={() => {
            openModal(<Authenticator />)
          }}
          variant='secondary'
        >
          <AuthenticationModalTogglerLabel />
        </Button>
      )}
    </aside>
  )
}

const AuthenticationModalTogglerLabel: FC = () => {
  const [showIcon, setShowIcon] = useState<boolean>(window.innerWidth < 1024)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShowIcon(window.innerWidth < 1024)
    })
  }, [])

  if (showIcon) return <HiOutlineUserCircle size={22} />

  return 'Sign in'
}

export default Aside

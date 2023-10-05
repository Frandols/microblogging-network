import { Authenticator, Button, Redactor } from '@/components'
import { useUserStore } from '@/stores'
import useModalStore from '@/stores/modal.store'
import { useEffect, useState, type FC } from 'react'
import {
  HiBell,
  HiHome,
  HiOutlineBell,
  HiOutlineHome,
  HiOutlinePencil,
  HiOutlineUser,
  HiUser,
} from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'
import styles from './menu.component.module.css'

const Menu: FC = () => {
  const user = useUserStore((state) => state.user)
  const { pathname } = useLocation()
  const openModal = useModalStore((state) => state.openModal)

  return (
    <nav className={styles.menu}>
      <header className={styles.header}>
        <Link className={styles.link} to='/'>
          <img
            className={styles.logo}
            alt='Francisco De Los Santos logo'
            src='/logo.svg'
          />
        </Link>
      </header>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Link className={styles.link} to='/'>
            {pathname === '/' ? (
              <>
                <HiHome className={styles.icon} />
                <b className={styles.label}>Home</b>
              </>
            ) : (
              <>
                <HiOutlineHome className={styles.icon} />
                <p className={styles.label}>Home</p>
              </>
            )}
          </Link>
        </li>
        {user === null ? (
          <li className={`${styles.item} ${styles.itemDisabled}`}>
            <Link className={styles.link} to='/'>
              <HiOutlineBell className={styles.icon} />
              <p className={styles.label}>Notifications</p>
            </Link>
          </li>
        ) : (
          <li className={styles.item}>
            <Link className={styles.link} to='/notifications'>
              {pathname === '/notifications' ? (
                <>
                  <HiBell className={styles.icon} />
                  <b className={styles.label}>Notifications</b>
                </>
              ) : (
                <>
                  <HiOutlineBell className={styles.icon} />
                  <p className={styles.label}>Notifications</p>
                </>
              )}
            </Link>
          </li>
        )}
        {user === null ? (
          <li className={`${styles.item} ${styles.itemDisabled}`}>
            <Link className={styles.link} to={'/'}>
              <HiOutlineUser className={styles.icon} />
              <p className={styles.label}>Profile</p>
            </Link>
          </li>
        ) : (
          <li className={styles.item}>
            <Link className={styles.link} to={`users/${user.id}`}>
              {pathname === `/users/${user.id}` ? (
                <>
                  <HiUser className={styles.icon} />
                  <b className={styles.label}>Profile</b>
                </>
              ) : (
                <>
                  <HiOutlineUser className={styles.icon} />
                  <p className={styles.label}>Profile</p>
                </>
              )}
            </Link>
          </li>
        )}
      </ul>
      <Button
        className={styles.redactorToggler}
        onClick={() => {
          openModal(
            user !== null ? <Redactor user={user} /> : <Authenticator />
          )
        }}
        disabled={user === null}
      >
        <RedactionModalTogglerLabel />
      </Button>
    </nav>
  )
}

const RedactionModalTogglerLabel: FC = () => {
  const [showIcon, setShowIcon] = useState<boolean>(window.innerWidth < 1024)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShowIcon(window.innerWidth < 1024)
    })
  }, [])

  if (showIcon) return <HiOutlinePencil className={styles.icon} />

  return 'Redact'
}

export default Menu

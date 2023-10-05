import { type User } from '@/entities'
import { useUserStore } from '@/stores'
import { useState, type FC } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styles from './identification.component.module.css'

interface IdentificationProps {
  user: Pick<User, 'id' | 'name' | 'avatar'>
}

const Identification: FC<IdentificationProps> = ({ user }) => {
  return (
    <div className={styles.identification}>
      <img
        className={styles.avatar}
        src={user.avatar}
        alt={`${user.name} GitHub Avatar`}
      />
      <h1 className={styles.name}>{user.name}</h1>
      <OptionsToggler />
    </div>
  )
}

const OptionsToggler: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const deleteUser = useUserStore((state) => state.deleteUser)

  return (
    <>
      <button
        className={styles.toggle}
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        <HiEllipsisVertical className={styles.icon} size={20} />
      </button>
      {isVisible ? (
        <ul className={styles.options}>
          <li
            className={styles.option}
            onClick={deleteUser}
            style={{
              color: 'var(--danger)',
            }}
          >
            Log out
          </li>
        </ul>
      ) : null}
    </>
  )
}

export default Identification

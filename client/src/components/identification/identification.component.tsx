import { TogglableOptions } from '@/components'
import { type User } from '@/entities'
import { useUserStore } from '@/stores'
import { useEffect, useState, type FC } from 'react'
import styles from './identification.component.module.css'

interface IdentificationProps {
  user: Pick<User, 'id' | 'name' | 'avatar'>
}

const Identification: FC<IdentificationProps> = ({ user }) => {
  const deleteUser = useUserStore((state) => state.deleteUser)

  return (
    <div className={styles.identification}>
      <img
        className={styles.avatar}
        src={user.avatar}
        alt={`${user.name} GitHub Avatar`}
      />
      <h1 className={styles.name}>{user.name}</h1>
      <DynamicallyPositionedDropdownOptions
        options={[
          {
            children: 'Sign out',
            onClick: deleteUser,
            className: styles.signOutOption,
          },
        ]}
      />
    </div>
  )
}

type DynamicallyPositionedDropdownOptionsProps = Pick<
  typeof TogglableOptions extends React.FC<infer P> ? P : never,
  'options'
>

const DynamicallyPositionedDropdownOptions: FC<
  DynamicallyPositionedDropdownOptionsProps
> = ({ options }) => {
  const [showInTopRight, setShowInTopRight] = useState<boolean>(
    window.innerWidth < 638
  )

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShowInTopRight(window.innerWidth < 638)
    })
  }, [])

  return (
    <TogglableOptions
      options={options}
      variant={showInTopRight ? 'top-right' : 'bottom-left'}
    />
  )
}

export default Identification

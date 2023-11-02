import { useState, type FC, type LiHTMLAttributes } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styles from './togglableOptions.component.module.css'

interface TogglableOptionsProps {
  options: Array<LiHTMLAttributes<HTMLLIElement>>
  variant?: 'bottom-left' | 'top-right'
}

const TogglableOptions: FC<TogglableOptionsProps> = ({
  options,
  variant = 'bottom-left',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <div className={styles.togglableOptions}>
      <button
        className={styles.toggler}
        onClick={(event) => {
          event.stopPropagation()

          setIsVisible(!isVisible)
        }}
      >
        <HiEllipsisVertical className={styles.icon} size={20} />
      </button>
      {isVisible ? (
        <ul className={`${styles.options} ${styles[`options-${variant}`]}`}>
          {options.map(({ className, ...rest }, index) => {
            return (
              <li
                key={index}
                className={`${styles.option} ${className || ''}`}
                {...rest}
              />
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default TogglableOptions

import { type FC } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import styles from './header.component.module.css'

interface HeaderProps {
  title: string
  showGoBackButton?: boolean
}

const Header: FC<HeaderProps> = ({ title, showGoBackButton = false }) => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      {showGoBackButton ? (
        <button
          className={styles.goBack}
          onClick={() => {
            navigate(-1)
          }}
        >
          <HiArrowLeft className={styles.icon} />
        </button>
      ) : null}
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
}

export default Header

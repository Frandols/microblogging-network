import { type FC } from 'react'
import styles from './errorIndicator.component.module.css'

const ErrorIndicator: FC = () => {
  return (
    <section className={styles.errorIndicator}>
      <h1 className={styles.title}>
        An error ocurred! Please, refresh and try again
      </h1>
    </section>
  )
}

export default ErrorIndicator

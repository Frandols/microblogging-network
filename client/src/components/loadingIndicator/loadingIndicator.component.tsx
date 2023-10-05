import { type FC } from 'react'
import styles from './loadingIndicator.component.module.css'

const Loader: FC = () => {
  return (
    <div className={styles.loadingIndicator}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader

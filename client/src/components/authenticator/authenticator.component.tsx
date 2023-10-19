import gitHubLogo from '@/assets/github.png'
import googleLogo from '@/assets/google.avif'
import { type FC } from 'react'
import config from '../../../config'
import styles from './authenticator.component.module.css'

const Authenticator: FC = () => {
  return (
    <div className={styles.authenticator}>
      <a className={styles.strategy} href={config.gitHubOAuthURL}>
        <img className={styles.logo} src={gitHubLogo} alt='GitHub logo' />
        Sign In with GitHub
      </a>
      <a className={styles.strategy} href={config.googleOAuthURL}>
        <img className={styles.logo} src={googleLogo} alt='Google logo' />
        Sign In with Google
      </a>
    </div>
  )
}

export default Authenticator

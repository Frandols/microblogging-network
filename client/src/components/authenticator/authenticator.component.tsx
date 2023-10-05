import gitHubLogo from '@/assets/github.png'
import { type FC } from 'react'
import config from '../../../config'
import styles from './authenticator.component.module.css'

const Authenticator: FC = () => {
  return (
    <div className={styles.authenticator}>
      <a
        className={styles.strategy}
        href={`${config.gitHubOAuthURL}&client_id=${config.gitHubClientID}`}
      >
        <img className={styles.logo} src={gitHubLogo} alt='GitHub logo' />
        Sign In with GitHub
      </a>
    </div>
  )
}

export default Authenticator

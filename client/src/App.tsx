import './App.css'
import { useUserContext } from './contexts'
import { useCodeDetection } from './hooks'
import Posts from './components/posts/posts.component'
import { AppLayout } from './layouts'

function App() {
  /* useCodeDetection()

  const { user } = useUserContext()

  if (user) return <img src={user.avatar} /> */

  /* return (
    <button>
      <a href="https://github.com/login/oauth/authorize?client_id=55e0abec4b1c2e6cbb1a">
        Log in with GitHub
      </a>
    </button>
  ) */

  return (
    <AppLayout>
      <Posts />
    </AppLayout>
  )
}

export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import { PostPage } from './pages'
import { PostsLayout } from './layouts'

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
    <Routes>
      <Route path="/" element={<PostsLayout />}>
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/users/:userId" element={<h1>User</h1>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App

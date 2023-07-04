import './App.css'
import { useUserContext } from './contexts'
import { useCodeDetection } from './hooks'
import Posts from './components/posts/posts.component'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PostsPage, PostPage } from './pages'
import { PostsPageLayout } from './layouts'

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
      <Route path="/posts" element={<PostsPage />}>
        <Route path="/posts/:postId" element={<PostPage />} />
      </Route>
      <Route path="/users/:userId" element={<h1>User</h1>} />
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  )
}

export default App

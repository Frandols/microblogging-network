import { useUserStore } from '@/stores'
import { type FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticationGuard: FC = () => {
  const user = useUserStore((state) => state.user)

  if (user == null) return <Navigate to='/' />

  return <Outlet context={{ user }} />
}

export default AuthenticationGuard

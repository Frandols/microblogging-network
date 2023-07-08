import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from 'react'
import { getUser } from '../services'
import { getToken } from '../services'

type User = {
  name: string
  avatar: string
}

type UserContext = {
  user: User | null
  setToken: Function
}

const userContextInitialValues = {
  user: null,
  setToken: () => null,
}

const userContext = createContext<UserContext>(userContextInitialValues)

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  const setToken = async (token: string) => {
    try {
      const user = await getUser(token)

      setUser(user)

      localStorage.setItem('token', token)
    } catch {
      setUser(null)

      localStorage.removeItem('token')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      if (!code) return

      getToken(code).then((token) => setToken(token))

      return
    }

    setToken(token)
  }, [])

  useEffect(() => console.log(user), [user])

  return (
    <userContext.Provider
      value={{
        user,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

const useUserContext = () => useContext(userContext)

export default userContext
export { UserContextProvider, useUserContext }

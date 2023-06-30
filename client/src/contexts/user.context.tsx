import { createContext, PropsWithChildren, useState, useContext } from 'react'
import { getUser } from '../services'

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

const UserContext = createContext<UserContext>(userContextInitialValues)

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

  return (
    <UserContext.Provider
      value={{
        user,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext)

export default UserContext
export { UserContextProvider, useUserContext }

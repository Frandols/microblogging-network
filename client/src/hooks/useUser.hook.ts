import { getUser, type GetUserResult } from '@/services'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type UseUser = () =>
  | {
      user: GetUserResult
      loading: false
      error: null
    }
  | {
      error: string
      loading: false
      user: null
    }
  | {
      loading: true
      user: null
      error: null
    }

const useUser: UseUser = () => {
  const { userId } = useParams()

  const [user, setUser] = useState<GetUserResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getUserHandler = useCallback(async () => {
    try {
      const user = await getUser(userId as string)

      setUser(user)
    } catch (error: any) {
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    getUserHandler().catch(() => {})
  }, [])

  if (user !== null) return { user, loading: false, error: null }

  if (error !== null) return { error, loading: false, user: null }

  return { loading: true, user, error }
}

export default useUser

import { useEffect } from 'react'
import { getToken } from '../services'
import { useUserContext } from '../contexts/user.context'

const useCodeDetection = () => {
  const { setToken } = useUserContext()

  const handleCode = async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) return

    const token = await getToken(code)

    setToken(token)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      handleCode()

      return
    }

    setToken(token)
  }, [])
}

export default useCodeDetection

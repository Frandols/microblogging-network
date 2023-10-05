import { getMe, getToken, type GetMeResult } from '@/services'
import { create } from 'zustand'

interface UserStoreState {
  user: GetMeResult | null
  deleteUser: () => void
}

const useUserStore = create<UserStoreState>((set) => {
  const token = localStorage.getItem('token')

  if (token === null) {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const provider = params.get('provider')

    if (code !== null && provider !== null) {
      getToken(code, provider)
        .then((token) => {
          localStorage.setItem('token', token)
          window.location.reload()
        })
        .catch(() => {})
    }
  } else {
    getMe(token)
      .then((user) => {
        set({ user })
      })
      .catch(() => {
        localStorage.removeItem('token')
        window.location.reload()
      })
  }

  return {
    user: null,
    deleteUser: () => {
      set({ user: null })
      localStorage.removeItem('token')
      window.location.reload()
    },
  }
})

export default useUserStore

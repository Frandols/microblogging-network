import config from '../../config'
import axios from 'axios'

const endpoint = config.GITHUB_API_URL + '/user'

const getUser = async (token: string) => {
  const response = await axios.get<{ login: string; avatar_url: string }>(
    endpoint,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const adapted = {
    name: response.data.login,
    avatar: response.data.avatar_url,
  }

  return adapted
}

export { getUser }

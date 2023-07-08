import config from '../../config'

import axios from 'axios'

const endpoint = config.API_URL + '/tokens'

const getToken = async (code: string) => {
  const response = await axios.get<string>(`${endpoint}/${code}`)

  return response.data
}

export { getToken }

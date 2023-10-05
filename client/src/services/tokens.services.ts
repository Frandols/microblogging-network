import config from '../../config'

import axios from 'axios'

const endpoint = config.APIURL + '/tokens'

const getToken = async (code: string, provider: string): Promise<string> => {
  const response = await axios.get<string>(endpoint, {
    params: { code, provider },
  })

  return response.data
}

export { getToken }

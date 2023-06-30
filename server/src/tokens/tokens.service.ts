import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export default class TokensService {
  async getToken(code: string) {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {},
      {
        params: {
          client_id: '55e0abec4b1c2e6cbb1a',
          client_secret: 'd4571fa3547a2e3922f65a89bb26bb65e16f5140',
          code,
        },
        headers: { Accept: 'application/json' },
      },
    )

    if (!response.data.access_token) throw new Error('Invalid code')

    return response.data.access_token
  }
}

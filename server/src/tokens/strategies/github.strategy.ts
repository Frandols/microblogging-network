import { Injectable, UnauthorizedException } from '@nestjs/common'
import axios from 'axios'
import config from '../../../config'
import { CreateUserPayload } from '../../users/users.service'

interface GitHubAPITokenResponse {
  access_token: string
}

interface GitHubAPIUserResponse {
  id: number
  login: string
  avatar_url: string
}

@Injectable()
export default class GitHubStrategy {
  /**
   * Find a GitHub's user token.
   * @param {string} code - The provided code for finding the token.
   * @returns {Promise<string>} A promise with a token string.
   */
  private async findToken(code: string) {
    const response = await axios.post<GitHubAPITokenResponse>(
      'https://github.com/login/oauth/access_token',
      {},
      {
        params: {
          client_id: config.gitHubClientID,
          client_secret: config.gitHubClientSecret,
          code,
        },
        headers: { Accept: 'application/json' },
      },
    )

    if (!response.data.access_token)
      throw new UnauthorizedException('Invalid code')

    return response.data.access_token
  }

  /**
   * Find a GitHub's user.
   * @param {string} code - The provided code for finding the token.
   * @returns {Promise<CreateUserPayload>} A promise with a payload for creating an user.
   */
  async findUser(code: string): Promise<CreateUserPayload> {
    const token = await this.findToken(code)

    const response = await axios.get<GitHubAPIUserResponse>(
      'https://api.github.com/user',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return {
      name: response.data.login,
      avatar: response.data.avatar_url,
      authProvider: 'github',
      authProviderUserId: response.data.id.toString(),
    }
  }
}

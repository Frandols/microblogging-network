import { Injectable, UnauthorizedException } from '@nestjs/common'
import axios from 'axios'
import config from '../../../config'
import { CreateUserPayload } from '../../users/users.service'
import Strategy from '../interfaces/strategy.interface'

interface GitHubAPITokenResponse {
  access_token: string
}

interface GitHubAPIUserResponse {
  id: number
  login: string
  avatar_url: string
}

@Injectable()
export default class GitHubStrategy implements Strategy<'github'> {
  /**
   * Find a GitHub's user token.
   *
   * @param code - The provided code for finding the token.
   *
   * @throws Invalid code.
   *
   * @returns A promise with a token string.
   */
  private async findToken(code: string) {
    try {
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

      return response.data.access_token
    } catch {
      throw new UnauthorizedException('Invalid code')
    }
  }

  /**
   * Find a GitHub's user.
   *
   * @param code - The provided code for finding the token.
   *
   * @throws Invalid token.
   *
   * @returns A promise with a payload for creating an user.
   */
  async findUser(code: string): Promise<CreateUserPayload<'github'>> {
    const token = await this.findToken(code)

    try {
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
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
